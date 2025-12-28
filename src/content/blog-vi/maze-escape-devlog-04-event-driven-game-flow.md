---
title: "Devlog #04 – 🎮 Vì sao mình dừng dùng BaseLevel inheritance cho game flow"
description: "Singleton thay cho Inheritance"
date: 2025-12-21
game: "Maze Escape"
tags: ["godot", "maze", "prototype"]
heroImage: "../../assets/images/maze-escape-devlog04.jpg"
---

## 🎮 Vì sao mình dừng dùng BaseLevel inheritance cho game flow

Hôm nay là một trong những ngày mà một “bug nhỏ” âm thầm biến thành **một bài học thiết kế lớn** 😅

---

### 🐞 Triệu chứng

- **Level 1**: Player chạm treasure ✨
    
    → debug log chạy
    
    → **nhưng không có popup WIN 😐**
    
- **Level 2**: Hoạt động hoàn hảo ✅

Debug log:

```
Hit player - emitglobal treasure collected

```

Nên là… treasure làm đúng nhiệm vụ của nó.

Signal đã emit.

Nhưng game thì… **không quan tâm 🙃**

---

### 🔍 Nguyên nhân thật sự (không như mình nghĩ)

Không phải collision.

Không phải Area2D.

Không phải signal.

Vấn đề thật sự là chỗ này 👇

> BaseLevel._ready() không hề chạy ở Level 1
> 

Trong Godot:

- Nếu child override `_ready()`
- Và **quên gọi `super._ready()`**
- Thì `_ready()` của base class **bị bỏ qua hoàn toàn** 😶

Chuyện đã xảy ra:

- Level 1 override `_ready()` ❌
- Mình quên `super._ready()` ❌
- BaseLevel không connect signal WIN ❌
- Treasure emit signal → **không có listener** ❌

Level 2 chỉ chạy được vì… *vô tình* không phá vỡ rule này 😬

---

### 😵 Vì sao bug này rất đau

- Không có error
- Log nhìn hoàn toàn đúng
- Logic gameplay có vẻ ổn
- Nhưng… **không có gì xảy ra**

Đây là loại bug tệ nhất:

> Mọi thứ trông đều đúng… trừ cái game 🤡
> 

---

### 🤔 Câu hỏi lớn hơn

Ngay cả khi fix bằng:

```
super._ready()

```

Mình vẫn dừng lại và tự hỏi:

- Mình có thật sự muốn **20 level** đều phải nhớ gọi `super` không?
- Mình có muốn logic win/lose phụ thuộc vào thứ tự `_ready()` không?
- Mình có muốn “future-me” debug lại thứ này lần nữa không? 😭

Câu trả lời: **Không.**

---

### 🔨 Quyết định: bỏ BaseLevel inheritance

Thay vì inheritance, mình chuyển sang **event-driven architecture** 🎯

Luật mới:

- Level chỉ **spawn object**
- Game flow được xử lý **toàn cục**
- Level không bind signal
- Không còn `super._ready()` ở đâu cả 🚫

---

### 🧱 Kiến trúc mới (dễ thở hơn hẳn)

- 🏆 **Treasure** → emit `treasure_collected`
- 💀 **Enemy** → emit `player_died`
- 🧠 **GameFlowManager (autoload)** → lắng nghe & update state
- 🗺️ **Level** → chỉ spawn player, enemy, treasure

Kết quả:

- Không bẫy lifecycle
- Không bất ngờ từ inheritance
- Không copy-paste
- Ít stress hơn hẳn 😌

---

### 🧠 Bài học hôm nay

1. `_ready()` là **nơi nguy hiểm** cho shared gameplay logic ⚠️
2. Inheritance + signal = dễ vỡ, khó phát hiện 😬
3. Event-driven scale tốt hơn rất nhiều cho game nhiều level 🚀
4. Nếu chỉ **Level 1** bị lỗi… hãy nghi lifecycle đầu tiên 😄

---

### ✅ Trạng thái hiện tại

- Level 1 và Level 2 hoạt động giống nhau 🎉
- Logic WIN / LOSE được centralize
- Thêm level mới **không cần wiring gameplay**
- “Future-me” đỡ khổ hơn một chút 🧠✨