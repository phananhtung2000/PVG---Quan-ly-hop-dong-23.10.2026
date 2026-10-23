# Quản lý hợp đồng khách hàng (PVG) — PWA

6 file (đặt ngang hàng ở thư mục gốc repo): index.html, manifest.json, sw.js, icon-192.png, icon-512.png, icon-512-maskable.png

## Deploy lên GitHub Pages
1. Tạo repo mới (ví dụ `pvg-hop-dong`, Public). Upload đủ 6 file lên thư mục gốc repo (không đặt trong thư mục con).
2. Settings → Pages → Source: Deploy from a branch → Branch `main`, thư mục `/ (root)` → Save.
3. Chờ 1–2 phút, mở `https://<username>.github.io/pvg-hop-dong/`. Đường dẫn đều tương đối nên không cần sửa gì.
4. Mỗi app cài riêng nên đặt ở một repo riêng; không đặt app ở repo `<user>.github.io`.

## Kiểm tra
- Android: Chrome → menu ⋮ → "Cài đặt ứng dụng" / "Thêm vào Màn hình chính".
- Windows 11: Edge/Chrome → biểu tượng "Cài đặt" trên thanh địa chỉ (hoặc menu → Ứng dụng → Cài đặt trang này như một ứng dụng).
- Lighthouse: DevTools → Lighthouse → chọn Progressive Web App → Analyze.
- Vẫn mở được bằng double-click (file://), service worker tự bỏ qua khi mở kiểu này.

## Cập nhật phiên bản
Chỉ đổi `v1` → `v2` trong `CACHE_NAME` ở sw.js và thay index.html. Không đổi id, start_url, scope, tên file icon.

## Lỗi "Ứng dụng này đã được cài đặt rồi" nhưng không mở được (Android)
a. Xuất/sao lưu dữ liệu trong app trước, không bấm nút đặt lại (Reset).
b. Cài đặt → Ứng dụng, gỡ mục "Quản lý hợp đồng khách hàng" (và portal nếu có).
c. Đóng hẳn Chrome rồi mở lại link.
d. Nếu Chrome vẫn không hiện "Cài đặt ứng dụng": kiểm tra scope/id không trùng hoặc lồng với app khác cùng domain.
e. Chỉ khi vẫn kẹt mới xoá dữ liệu Chrome / gỡ cài lại Chrome — cách này xoá luôn dữ liệu localStorage/IndexedDB của mọi app trên domain, nên bắt buộc sao lưu trước.
