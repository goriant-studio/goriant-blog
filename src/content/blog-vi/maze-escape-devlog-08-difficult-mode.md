---
title: "🌫️Devlog #08 — Hoàn thành Difficult Mode, polish HUD & fix Player Life 🎮🔥"
description: "Hoàn thành"
date: 2026-01-11
game: "Maze Escape"
tags: ["godot", "maze", "prototype"]
heroImage: "../../assets/images/maze-escape-devlog08.png"
---


Hôm nay là một ngày **khá đã** 😌

Không phải vì mình thêm được feature gì “wow”, mà vì **3 việc quan trọng cuối cùng cũng gọn gàng xong**:

- ✅ Hoàn thành **Difficult Mode**
- 🎨 **Polish lại HUD** cho rõ ràng, dễ nhìn hơn
- 🛠️ **Fix dứt điểm vấn đề Player Life** đã làm mình khó chịu suốt mấy ngày

---

## 1️⃣ Difficult Mode – Không chỉ là tăng số 😈

Ban đầu mình nghĩ *“Difficult mode chắc chỉ là giảm mạng + tăng tốc enemy”*.

Nhưng khi bắt tay làm thật thì nhận ra **nó phải nhiều hơn vậy**.

### Những thứ mình đã chỉnh:

- Player có **ít mạng hơn** → buộc phải chơi cẩn thận
- Enemy **hung hăng hơn** (tốc độ / tần suất / khoảng phát hiện)
- Sai lầm bị **phạt rõ ràng hơn** (lỡ tay là thấy đau liền 😅)

👉 Bài học lớn nhất:

> Difficult mode tốt phải thay đổi cảm giác chơi, không chỉ thay đổi con số.
> 

Chỉ tăng damage sẽ khiến game cảm giác “gian”, chứ không phải “khó”.

---

## 2️⃣ Polish HUD – Nhỏ nhưng ảnh hưởng rất lớn 👀

HUD cũ:

- Thông tin đủ, nhưng **hơi rối**
- Player phải nhìn HUD nhiều hơn là nhìn game 😵

Mình đã:

- Bỏ bớt chi tiết thừa
- Làm rõ phần **player life** để nhìn là hiểu ngay
- Đồng bộ màu sắc để trạng thái dễ nhận biết

Sau khi polish:

- Mắt đỡ mệt hơn
- Trải nghiệm chơi mượt hơn, dù **không hề đổi core gameplay**

👉 Bài học rút ra:

> HUD tốt làm game “feel” tốt hơn, dù logic gameplay không đổi.
> 

---

## 3️⃣ Fix Player Life – Bug nhỏ nhưng phá trải nghiệm 💥

Vấn đề cũ:

- Life update **không đúng thời điểm**
- Có lúc player đáng lẽ chết rồi mà vẫn sống
- Restart level nhưng life **không reset đúng**

Cách mình xử lý:

- Gom toàn bộ logic life về **một chỗ duy nhất**
- Không để update life rải rác khắp nơi
- Reset state rõ ràng khi:
    - Bắt đầu level
    - Restart
    - Đổi difficulty

👉 Bài học xương máu:

> State mà cho update lung tung thì sớm muộn cũng sẽ bug.
> 

---

## Tổng kết ngày hôm nay 🧠

- Game **khó hơn nhưng công bằng hơn**
- HUD **gọn gàng, dễ đọc**
- Player life **ổn định và dễ đoán**

Không có feature mới “hoành tráng”,

nhưng game **chắc tay hơn rất nhiều**.

📌 Việc tiếp theo:

- Test lại toàn bộ flow từ Easy → Difficult
- Kiểm tra chỗ nào “khó quá mức chịu đựng” không
- Chuẩn bị cho bước tiếp theo 🚀

> Làm chậm nhưng chắc.
> 
> 
> Mỗi ngày fix được một thứ khó chịu là game tốt lên một chút 😄
>