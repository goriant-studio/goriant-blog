---
title: "🧱 Devlog #06 — I Lost 2 Days to Godot 4.5 Collision 🤡💥"
description: "(Hitbox vs Hurtbox + Collision Layer/Mask — a practical debug guide)"
date: 2025-12-26
game: "Maze Escape"
tags: ["godot", "maze", "prototype"]
heroImage: "../../assets/images/maze-escape-devlog06.png"
---


This bug looked simple: **player walks into enemy, nothing happens** 😐

But I burned **2 full days** because I didn’t truly understand how:

- 🎭 **Hitbox vs Hurtbox**
- 🧱 **collision_layer vs collision_mask**
- 🧩 **Area2D signals vs CharacterBody2D physics**

…actually work together.

If you’re stuck with *“they overlap but no signal / no damage / ghosting through”*, this is for you ✅

---

## 🧠 0) First: What kind of “collision” are you expecting? 🤔

Godot has **two different collision worlds**:

### 🧱 A) Physics blocking (solid movement)

✅ Use when you want **blocking / sliding / wall collision**

- `CharacterBody2D` + `CollisionShape2D`
- Uses `collision_layer` + `collision_mask`

### ⚔️ B) Detection / damage (signals)

✅ Use when you want **hit, hurt, pickup, trigger**

- `Area2D` + `CollisionShape2D`
- Uses signals: `area_entered`, `body_entered`

If you expect a signal but you only set up CharacterBody collisions… you’ll stare at nothing for hours 😭

---

## ✅ 1) The ONLY rule that matters (burn this into your brain) 🔥

Two things detect each other only if:

- 🟦 **A’s MASK includes B’s LAYER**

That’s it.

> No match = Godot ignores it perfectly.
> 
> 
> Not bug. Just config. 😅
> 

---

## 🧩 2) Stop using “random layers” (recommended layer plan) 📌

Here’s a clean layout that keeps your brain sane:

| Layer | Name | Used by |
| --- | --- | --- |
| 1 | 🧱 WORLD | walls / tilemap collision |
| 2 | 🧍 PLAYER_BODY | player CharacterBody2D |
| 3 | 👾 ENEMY_BODY | enemy CharacterBody2D |
| 4 | ⚔️ PLAYER_HITBOX | player attack Area2D |
| 5 | 💢 ENEMY_HURTBOX | enemy hurt Area2D |
| 6 | ⚔️ ENEMY_HITBOX | enemy attack Area2D |
| 7 | 💢 PLAYER_HURTBOX | player hurt Area2D |
| 8 | 💎 PICKUP | treasure/pickups Area2D |

💡 The “magic” is separation:

- **Body** = movement & walls
- **Hitbox/Hurtbox** = damage logic

---

## 🧱 3) The working pattern (real setup) ✅

### 🧍 Player setup

- **Body (CharacterBody2D)**
    - layer: `PLAYER_BODY`
    - mask: `WORLD` (and optionally `ENEMY_BODY` if you want physical blocking)
- **Hurtbox (Area2D)** 💢
    - layer: `PLAYER_HURTBOX`
    - mask: `ENEMY_HITBOX`

### 👾 Enemy setup

- **Body (CharacterBody2D)**
    - layer: `ENEMY_BODY`
    - mask: `WORLD`
- **Hurtbox (Area2D)** 💢
    - layer: `ENEMY_HURTBOX`
    - mask: `PLAYER_HITBOX`

### ⚔️ Player attack hitbox (Area2D)

- layer: `PLAYER_HITBOX`
- mask: `ENEMY_HURTBOX`
- active only during attack frames ⏱️

---

## 🧪 4) “They overlap but nothing happens” checklist ✅✅✅

When you see overlap but no hit signal, run this list like a robot 🤖

### ✅ 4.1 Node type check (super common fail)

- expecting `area_entered`? → you need `Area2D`
- expecting physical blocking? → you need body physics collision

### ✅ 4.2 Shape exists?

- `Area2D` must have `CollisionShape2D` child
- shape not null
- not disabled

### ✅ 4.3 Signal matches the thing you detect?

- Hitbox ↔ Hurtbox: use `area_entered(area)`
- Treasure ↔ Player body: use `body_entered(body)`

If you connected the wrong signal… it will never fire 💀

### ✅ 4.4 Layer/mask actually match?

- detector’s `mask` must include target’s `layer`

---

## 🧯 5) Debug tricks that saved me (real life) 🔍

### 👁️ Turn on collision debug

- **Debug → Visible Collision Shapes**

If you don’t see shapes… don’t panic yet 😅 (see scale trap below)

---

### 🖨️ Print layer/mask at runtime

Attach this to your `Area2D` hitbox/hurtbox:

```
func _ready():
	print("✅ ", name, " layer=", collision_layer, " mask=", collision_mask)

```

If you see `mask=0` or wrong bit → you found the culprit 🎯

---

### 🧟 The “scale trap” (I wasted HOURS here) 🤡

I thought:

> “Maybe my texture is too small, debug collision shape disappeared?”
> 

Reality:

- parent node had weird scale 😵‍💫
- collision shapes were tiny / confusing
- I assumed they were missing

✅ Fix while debugging:

- set `scale = Vector2.ONE`
- temporarily enlarge your shape size

```
var shape := RectangleShape2D.new()
shape.size = Vector2(Globals.tile_size * 1.1, Globals.tile_size * 1.1)
$CollisionShape2D.shape = shape

```

After that, shapes “magically” came back 👻➡️✅

---

## 💥 6) My 2-day mistake summarized 🧠

I had nodes that looked correct in the scene…

but **their collision masks didn’t include each other**.

So Godot did exactly what I configured:

✅ ignore collisions

✅ ignore signals

✅ let player ghost through enemy

Not a bug. A knowledge gap. 😅

---

## 🧭 7) Guideline (so you don’t repeat my pain) 🧱⚔️

- 🧱 Keep **physics** (Body) separate from **damage** (Area2D)
- 🧩 Define layer plan once, don’t freestyle it
- 🎯 Always decide layer + mask together
- 🔍 When collisions fail, inspect **mask first**, not code
- 👁️ Debug with visible collision shapes + runtime prints