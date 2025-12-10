---
title: 'My Game Dev Journey Day 1'
description: 'Chuyển từ C# sang GDScript & Xây dựng Maze Game với Godot 4.5'
pubDate: 'Dec 10 2025'
heroImage: '/public/blog-placeholder-1.jpg'
---

Xin chào mọi người!

Hôm nay mình muốn chia sẻ một bước tiến quan trọng trong hành trình làm game indie: chuyển toàn bộ project Maze Escape từ C# sang GDScript, và đặc biệt lần đầu tiên export game sang Web để chạy trực tiếp trên GitHub Pages.

Ban đầu mình nghĩ việc này đơn giản, nhưng hóa ra mình đã học được rất nhiều điều thú vị về cách Godot vận hành. Và đây là toàn bộ trải nghiệm của mình trong ngày hôm nay.

⸻

🚧 Vì sao mình phải bỏ C# trong Godot 4.x?

Dự án của mình khởi đầu bằng C# vì mình đã quen ngôn ngữ này từ Unity.
Nhưng ngay khi thử export sang Web, Godot báo:

Exporting to Web is currently not supported when using C#/.NET

Điều này dẫn đến một kết luận khá buồn nhưng rõ ràng:
	•	❌ Godot 4 Web Export không hỗ trợ C#
	•	✔ Web Export chỉ hoạt động với GDScript

Nên mình quyết định convert toàn bộ code sang GDScript.

Đây là một cú “đập đi xây lại”, nhưng cũng là cơ hội tốt để mình hiểu Godot sâu hơn.

⸻

✨ Viết lại Player bằng GDScript

Mình bắt đầu từ Player — đơn giản nhất nhưng là nền tảng gameplay.

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

Nhìn rất gọn và tự nhiên.
GDScript làm mình cảm giác “game-code friendly” hơn là C#.

⸻

🧱 Xây dựng Maze 10×10 từ code

Maze được build bằng mảng 2D:

var maze_10x10 = [
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,1,0,0,0,0,0,1],
	[1,0,1,1,0,1,1,1,0,1],
	...
]

Mỗi ô tường sẽ tạo ra:
	•	StaticBody2D
	•	CollisionShape2D
	•	Sprite2D

img.fill(color)

Cách này nhanh hơn rất nhiều.

⸻

📐 Tính toán Tile Size cho 1920×1080

Maze của mình là 10×10 cells.
Mình muốn maze vuông và đẹp nhất trên màn hình widescreen.

Công thức:

tile_size = screen_height / 10
tile_size = 1080 / 10 = 108 px

Maze sẽ có kích thước:
	•	1080×1080 px
	•	Hai bên mỗi bên thừa 420px → rất đẹp để đặt UI

⸻

🎮 Joystick cho mobile trong Godot 4

Mình cũng viết lại Joystick bằng GDScript.

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

Sau đó Player chỉ cần đọc:

if joystick.output.length() > 0.1:
    input = joystick.output

Và thế là chạy mượt trên mobile.

⸻

🔥 Những file nào cần ignore khi dùng Git?

Godot 4 có hệ thống file .uid để giữ reference asset.
Nên sau khi tìm hiểu kỹ, mình rút ra bảng sau:

File / Folder	Commit?	Lý do
.import/	❌ Không	Là cache, nặng và tái tạo được
*.import	✔ Có	Metadata import của asset
*.uid	✔ Có	Identity của resource trong Godot 4
.mono/, .csproj, .sln	❌ Không	Thuộc .NET, không dùng cho Web

Nhờ ignore đúng, project của mình trở nên sạch và nhẹ hơn rất nhiều.

⸻

🚀 Lần đầu export Web thành công!

Sau khi:
	•	Xóa toàn bộ file C#: .mono/, .csproj, .sln
	•	Convert toàn bộ sang GDScript
	•	Sửa lại project.godot

Cuối cùng mình export Web thành công!

Rồi chạy local bằng Python:

python3 -m http.server 8000

Và mọi thứ chạy mượt.
Deploy lên GitHub Pages cũng chỉ mất vài phút.

⸻

🎉 Kết luận – Những gì mình học được hôm nay
	•	Godot 4 Web export chỉ hỗ trợ GDScript
	•	GDScript rất sạch và hợp với Godot
	•	Maze có thể build đẹp từ code và giữ tỉ lệ hoàn hảo
	•	Joystick mobile viết cực dễ
	•	File .uid cực kỳ quan trọng trong Godot 4
	•	.import/ phải ignore
	•	Web export + GitHub Pages rất dễ triển khai
	•	Mình đã có một gameplay prototype hoàn chỉnh trong một ngày

⸻

🔭 Ngày mai mình sẽ làm gì?

Mình đang phân vân muốn làm tiếp:
	•	Animation cho Player
	•	Smooth Camera Follow
	•	Thuật toán tạo maze ngẫu nhiên (DFS / Prim / Kruskal)
	•	UI menu với hiệu ứng chuyển cảnh

Nếu bạn đang theo dõi hành trình này, nhớ ghé lại vào ngày mai nhé!

⸻

Nếu bạn muốn mình viết giúp banner hình, hoặc version tiếng Anh, hoặc copywriting mạnh hơn cho SEO, chỉ cần nói: “generate English blog version” hoặc “viết phiên bản SEO” nhé!