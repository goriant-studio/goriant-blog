---
title: "Devlog #04 – 🎮 Why I Stopped Using BaseLevel Inheritance for Game Flow"
description: "Singleton over Inheritance"
date: 2025-12-21
game: "Maze Escape"
tags: ["godot", "maze", "prototype"]
heroImage: "../../assets/images/maze-escape-devlog04.jpg"
---

## 🎮 Why I Stopped Using BaseLevel Inheritance for Game Flow

Today was one of those days where a “small bug” quietly turned into a **big design lesson** 😅

---

### 🐞 The symptom

- **Level 1**: Player hits the treasure ✨
    
    → debug log fires
    
    → **but no WIN popup 😐**
    
- **Level 2**: Works perfectly ✅

Debug log:

```
Hit player - emit global treasure collected

```

So yeah — the treasure was doing its job.

The signal was emitted.

But the game? Completely unimpressed 🙃

---

### 🔍 The real cause (not what I expected)

It wasn’t collision.

It wasn’t Area2D.

It wasn’t signals.

The real problem was this 👇

> BaseLevel._ready() never ran in Level 1.
> 

In Godot:

- If a child overrides `_ready()`
- And **forgets `super._ready()`**
- The base `_ready()` is silently skipped 😶

What happened:

- Level 1 overrides `_ready()` ❌
- I forgot `super._ready()` ❌
- BaseLevel never connected the WIN signal ❌
- Treasure emits signal → **no listener** ❌

Level 2 only worked because it *accidentally* didn’t break this rule 😬

---

### 😵 Why this bug was painful

- No errors
- Logs looked correct
- Gameplay logic seemed fine
- But nothing happened

This is the worst kind of bug:

> Everything looks right… except the game 🤡
> 

---

### 🤔 The bigger question

Even after fixing it with:

```
super._ready()

```

I stopped and asked myself:

- Do I really want **20 levels** all remembering to call `super`?
- Do I want my win/lose logic tied to `_ready()` order?
- Do I want future-me to debug this again? 😭

Answer: **Nope.**

---

### 🔨 The decision: delete BaseLevel inheritance

Instead of inheritance, I switched to an **event-driven setup** 🎯

New rules:

- Levels only **spawn stuff**
- Gameplay flow is handled **globally**
- No level binds signals
- No `super._ready()` anywhere 🚫

---

### 🧱 New architecture (much calmer)

- 🏆 **Treasure** → emits `treasure_collected`
- 💀 **Enemy** → emits `player_died`
- 🧠 **GameFlowManager (autoload)** → listens & updates state
- 🗺️ **Levels** → just spawn player, enemies, treasure

Result:

- No lifecycle traps
- No inheritance surprises
- No copy-paste
- Way less stress 😌

---

### 🧠 What I learned today

1. `_ready()` is a **dangerous place** for shared gameplay logic ⚠️
2. Inheritance + signals = easy to break, hard to notice 😬
3. Event-driven design scales way better for level-based games 🚀
4. If only **Level 1** is broken… blame lifecycle first 😄

---

### ✅ Current status

- Level 1 and Level 2 behave the same 🎉
- WIN / LOSE logic is centralized
- Adding new levels requires **zero gameplay wiring**
- Future-me is slightly happier 🧠✨

This refactor took time today, but it removed an entire class of bugs.

Totally worth it 💪😄