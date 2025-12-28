---
title: "🌫️Devlog #07 — Fog of War: Two Dumb Mistakes, One Real Fix 😅"
description: "Fog of War"
date: 2025-12-28
game: "Maze Escape"
tags: ["godot", "maze", "prototype"]
heroImage: "../../assets/images/maze-escape-devlog07.png"
---

Level 4 was supposed to be a “nice polish feature”: **Fog of War**.

Instead, it turned into a debugging marathon where I kept *fixing the wrong thing*… until the logs finally snitched on me.

The fog wasn’t “buggy”.

**I was.** 💀

---

# 🎯 Goal for Level 4

I wanted a fog layer that:

- Covers the whole maze area (world-space)
- Reveals where the player walks

Simple on paper. Painful in reality.

---

# 😭 Mistake #1 — I put Fog in a `CanvasLayer`

I used this structure:

```

FogLayer (CanvasLayer)
 └─ Sprite2D (fog_texture.gd)

```

That means the fog is drawn in **screen/camera space**, not in **world space**.

So when I “revealed” fog, I was basically painting on the camera view — not on the actual maze map.

Result: the fog looked *kind of correct* sometimes… but it always felt wrong:

- reveal moved weirdly
- fog didn’t line up with the maze
- debugging got confusing fast

**Fix:** Fog belongs in the world scene, not UI.

✅ Correct structure:

```
World (Node2D)
 ├─ TileMapLayer (Maze)
 ├─ Player
 └── Camera2D
 ├─ FogOfWar (Node2D)
 ├─── Sprite2D (Fog)

```

---

# 🤦 Mistake #2 — I copied code for `TileMap`, but my node is `TileMapLayer`

This was the killer.

My script was checking:

```
if node == null or not (node is TileMap):
    image_size = Vector2(2048, 2048)
    global_position = Vector2.ZERO
    return

```

But in my project I’m using **TileMapLayer**, not `TileMap`.

So `node is TileMap` was **always false**, meaning the code silently used the fallback:

- fog size becomes **2048×2048**
- fog position becomes **(0,0)**
- every world/local calculation becomes garbage

This exactly explains why I saw logs like:

- fog position stuck at `(0,0)`
- reveal going out of bounds when player x > 2048

Godot 4.5 docs confirm `TileMapLayer` is the recommended node (and `TileMap` is deprecated). ([Godot Engine documentation](https://docs.godotengine.org/en/4.5/classes/class_tilemaplayer.html?utm_source=chatgpt.com))

---

# 🔍 The log that saved my sanity

Once I printed the right thing:

```
print("FogPos=", global_position, " FogSize=", image_size)

```

I immediately saw:

- FogPos = `(0,0)`
- FogSize = `(2048,2048)`

That wasn’t a math problem.

That was “my init code never ran correctly” ✅

---

# ✅ The actual fix (no magic numbers, no guessing)

### 1) Accept `TileMapLayer` properly

Here’s a clean `_init_from_tilemap()` that works with `TileMapLayer` (Godot 4.5) ([Godot Engine documentation](https://docs.godotengine.org/en/4.5/classes/class_tilemaplayer.html?utm_source=chatgpt.com))

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

	# Fog texture size = used tiles * tile size (pixels)
	image_size = Vector2(
		used.size.x * tile_size.x,
		used.size.y * tile_size.y
	)

	# Align fog to top-left of used rect
	var top_left_center_local := tm.map_to_local(used.position)
	var top_left_local := top_left_center_local - tile_size * 0.5
	global_position = tm.to_global(top_left_local)

	if debug_print:
		print("✅ Fog init OK | used=", used, " tile_size=", tile_size,
			  " fog_size=", image_size, " fog_pos=", global_position)

```

### 2) Remove silent fallback

This is important: silent fallbacks create *fake stability*.

If you can’t find the TileMapLayer, you want a loud error early — not “pretend everything is fine with 2048×2048”.

---

# 🧠 What I learned (and I’ll remember)

### ✅ 1) World systems don’t belong in CanvasLayer

CanvasLayer is for UI. Fog of War is a world system.

### ✅ 2) Debug the *reference* before debugging the math

If your TileMap reference is wrong, every “math fix” is a waste of time.

### ✅ 3) Silent fallback is a time bomb

It makes the game run, but it also hides the real bug 😭😭😭

---

# 🧱 Next steps

- Clean up `fog_texture.gd` (separate init/debug/reveal)
- Add “guardrails” so the script refuses to run if linked node type is wrong
- Reduce log spam (only print on state changes)
