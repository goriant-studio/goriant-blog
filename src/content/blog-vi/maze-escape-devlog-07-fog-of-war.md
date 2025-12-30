---
title: "🌫️ Devlog #07 — Fog of War: Hai Lỗi Ngớ Ngẩn, Một Cách Fix Chuẩn 😅"
description: "Fog of War"
date: 2025-12-28
game: "Maze Escape"
tags: ["godot", "maze", "prototype"]
heroImage: "../../assets/images/maze-escape-devlog07.png"
---

### Level 4 ban đầu chỉ được mình xem là một tính năng "tô điểm cho đẹp": **Fog of War**.

Nhưng rồi nó biến thành một cuộc marathon debug, nơi mà mình cứ **fix sai chỗ liên tục**… cho tới khi log lên tiếng tố cáo mình 😭

Fog không hề bị bug.

**Người bị bug là mình.** 💀

---

# **🎯 Mục tiêu của Level 4**

Mình muốn một lớp fog:

- Che toàn bộ mê cung (theo **world-space**)
- Hé lộ những khu vực player đã đi qua

Nghe thì đơn giản.

Làm thì… đau đầu.

---

# **😭 Sai lầm #1 — Đặt Fog trong**

# **CanvasLayer**

Mình dùng structure này:

```
FogLayer (CanvasLayer)
 └─ Sprite2D (fog_texture.gd)
```

Điều này đồng nghĩa fog được vẽ theo **screen/camera space**, chứ **không phải world space**.

Nên khi mình "reveal" fog, thực chất là đang vẽ lên… màn hình camera, chứ không phải bản đồ mê cung.

Kết quả:

- vùng reveal di chuyển rất kỳ
- fog không khớp với maze
- debug càng lúc càng rối 😵

**Cách fix:** Fog là hệ thống của world, không phải UI.

✅ Cấu trúc đúng:

```
World (Node2D)
 ├─ TileMapLayer (Maze)
 ├─ Player
 ├─ Camera2D
 └─ FogOfWar (Node2D)
     └─ Sprite2D (Fog)
```

---

# **🤦 Sai lầm #2 — Copy code cho**

# **TileMap**

# **, trong khi node là**

# **TileMapLayer**

Đây mới là **trùm cuối**.

Script của mình có đoạn check:

```
if node == null or not (node is TileMap):
    image_size = Vector2(2048, 2048)
    global_position = Vector2.ZERO
    return
```

Nhưng project của mình đang dùng **TileMapLayer**, không phải TileMap.

Hệ quả:

- node is TileMap **luôn luôn false**
- code init thật **không bao giờ chạy**
- fallback được dùng âm thầm

Fallback đó làm gì?

- fog size = **2048×2048**
- fog position = **(0,0)**
- toàn bộ tính toán world/local sau đó… toang 🤯

Điều này giải thích hoàn hảo cho log mình thấy:

- fog luôn đứng ở (0,0)
- reveal bị out-of-bounds khi player x > 2048

Godot 4.5 cũng đã xác nhận: TileMapLayer là node khuyến nghị, còn TileMap thì đã deprecated.

---

# **🔍 Dòng log cứu rỗi tinh thần**

Khi mình in đúng thứ cần in:

```
print("FogPos=", global_position, " FogSize=", image_size)
```

Mình thấy ngay:

- FogPos = (0,0)
- FogSize = (2048,2048)

Đây **không phải lỗi toán học**.

Mà là:

👉 **init code chưa bao giờ chạy đúng** ✅

---

# **✅ Cách fix thật sự (không magic number, không đoán mò)**

### **1) Chấp nhận đúng kiểu**

### **TileMapLayer**

Đây là _init_from_tilemap() gọn gàng, chạy đúng với Godot 4.5:

```
func _init_from_tilemap() -> void:
	var node := get_node_or_null(target_tilemap_path)
	if node == null or not (node is TileMapLayer):
		push_error("Fog: target_tilemap_path must point to a TileMapLayer. Current=%s" % [str(node)])
		return

	var tm: TileMapLayer = node

	var used: Rect2i = tm.get_used_rect()
	if used.size == Vector2i.ZERO:
		push_warning("Fog: TileMapLayer has no used cells.")
		return

	var ts: Vector2i = tm.tile_set.tile_size
	var tile_size := Vector2(ts.x, ts.y)

	# Fog texture size = số tile * kích thước tile
	image_size = Vector2(
		used.size.x * tile_size.x,
		used.size.y * tile_size.y
	)

	# Căn fog theo góc trên-trái của used rect
	var top_left_center_local := tm.map_to_local(used.position)
	var top_left_local := top_left_center_local - tile_size * 0.5
	global_position = tm.to_global(top_left_local)

	if debug_print:
		print("✅ Fog init OK | used=", used, " tile_size=", tile_size,
			  " fog_size=", image_size, " fog_pos=", global_position)
```

---

### **2) Loại bỏ fallback "êm ái"**

Fallback âm thầm tạo ra **cảm giác ổn định giả**.

Nếu không tìm được TileMapLayer → hãy báo lỗi to ngay từ đầu,

đừng giả vờ "mọi thứ ổn rồi với 2048×2048".

---

# **🧠 Những gì mình học được (và sẽ nhớ mãi)**

### **✅ 1) Hệ thống world không thuộc về CanvasLayer**

CanvasLayer dành cho UI. Fog of War là hệ thống world.

### **✅ 2) Debug reference trước, debug toán sau**

Nếu reference TileMap sai, mọi "fix toán" đều vô nghĩa.

### **✅ 3) Fallback im lặng là bom hẹn giờ**

Nó giúp game chạy… nhưng che giấu bug thật 😭😭😭

---

# **🧱 Bước tiếp theo**

- Refactor fog_texture.gd (tách init / debug / reveal)
- Thêm "hàng rào an toàn": node sai loại là **không cho chạy**
- Giảm spam log (chỉ log khi state thay đổi)