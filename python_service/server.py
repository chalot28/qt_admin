from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

# Thêm thư viện để tải và xử lý HTML (tạo lớp ảo hóa)
try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    requests = None
    BeautifulSoup = None

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), 'settings.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    ''')
    # Default URL if not exists
    cursor.execute('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)', 
                  ('embed_url', 'https://web-tra.pages.dev/'))
    conn.commit()
    conn.close()

@app.route('/api/get-url', methods=['GET'])
def get_url():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT value FROM settings WHERE key = ?', ('embed_url',))
    row = cursor.fetchone()
    conn.close()
    if row:
        return jsonify({'url': row[0]})
    return jsonify({'url': 'https://web-tra.pages.dev/'})

@app.route('/api/save-url', methods=['POST'])
def save_url():
    data = request.json
    new_url = data.get('url')
    if not new_url:
        return jsonify({'error': 'URL is required'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('REPLACE INTO settings (key, value) VALUES (?, ?)', ('embed_url', new_url))
    conn.commit()
    conn.close()
    return jsonify({'message': 'URL saved successfully', 'url': new_url})

@app.route('/api/log-scan', methods=['POST'])
def log_scan():
    """
    Nhận kết quả quét từ Client (Browser) gửi về và in ra Terminal Python.
    Giải quyết vấn đề quét thẻ trên các trang SPA/React.
    """
    data = request.json
    count = data.get('count', 0)
    target = data.get('target', '')
    
    print(f"\n[Client Scan Report] Đã tìm thấy {count} phần tử class '{target}' trên giao diện.")
    if count > 0:
        print(f"-> Các phần tử này đã được bật chế độ chỉnh sửa (Viền đỏ nét đứt).")
    
    return jsonify({'status': 'logged'})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy_spa(path):
    """
    Transparent Proxy cho SPA (React/Vue/Angular).
    Hứng tất cả request không phải API để chuyển tiếp sang trang đích.
    Điều này giúp React Router hoạt động đúng (không bị lỗi 404/trang trắng).
    """
    # Nếu là request API thì bỏ qua (Flask tự match các route cụ thể trước, 
    # nhưng để chắc chắn ta check prefix)
    if path.startswith('api/'):
        return jsonify({'error': 'API endpoint not found'}), 404

    # Lấy URL đích từ DB
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT value FROM settings WHERE key = ?', ('embed_url',))
    row = cursor.fetchone()
    conn.close()
    
    base_target = row[0] if row else 'https://web-tra.pages.dev'
    # Loại bỏ dấu / cuối nếu có để nối chuỗi cho đẹp
    if base_target.endswith('/'):
        base_target = base_target[:-1]
    
    # Xây dựng URL đầy đủ
    # Nếu path rỗng nghĩa là trang chủ
    target_url = f"{base_target}/{path}"
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
        }
        
        # Requests tới trang đích
        response = requests.get(target_url, headers=headers, timeout=10)
        
        # Nếu là file tĩnh (JS/CSS/IMG), trả về nguyên bản (Stream content)
        content_type = response.headers.get('Content-Type', '')
        if 'text/html' not in content_type:
            return response.content, response.status_code, {'Content-Type': content_type}
            
        # NẾU LÀ HTML: Thực hiện tiêm mã (Injection)
        soup = BeautifulSoup(response.content, 'html.parser')

        # 1. Base Tag: Quan trọng nhất để React tải đúng JS/CSS từ server gốc
        if soup.head:
            for tag in soup.head.find_all('base'):
                tag.decompose()
            new_base = soup.new_tag('base', href=base_target + '/')
            soup.head.insert(0, new_base)

        # 2. MutationObserver Script: "Gián điệp" theo dõi React render
        # Script này chạy trên Browser của người dùng, không phải Server.
        smart_script = """
        <script>
            (function() {
                console.log("%c[Virtual Layer] System Ready - Global Text Edit Mode", "color: #00ff00; font-weight: bold; font-size: 14px;");
                
                // Danh sách các thẻ chứa văn bản phổ biến cần bắt
                const RELEVANT_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'LI', 'TD', 'TH', 'BUTTON', 'LABEL'];
                
                function isRelevantNode(node) {
                    // 1. Phải là Element Node
                    if (node.nodeType !== 1) return false;
                    // 2. Phải thuộc danh sách thẻ văn bản
                    if (!RELEVANT_TAGS.includes(node.tagName)) return false;
                    // 3. Phải có nội dung text thực sự (không phải rỗng)
                    if (!node.innerText || node.innerText.trim() === '') return false;
                    // 4. Tránh các thẻ đã xử lý rồi
                    if (node.getAttribute('data-virtual-scan') === 'true') return false;
                    // 5. Tránh các thẻ con nằm trong thẻ cha đã edit (để tránh lồng nhau quá nhiều)
                    if (node.isContentEditable) return false;

                    return true;
                }

                function highlightNode(node) {
                    if (!isRelevantNode(node)) return false;
                    
                    // Đánh dấu đã xử lý
                    node.setAttribute('data-virtual-scan', 'true');
                    node.setAttribute('contenteditable', 'true'); // Cho phép sửa trực tiếp
                    
                    // Style nhẹ nhàng để nhận biết (viền nét đứt mờ khi hover)
                    node.style.transition = "all 0.2s";
                    
                    // Sự kiện Focus: Hiện viền rõ
                    node.addEventListener('focus', () => {
                        node.style.outline = "2px dashed #3b82f6";
                        node.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
                    });
                    
                    // Sự kiện Blur: Tắt viền
                    node.addEventListener('blur', () => {
                        node.style.outline = "none";
                        node.style.backgroundColor = "transparent";
                        // Log thay đổi
                        console.log(`[Edit] ${node.tagName}:`, node.innerText);
                    });
                    
                    // Sự kiện Hover: Hiện viền mờ gửi ý
                    node.addEventListener('mouseenter', () => {
                        if (document.activeElement !== node) {
                            node.style.outline = "1px dashed #ccc";
                        }
                    });
                    node.addEventListener('mouseleave', () => {
                        if (document.activeElement !== node) {
                            node.style.outline = "none";
                        }
                    });

                    return true;
                }

                // Observer theo dõi toàn bộ thay đổi trong DOM
                const observer = new MutationObserver((mutations) => {
                    let countFound = 0;
                    mutations.forEach((mutation) => {
                        mutation.addedNodes.forEach((node) => {
                            if (highlightNode(node)) countFound++;
                            
                            // Quét sâu vào con của node mới thêm
                            if (node.querySelectorAll) {
                                // Chọn tất cả các thẻ trong danh sách RELEVANT_TAGS
                                const selector = RELEVANT_TAGS.join(',');
                                node.querySelectorAll(selector).forEach(child => {
                                    if(highlightNode(child)) countFound++;
                                });
                            }
                        });
                    });
                });

                // Bắt đầu theo dõi
                observer.observe(document.documentElement, { childList: true, subtree: true });

                // Quét lần đầu cho các phần tử static
                setTimeout(() => {
                    const selector = RELEVANT_TAGS.join(',');
                    const existing = document.querySelectorAll(selector);
                    existing.forEach(highlightNode);
                    console.log(`[Virtual Layer] Initial scan found ${existing.length} text elements.`);
                }, 1000);

            })();
        </script>
        """
        
        if soup.body:
            soup.body.append(BeautifulSoup(smart_script, 'html.parser'))
        
        return str(soup)

    except Exception as e:
        return f"Proxy Error: {e}", 500

if __name__ == '__main__':
    init_db()
    app.run(port=5000, debug=True)
