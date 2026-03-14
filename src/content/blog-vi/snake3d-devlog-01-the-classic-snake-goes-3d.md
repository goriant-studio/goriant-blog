---
title: "Devlog #01 – Snake3D: Con Rắn Cổ Điển Lên 3D"
description: "Xây dựng game rắn 3D từ đầu với Three.js"
date: 2025-03-15
game: "Snake3D"
tags: ["threejs", "snake", "3d", "web-game"]
---

# **🐍 Dev Log #1 – Snake3D: Con Rắn Cổ Điển Lên 3D**

## **👋 Một Game Mới Ra Đời**

Xin chào 👋

Sau khi làm MazeEscape, mình muốn thử thách bản thân trong một lĩnh vực mới — **phát triển game 3D trên trình duyệt**.

Kết quả? **Snake3D** — phiên bản 3D hiện đại của game rắn săn mồi cổ điển, xây dựng hoàn toàn bằng **Three.js**.

---

## **❓ Tại sao lại là Snake3D?**

Game rắn cổ điển:

- Dễ hiểu
- Chơi vui
- Là dự án tuyệt vời để học lập trình 3D

Mình muốn khám phá:

- 🧊 **Render 3D** với Three.js
- 🎮 **Cơ chế game** trong không gian 3D
- ✨ **Hiệu ứng hình ảnh** như ánh sáng, bóng đổ và animation mượt mà

> Lấy thứ quen thuộc và thổi vào đó góc nhìn 3D mới mẻ — thử thách hoàn hảo.

---

## **🛠️ Công Nghệ Sử Dụng**

Trong dự án này, mình dùng:

- 🌐 **Three.js** để render 3D
- 🎨 **CSS** cho UI overlay
- 📦 **Vanilla JavaScript** — không framework, code thuần
- 🧩 Host trên **blog Astro** dưới dạng game tĩnh

Không cần build tools. Chỉ cần mở trình duyệt là chơi!

---

## **🧱 Phiên Bản Đầu Tiên Có Gì?**

### **✅ Rắn 3D**

- Con rắn di chuyển trong lưới 3D
- Dài ra khi ăn mồi
- Di chuyển mượt và camera theo dõi

### **✅ Hệ Thống Mồi**

- Mồi xuất hiện ngẫu nhiên
- Phản hồi hình ảnh khi ăn

### **✅ Phát Hiện Game Over**

- Phát hiện va chạm bản thân
- Va chạm tường/biên

### **✅ Theo Dõi Điểm**

- Điểm cho mỗi mồi ăn được
- Hiển thị điểm real-time

---

## **🤯 Thử Thách Mình Gặp**

Làm game 3D mang đến hàng loạt thử thách mới:

- **Góc camera** — tìm góc nhìn phù hợp để game có thể chơi được
- **Phát hiện va chạm 3D** — phức tạp hơn 2D nhiều
- **Hiệu suất** — giữ 60fps trên trình duyệt với render 3D
- **Điều khiển** — làm cho di chuyển cảm thấy tự nhiên trong 3D

Mỗi vấn đề dạy mình điều mới về Three.js và phát triển game.

---

## **🚀 Tiếp Theo Là Gì?**

Trong các bản cập nhật sau, mình dự định thêm:

- 🎵 Âm thanh và nhạc nền
- 🌈 Hiệu ứng hình ảnh và ánh sáng đẹp hơn
- 📱 Điều khiển cảm ứng cho mobile
- 🏆 Hệ thống điểm cao
- 🧩 Các chế độ chơi khác nhau

---

## **❤️ Cảm Ơn Đã Đọc!**

Nếu bạn thích indie game và web development, hãy theo dõi hành trình Snake3D nhé.

Bạn có thể **chơi ngay bây giờ** trên [trang Snake3D](/vi/games/snake-3d/play)!

Cho mình biết bạn nghĩ gì nhé 🎉
