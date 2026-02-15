import subprocess
import webbrowser
import time
import os
import sys
import threading

# Thêm thư viện để quét mã nguồn web
try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    requests = None
    BeautifulSoup = None

def start_react_app():
    # Dự án Python hiện đã nằm trong d:\admin_QT\python_service
    # Dự án React nằm tại d:\admin_QT (là thư mục cha)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    react_path = os.path.abspath(os.path.join(current_dir, ".."))
    
    if not os.path.exists(react_path):
        print(f"Lỗi: Không tìm thấy thư mục dự án React tại: {react_path}")
        return None

    print(f"Đang khởi động dự án React tại: {react_path}...")
    
    # Chạy lệnh npm run dev trong thư mục admin_QT
    # shell=True là cần thiết để chạy lệnh npm trên Windows
    try:
        process = subprocess.Popen(["npm", "run", "dev"], cwd=react_path, shell=True)
        return process
    except Exception as e:
        print(f"Không thể khởi động npm: {e}")
        return None

def start_python_server():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    server_script = os.path.join(current_dir, "server.py")
    python_exe = sys.executable # Dùng chính python đang chạy (nếu đã activate venv)
    
    # Nếu đang chạy từ venv của main.py, sys.executable sẽ trỏ tới đó
    print(f"Đang khởi động Python Server (Flask) tại: {server_script}...")
    try:
        process = subprocess.Popen([python_exe, server_script], cwd=current_dir)
        return process
    except Exception as e:
        print(f"Không thể khởi động Python Server: {e}")
        return None

def auto_scan_page(url, target_class):
    """
    Chức năng tự động quét mã nguồn trang web để tìm các thẻ có class chỉ định.
    """
    if not requests or not BeautifulSoup:
        print("\n[Auto Scan] Cảnh báo: Chưa cài đặt 'requests' và 'beautifulsoup4'.")
        print("Vui lòng chạy: pip install requests beautifulsoup4 để dùng tính năng quét.")
        return

    print(f"\n--- [Auto Scan] Bắt đầu quét: {url} ---")
    print(f"Đang tìm kiếm các thẻ có class: '{target_class}'...")

    try:
        # Gửi request lấy mã nguồn HTML
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            # Tìm tất cả thẻ có class là target_class
            found_tags = soup.find_all(class_=target_class)
            
            if found_tags:
                print(f"=> Tìm thấy {len(found_tags)} thẻ chứa class '{target_class}':")
                for idx, tag in enumerate(found_tags, 1):
                    print(f"   {idx}. Thẻ <{tag.name}>: {tag.get_text(strip=True)[:100]}")
            else:
                print(f"=> Không tìm thấy thẻ nào có class '{target_class}' trong mã nguồn HTML.")
        else:
            print(f"=> Lỗi kết nối: Mã trạng thái {response.status_code}")
    except Exception as e:
        print(f"=> Lỗi khi quét: {e}")
    print("--- [Auto Scan] Hoàn tất ---\n")

def main():
    # 1. Khởi động Python Server (API)
    api_proc = start_python_server()
    
    # 2. Khởi động dự án React
    react_proc = start_react_app()
    
    # 3. Đợi một chút để server Vite và Flask kịp khởi động
    print("Đang đợi các server khởi động (khoảng 5 giây)...")
    time.sleep(5) 
    
    # 4. Mở trình duyệt với URL của Vite (mặc định là http://localhost:5173)
    url = "http://localhost:5173"
    print(f"Đang mở trình duyệt tại: {url}")
    webbrowser.open(url)
    
    # 5. Tự động quét mã nguồn
    auto_scan_page(url, "test_conten")

    print("\n---")
    print("Cả hai server đang chạy!")
    print("React: http://localhost:5173")
    print("API: http://localhost:5000")
    print("Nhấn Ctrl + C để dừng.")
    print("---")
    
    try:
        while True:
            time.sleep(1)
            # Kiểm tra xem các tiến trình còn sống không
            if api_proc.poll() is not None:
                print("Python Server đã dừng đột ngột.")
                break
            if react_proc.poll() is not None:
                print("React App đã dừng đột ngột.")
                break
    except KeyboardInterrupt:
        print("\nĐang dừng các dự án...")
    finally:
        if react_proc:
            react_proc.terminate()
            print("Đã dừng tiến trình React.")
        if api_proc:
            api_proc.terminate()
            print("Đã dừng tiến trình API.")

if __name__ == "__main__":
    main()
