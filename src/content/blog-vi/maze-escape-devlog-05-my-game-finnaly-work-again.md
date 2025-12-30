---
title: "🧩 Devlog #05 – Khi Game Của Mình Cuối Cùng Cũng Hoạt Động Trở Lại"
description: "devlog 05"
date: 2025-12-25
game: "Maze Escape"
tags: ["godot", "maze", "prototype"]
heroImage: "../../assets/images/maze-escape-devlog05.png"
---


> Hôm nay đúng kiểu…
> 
> 
> **căng não 😮‍💨**
> 

> Nhưng cũng
> 
> 
> **đã đời vô cùng 😌✨**
> 

### **Cuối cùng mình đã**

### **fix xong toàn bộ vấn đề collision**

### **trong game 🎉**

Không phải kiểu “chạy được đại khái”, mà là **chạy đúng thật sự**, ổn định, xuyên suốt từ level, enemy cho tới hitbox ✅

Đây là một trong những ngày mà mình đã trải qua đủ mọi cảm xúc:

- hoang mang 😵
- bực bội 😤
- nghi ngờ chính mình 🤔

…rồi **đột nhiên**:

- mọi thứ thông não 💡
- và mình lại thấy mình giống một game dev thực thụ 🎮✨

---

## **😵 Triệu chứng**

*(a.k.a. “Sao Godot lại troll mình vậy?”)*

Những gì mình thấy lúc đó:

- Debug collision của enemy **lúc hiện lúc không** 👻
- Level 1 thì chạy, Level 2 thì… không 🤷‍♂️
- Có enemy thì có collision, còn 10 con khác thì không
- Logic hitbox có chạy… nhưng debug thì trống trơn
- Fix được một chỗ → chỗ khác lại hỏng 🔄

Có lúc mình đã tự hỏi thật sự:

> “Godot bị lỗi… hay là mình bị lỗi?” 😅
> 

---

## **🕵️ Nguyên nhân thật sự**

*(và có… RẤT NHIỀU)*

Sau khi debug tới nơi tới chốn, đây là những gì **thực sự** sai 👇

### **1️⃣ Hai script Enemy dùng chung**

### **class_name**

- enemy_script.gd
- enemy_scene.gd
- Cả hai đều khai báo class_name Enemy

💥 Điều này gây ra **hành vi không xác định**

Godot không hề cảnh báo gì cả.

Nó chỉ đơn giản là… chạy rất kỳ 😐

**Bài học rút ra:**

> ❗ Một class_name = một script. Không có ngoại lệ.
> 

---

### **2️⃣ Enemy không phải prefab instance thật**

Một số enemy là:

- node bị copy tay ✂️
- bị tách khỏi file .tscn gốc
- âm thầm bị lệch sync 😬

Hệ quả là:

- mình fix đúng **1 enemy**
- còn mấy con kia thì vẫn lỗi 😑

**Bài học:**

> ❗ Đã là prefab thì phải instance. Đừng bao giờ copy node.
> 

---

### **3️⃣ CollisionShape bị disable (editor vs code)**

Một số shape:

- tồn tại ✔️
- layer / mask đúng ✔️
- nhưng disabled = true ❌

Godot vẫn không báo lỗi.

Debug thì… không vẽ gì cả 🙃

**Bài học:**

> ❗ Đừng trộn setup collision giữa editor và code.
> 

---

### **4️⃣ CÁI BẪY LỚN NHẤT: scale Enemy node 😱**

Đây mới là **trùm cuối**.

Mình có:

```
Enemy (CharacterBody2D)
Scale = (0.05, 0.05)
```

Điều này đồng nghĩa:

- CollisionShape cũng bị scale theo
- Debug shape nhỏ xíu 🤏
- Nó *có tồn tại*… chỉ là không nhìn thấy 👻

**Bài học vàng (rất đáng nhớ):**

> ❗ Đừng bao giờ scale physics body
> 

> ✅ Chỉ scale phần hiển thị (Sprite2D)
> 

Khi mình reset Enemy về (1,1) và chỉ scale sprite…

💥 Mọi thứ bỗng nhiên **hợp lý hoàn toàn**.

---

## **💡 Khoảnh khắc “À HAAAA”**

Mình bật:

```
Debug → Visible Collision Shapes
```

Và rồi…

🟦 Enemy body

🟩 Hitbox

🟦 Tất cả enemy

🟦 Tất cả level

**Cái gì cũng hiện. Cái gì cũng va chạm đúng.**

Mình đã… cười một mình trước màn hình 😄

Cảm giác kiểu:

> “À… ra là nó phải hoạt động như thế này.”
> 

---

## **🧠 Những Gì Mình Học Được Hôm Nay**

Không chỉ là collision.

Mà là:

- Kỷ luật prefab 🧱
- Quyền sở hữu script 📜
- Tách biệt visual và physics 🎨⚙️
- Debug **có hệ thống**, không theo cảm xúc 🧠

Và bài học lớn nhất:

> 🧠 Khi mọi thứ trông có vẻ “random”, thủ phạm thường là
> 
> 
> **architecture**
> 

---

## **🎮 Trạng Thái Hiện Tại**

*(Cảm giác rất sướng 😌)*

Bây giờ:

- Enemy prefab gọn gàng
- Một script, một trách nhiệm
- Collision theo data
- Debug dễ đọc
- Hitbox / hurtbox cực kỳ ổn định ✅

Game cảm giác **vững lại hẳn**.

Và sự ổn định đó cho mình thêm động lực 🚀

---

## **❤️ Lời Kết**

Hôm nay nhắc mình nhớ vì sao game dev vừa khó…

…vừa gây nghiện 😅

Mình vật lộn hàng giờ.

Mình nghi ngờ mọi thứ.

Rồi *click*—

Mình hiểu ra một điều **rất sâu** 💡

Và hiểu rồi là nhớ mãi.

Tiếp tục bug tiếp theo 🐛

Nhưng tối nay… mình tự hào về bản thân 😌✨