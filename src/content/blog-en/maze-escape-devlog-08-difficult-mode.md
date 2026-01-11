---
title: "🌫️Devlog #08 — Finished Difficult Mode, Polished the HUD & Fixed Player Life 🎮🔥"
description: "Final Touch"
date: 2026-01-11
game: "Maze Escape"
tags: ["godot", "maze", "prototype"]
heroImage: "../../assets/images/maze-escape-devlog08.png"
---


- Removed unnecessary details
- Made **player life** more readable at a glance
- Unified the color scheme so states are instantly recognizable

After polishing:

- Less eye strain
- Smoother gameplay experience, even though **no core logic changed**

👉 Clear lesson:

> A better HUD makes the game feel better, even if the gameplay logic stays the same.
> 

---

## 3️⃣ Fixing Player Life – A Small Bug That Ruins the Experience 💥

Old issues:

- Life updates were **out of sync**
- Sometimes the player should be dead but wasn’t
- Sometimes restarting a level didn’t reset life properly

How I fixed it:

- Centralized all life logic into **a single source of truth**
- Stopped updating life from multiple scattered places
- Clearly reset state on:
    - Level start
    - Restart
    - Difficulty switch

👉 Painful but valuable lesson:

> If a state can be updated from everywhere, it will eventually break.
> 

---

## Wrapping Up Today 🧠

- The game is **harder but fairer**
- The HUD is **cleaner and more readable**
- Player life behavior is **stable and predictable**

No flashy new features today,

but the game feels **much more solid**.

📌 Next up:

- Full flow testing from Easy → Difficult
- Check for spots that feel *too* punishing
- Prepare for the next step 🚀

> Slow but steady progress.
> 
> 
> Fixing one annoying issue a day makes the game better, one step at a time 😄