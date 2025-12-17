---
title: "Devlog #02 – Level 2 hình thành, Enemy chuẩn hóa & tile đầu tiên ra đời 🎉"
description: "Thêm mê cung mới nha"
date: 2025-12-17
game: "Maze Escape"
tags: ["godot", "maze", "prototype"]
heroImage: "../../assets/new-maze-level-devlog02.jpg"
---

## **🧱 Devlog – Level 2 hình thành, Enemy chuẩn hóa & tile đầu tiên ra đời 🎉**

Hôm nay mình tiếp tục build **Level 2 cho MazeEscape** và cảm giác rất là ... đã 😄😄😄

**mọi thứ bắt đầu vào form thật sự**

---

### **🎯 Achievement mở khóa hôm nay**

- ✅ Refactor **Enemy theo hướng abstract – data-driven**
- ✅ Chỉ còn **1 Enemy duy nhất**, level khác nhau chỉ đổi thông số & sprite
- ✅ Scene gọn gàng, editor nhìn phát hiểu ngay
- ✅ Practice **TileSet + TileMap** (dù chưa auto-tiling chuyên nghiệp 😅)
- ✅ **Vẽ xong maze Level 2 bằng TileMap**
- ✅ Và quan trọng nhất…

👉 **Lần đầu tiên dùng Affinity Studio để vẽ game asset 64×64 của riêng mình** 🎨✨

---

### **🧠 Điều mình học được hôm nay**

Trước đây mình thường:

- ưu tiên code cho chạy
- new node trong script cho nhanh

Nhưng khi bước sang Level 2, mình bắt đầu thấy rõ:

- Scene phải **tự nói lên cấu trúc**
- Logic nên tách khỏi data
- Enemy không nên biết mình đang ở level mấy

Giờ đây:

- Enemy chỉ cần sprite + vài con số
- Level 1 / Level 2 khác nhau chủ yếu ở **cách sắp xếp và nhịp gameplay**

Cảm giác rất “đúng bài”.

---

### **🧩 Về TileMap & TileSet**

Mình chưa làm được auto-tiling chuyên nghiệp (còn phải học thêm 😄)

nhưng:

- đã hiểu cách TileMap vận hành
- đã tự tay **vẽ maze Level 2 bằng tile**
- và quan trọng hơn là **game chạy được – chơi được**

👉 Với mình, vậy là đủ để tiếp tục.

---

### **🎨 Game asset 64×64 đầu tiên**

Một cột mốc nhỏ nhưng rất vui:

- Lần đầu mở **Affinity Studio**
- Lần đầu set canvas 64×64
- Lần đầu vẽ tile cho game của chính mình

Không đẹp xuất sắc, nhưng:

👉 **nó là của mình**, và nó đang chạy trong game 😄

---

### **🎮 Cảm giác hiện tại**

Level 2 chưa hoàn thiện, nhưng:

- Maze rộng hơn
- Enemy ép góc tốt hơn
- Gameplay bắt đầu có nhịp rõ ràng

MazeEscape bắt đầu **“có mùi game” rồi**.

---

### **⏭️ Next steps**

- Hoàn thiện TileSet (học auto-tiling đàng hoàng)
- Tinh chỉnh độ khó Level 2
- Playtest nhiều hơn
- Viết tiếp devlog khi người chơi… bắt đầu chết nhiều hơn 😈

---

Nếu bạn muốn:

- Mình có thể **rút gọn bản này** cho homepage
- Hoặc viết thêm **1 đoạn khoe Affinity + asset đầu tay** riêng
- Hoặc chỉnh lại cho **giọng hài hước hơn nữa**

👉 Cứ nói, mình chỉnh cho đúng “chất Goriant” 🎮✨