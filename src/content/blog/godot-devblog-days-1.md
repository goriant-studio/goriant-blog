---
title: 'Devlog #1 — My Game Development Journey'
description: 'Chuyển từ C# sang GDScript & Xây dựng Maze Game với Godot 4.5'
date: 2023-01-01
heroImage: '/public/images/first-devlog.png'
---

Xin chào mọi người!

Hôm nay mình muốn chia sẻ một bước tiến quan trọng trong hành trình làm game indie: **chuyển toàn bộ project Maze Escape từ C# sang GDScript**, và đặc biệt là **lần đầu tiên export game sang Web để chạy trực tiếp trên GitHub Pages**.

Ban đầu mình nghĩ việc này đơn giản, nhưng thực tế mình đã học được rất nhiều điều thú vị về cách Godot vận hành. Đây là toàn bộ những trải nghiệm mới mẻ của mình trong ngày hôm nay.

Xin mời bạn [Play Maze Escape](/games/Maze/index.html){:target="_blank"}

---

## 🚧 Vì sao mình phải bỏ C# trong Godot 4.x?

Project ban đầu dùng C# vì mình quen Unity. Nhưng khi thử export Web, Godot thông báo:

> **Exporting to Web is currently not supported when using C#/.NET**

Tóm lại:

- ❌ Web export **không hỗ trợ C#**
- ✔ Web export **chỉ hoạt động với GDScript**

Vậy nên mình quyết định **convert toàn bộ code sang GDScript**.  
Một cú “đập đi làm lại” đúng nghĩa — nhưng hóa ra lại là cơ hội cực tốt để hiểu Godot sâu hơn.

---

## ✨ Viết lại Player bằng GDScript

Mình bắt đầu từ Player — phần đơn giản nhất nhưng là nền tảng gameplay.

```python
extends CharacterBody2D

@export var speed: float = 150.0

func _physics_process(delta):
    var input := Vector2.ZERO

    if Input.is_action_pressed("move_left"):  input.x -= 1
    if Input.is_action_pressed("move_right"): input.x += 1
    if Input.is_action_pressed("move_up"):    input.y -= 1
    if Input.is_action_pressed("move_down"):  input.y += 1

    velocity = input.normalized() * speed
    move_and_slide()
```

GDScript cho cảm giác **gọn – nhanh – tự nhiên**, thân thiện với workflow làm game hơn C# rất nhiều.

---

## 🧱 Xây dựng Maze 10×10 từ code

Maze được build hoàn toàn bằng mảng 2D:

```python
var maze_10x10 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1],
    ...
]
```

Mỗi ô tường tạo ra:

- `StaticBody2D`
- `CollisionShape2D`
- `Sprite2D`

Cách này **linh hoạt hơn TileMap**, và cực nhanh để prototype.

---

## 📐 Tính toán Tile Size cho màn hình 1920×1080

Maze 10×10 → cần tile vuông và đẹp nhất trên widescreen.

Công thức:

```
tile_size = screen_height / 10
tile_size = 1080 / 10 = 108 px
```

Kết quả:

- Maze có kích thước: **1080×1080 px**
- Hai bên thừa mỗi bên **420px**
- Rất hợp để đặt UI / button / debug panel

---

## 🎮 Viết Joystick cho mobile trong Godot 4

Joystick mình viết lại với GDScript:

```python
extends Control

@export var radius: float = 80.0
var output := Vector2.ZERO

func _gui_input(event):
    if event is InputEventScreenTouch:
        if event.pressed:
            update_knob(event.position)
        else:
            reset_knob()
    elif event is InputEventScreenDrag:
        update_knob(event.position)
```

Player chỉ cần đọc:

```python
if joystick.output.length() > 0.1:
    input = joystick.output
```

Và thế là chạy mượt trên mobile 😊

---

## 🔥 Những file nào cần ignore khi dùng Git?

Godot 4 có `.uid` để lưu identity của resource.

Bảng tổng hợp chuẩn nhất:

| File / Folder | Commit? | Lý do |
|---------------|---------|-------|
| `.import/` | ❌ Không | Cache, nặng, có thể tái tạo |
| `*.import` | ✔ Có | Metadata import |
| `*.uid` | ✔ Có | Cực quan trọng trong Godot 4 |
| `.mono/`, `.csproj`, `.sln` | ❌ Không | Thuộc .NET, không dùng Web |

Nhờ ignore đúng → repo của mình **nhẹ, sạch, dễ deploy**.

---

## 🚀 Lần đầu export Web thành công!

Sau khi:

- Xóa toàn bộ file C#: `.mono/`, `.csproj`, `.sln`
- Convert sang GDScript
- Cấu hình lại `project.godot`

Mình export Web thành công ngay 🎉

Chạy local:

```
python3 -m http.server 8000
```

Rồi deploy GitHub Pages — chỉ mất vài phút.

Cảm giác lần đầu game của mình chạy được trên trình duyệt thật sự rất “đã”.

---

## 🎉 Kết luận – Những gì mình học được hôm nay

- Godot 4 Web Export **chỉ hỗ trợ GDScript**
- GDScript sạch, gọn và hợp với phong cách của Godot
- Maze build bằng code dễ điều chỉnh, dễ scale
- Joystick mobile viết đơn giản bất ngờ
- File `.uid` **bắt buộc commit**
- Folder `.import/` **tuyệt đối không commit**
- Web Export + GitHub Pages: nhanh, dễ, chuẩn indie dev
- Mình đã có **prototype gameplay hoàn chỉnh** chỉ trong một ngày

---

## 🔭 Ngày mai mình sẽ làm gì?

Mình đang phân vân giữa:

- Thêm animation cho Player  
- Smooth Camera Follow  
- Thuật toán tạo maze ngẫu nhiên (DFS / Prim / Kruskal)  
- UI menu với hiệu ứng transition  

Nếu bạn đang theo dõi hành trình này, hẹn gặp lại vào ngày mai!
