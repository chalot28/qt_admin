import subprocess
import webbrowser
import time
import os
import sys

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

def main():
    # 1. Khởi động dự án React
    react_proc = start_react_app()
    
    # 2. Đợi một chút để server Vite kịp khởi động
    print("Đang đợi server Vite khởi động (khoảng 3 giây)...")
    time.sleep(3) 
    
    # 3. Mở trình duyệt với URL của Vite (mặc định là http://localhost:5173)
    url = "http://localhost:5173"
    print(f"Đang mở trình duyệt tại: {url}")
    webbrowser.open(url)
    
    print("\n---")
    print("Dự án đang chạy! Nhấn Ctrl + C để dừng cả hai dự án.")
    print("---")
    
    try:
        if react_proc:
            react_proc.wait()
    except KeyboardInterrupt:
        print("\nĐang dừng dự án...")
        if react_proc:
            react_proc.terminate()
            print("Đã dừng tiến trình React.")

if __name__ == "__main__":
    main()
