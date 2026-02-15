# Admin Python Service

Dự án này đóng vai trò là "bộ khởi động" (runner) cho cả hệ thống. Khi bạn chạy file này, nó sẽ tự động khởi động dự án React và mở trình duyệt.

## Tính năng
- **Tự động chạy React**: Kích hoạt `npm run dev` trong dự án `admin_QT`.
- **Tự động mở trình duyệt**: Mở trang web tại `http://localhost:5173`.
- **Quản lý tập trung**: Bạn chỉ cần chạy một lệnh duy nhất để khởi động toàn bộ môi trường phát triển.

## Cách chạy (Trên Windows)
1. **Mở terminal** và di chuyển vào thư mục này:
   ```powershell
   cd d:\admin_QT\python_service
   ```
2. **Kích hoạt môi trường ảo**:
   ```powershell
   .\venv\Scripts\activate
   ```
3. **Chạy dự án**:
   Dùng lệnh `py` (vì máy bạn đang nhận diện lệnh `py` là Python):
   ```powershell
   py main.py
   ```

## Cấu trúc dự án
- `main.py`: File điều khiển chính.
- `venv/`: Môi trường ảo Python (đã bỏ qua trong git).
- `requirements.txt`: Danh sách các package.
- `.gitignore`: Cấu hình chặn các file nặng và không cần thiết.
