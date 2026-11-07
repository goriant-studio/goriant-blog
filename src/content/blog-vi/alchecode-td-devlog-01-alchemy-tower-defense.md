---
title: "Devlog #01 – Nhà Giả Kim (AlcheCode TD): Khi Thủ Thành Kết Hợp Lò Giả Kim & Sách Đồ Giám Toàn Cầu"
description: "Xây dựng game Thủ Thành pha chế nguyên tố kết hợp điều khiển Tướng và lưu danh Sách Đồ Giám Toàn Cầu trên Cloudflare Workers."
date: 2026-11-07
game: "AlcheCode TD"
tags: ["tower-defense", "phaser3", "cloudflare", "alchemy", "web-game"]
---

# **⚗️ Devlog #01 – Nhà Giả Kim (AlcheCode TD): Khi Thủ Thành Kết Hợp Lò Giả Kim & Sách Đồ Giám Toàn Cầu**

## **👋 Ý Tưởng Khởi Nguồn**

Xin chào mọi người 👋

Sau khi thử sức với thể loại sinh tồn hành động trong **Neon Survivor**, mình muốn làm một tựa game **Tower Defense (Thủ Thành)** nhưng không dừng lại ở việc đặt những trụ cố định có sẵn.

Câu hỏi đặt ra là: *“Sẽ thế nào nếu người chơi tự tay pha chế các nguyên tố trong Lò Giả Kim để tạo ra hàng chục loại Tháp Đột Biến khác nhau — và bất kỳ ai tìm ra công thức mới đầu tiên trên thế giới sẽ được khắc tên vĩnh viễn vào Sách Đồ Giám Toàn Cầu?”*

Đó chính là lúc **Nhà Giả Kim (AlcheCode TD)** ra đời!

---

## **🔥 Điểm Đặc Biệt Trong Gameplay**

### **1. ⚗️ Lò Hợp Nhất Nguyên Tố (2–3 Nguyên Tố)**
Thay vì chỉ xây tháp cơ bản, bạn có thể bỏ **2 hoặc 3 nguyên tố** vào **Lò Giả Kim** để đúc ra các **Tháp Đột Biến** mang hiệu ứng hoàn toàn mới (như *Trụ Sốc Nhiệt*, *Tháp Bão Từ*, hay các tháp cấp Thần Thoại).
- Quái vật bị tiêu diệt có tỉ lệ rơi ra **Tinh Chất Nguyên Tố**, giúp **giảm 100% chi phí** của nguyên liệu đó trong lần đúc tiếp theo!

### **2. 🌍 Sách Đồ Giám Toàn Cầu (Cloudflare Global Codex)**
Mỗi khi một công thức Tháp Giả Kim mới được pha chế thành công lần đầu tiên, hệ thống backend trên **Cloudflare Workers** sẽ phát thông báo toàn cầu và **lưu tên Nhà Giả Kim đầu tiên khám phá ra công thức đó**. Người chơi đến sau có thể mở Sách Đồ Giám để xem và nạp nhanh công thức vào Lò.

### **3. 🧙‍♂️ Điều Khiển Nhà Giả Kim Trực Tiếp Trên Chiến Trường**
Bạn không chỉ đứng nhìn tháp bắn! Nhân vật **Nhà Giả Kim** có thể:
- Di chuyển tự do bằng `WASD`, tốc biến bằng `Space` và kích hoạt kỹ năng **Quá Tải (`E`)**.
- Thu thập kinh nghiệm để **Thăng Cấp** và chọn **1 trong 3 Đột Biến Kỹ Năng (Perks)** theo phong cách Roguelite.
- Chủ động bấm **Triệu Hồi Boss Arch-Chimera** để thử thách đội hình tháp và săn phần thưởng lớn.

---

## **🛠️ Công Nghệ Sử Dụng**

- 🎮 **Phaser 3**: Xử lý vòng lặp chiến đấu, đạn đạo, hiệu ứng hạt và AI của quái/tháp.
- ⚡ **Cloudflare Workers**: Lưu trữ **Sách Đồ Giám Toàn Cầu (Global Codex)** và **Bảng Xếp Hạng Nhà Giả Kim** theo thời gian thực với độ trễ cực thấp.
- 🎨 **Hybrid Canvas + Modern UI**: Kết hợp màn hình chiến trường 60fps với thanh Xưởng Giả Kim trực quan bên cạnh.

---

## **🚀 Chơi Thử Ngay!**

Bạn đã sẵn sàng pha chế công thức Tháp Thần Thoại đầu tiên mang tên mình chưa?

👉 **[Chơi ngay Nhà Giả Kim (AlcheCode TD) trên Web tại đây!](/vi/games/alchecode-td/play)**
