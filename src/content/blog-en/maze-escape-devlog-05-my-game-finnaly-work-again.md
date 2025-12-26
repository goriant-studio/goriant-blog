---
title: "🧩 Devlog #05 – When My Game Finally Work Again"
description: ""
date: 2025-12-25
game: "Maze Escape"
tags: ["godot", "maze", "prototype"]
heroImage: "../../assets/images/maze-escape-devlog05.png"
---

> Today was… intense 😮‍💨
<br/> But also incredibly satisfying 😌

### I finally **fixed all collision issues** in my game.

Not just “it kinda works”, but **actually works**, consistently, across levels, enemies, and hitboxes.

This was one of those days where you feel:

- confused 😵
- frustrated 😤
- doubting yourself 🤔
    
    …and then suddenly:
    
- everything clicks 💡
- and you feel like a real game developer again 🎮✨

---

## 😵 The Symptoms (a.k.a. “Why is Godot trolling me?”)

What I was seeing:

- Enemy collision debug shapes **sometimes appeared, sometimes not**
- Level 1 worked, Level 2 didn’t 🤷‍♂️
- One enemy had collision, ten others didn’t
- Hitbox logic fired… but debug showed nothing
- I fixed one thing → another thing broke

At some point, I honestly thought:

> “Is Godot broken… or am I broken?” 😅
> 

---

## 🕵️ The Real Causes (there were MANY)

After deep debugging, here’s what was *actually* wrong:

### 1️⃣ I had **two Enemy scripts** with the same `class_name`

- `enemy_script.gd`
- `enemy_scene.gd`
- Both declared `class_name Enemy`

💥 This caused **undefined behavior**

Godot didn’t warn me.

It just… behaved weirdly.

Lesson learned:

> ❗ One class_name = one script. No exceptions.
> 

---

### 2️⃣ Most enemies were **not real prefab instances**

Some were:

- copied nodes
- detached from the original `.tscn`
- silently out of sync

So:

- my fixes applied to **one enemy**
- the others stayed broken 😐

Lesson learned:

> ❗ If it’s a prefab, always instance it. Never copy it.
> 

---

### 3️⃣ CollisionShapes were **disabled** (editor vs code mismatch)

Some shapes:

- existed
- had correct layers
- but were `disabled = true`

Godot didn’t complain.

Debug just didn’t draw them.

Lesson learned:

> ❗ Never mix editor collision setup with code-driven setup.
> 

---

### 4️⃣ The BIGGEST TRAP: **I scaled the Enemy node** 😱

This was the killer.

I had:

```
Enemy (CharacterBody2D)
Scale = (0.05, 0.05)

```

Which meant:

- CollisionShapes were also scaled
- Debug shapes became microscopic
- They *were there*… just invisible 👻

Lesson learned (this one is gold):

> ❗ Never scale physics bodies
> 
> 
> ✅ Scale visuals (Sprite2D) only
> 

Once I reset Enemy scale to `(1,1)` and scaled only the sprite…

💥 Everything made sense.

---

## 💡 The Moment It Finally Worked

I turned on:

```
Debug → Visible Collision Shapes

```

And suddenly…

🟦 Enemy bodies

🟩 Hitboxes

🟦 All enemies

🟦 All levels

**Everything showed up. Everything collided.**

I literally smiled at the screen 😄

That feeling of:

> “Ah… so this is how it’s supposed to work.”
> 

---

## 🧠 What I Really Learned Today

This wasn’t just about collision.

It was about:

- Prefab discipline
- Script ownership
- Visual vs physics separation
- Debugging *systematically*, not emotionally

And maybe the biggest lesson:

> 🧠 When something feels “random”, it’s usually architecture, not logic.
> 

---

## 🎮 Final State (Feels So Good)

Now:

- Enemy prefab is clean
- One script, one responsibility
- Collision is data-driven
- Debug is readable
- Hitbox / hurtbox logic is solid

The game feels **stable** again.

And that stability gives me momentum 🚀

---

## ❤️ Closing Thoughts

Today reminded me why game dev is hard…

and also why it’s addictive.

You struggle for hours.

You question everything.

And then—click—

you understand something *deeply*.

That understanding stays with you forever.

On to the next bug 🐛

But tonight… I’m proud 😌✨