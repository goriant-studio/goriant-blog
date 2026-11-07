---
title: "Devlog #01 – AlcheCode TD (The Alchemist): Blending Tower Defense with an Alchemy Cauldron & Global Codex"
description: "Building an elemental-crafting Tower Defense & Action RPG hybrid powered by Phaser 3 and Cloudflare Workers."
date: 2026-11-07
game: "AlcheCode TD"
tags: ["tower-defense", "phaser3", "cloudflare", "alchemy", "web-game"]
---

# **⚗️ Devlog #01 – AlcheCode TD (The Alchemist): Blending Tower Defense with an Alchemy Cauldron & Global Codex**

## **👋 The Core Idea**

Hello everyone 👋

After building the fast-paced cyber action survival game **Neon Survivor**, I wanted to tackle the **Tower Defense** genre — but with a twist beyond placing static, pre-defined turrets.

The central question was: *“What if players could fuse raw elements inside an Alchemy Cauldron to discover dozens of mutated towers — and the very first player in the world to discover a recipe gets their name permanently recorded in a Global Codex?”*

That idea became **AlcheCode TD (Nhà Giả Kim)**!

---

## **🔥 Key Gameplay Mechanics**

### **1. ⚗️ Elemental Fusion Cauldron (2–3 Elements)**
Instead of sticking to basic elemental towers, you can combine **2 or 3 base elements** inside the **Alchemy Cauldron** to brew **Mutated Towers** with unique synergies (from *Thermal Shock Turrets* to *Mythic-tier* arcane constructs).
- Slain monsters drop **Elemental Essences**, which grant a **100% discount** on that element's cost when brewing your next blueprint!

### **2. 🌍 Live Cloudflare Global Codex**
Every time a new Alchemy Tower recipe is brewed for the first time, the **Cloudflare Workers** backend broadcasts a discovery toast and **permanently records the name of the pioneer Alchemist**. Anyone can browse unlocked recipes in the Global Codex and load them directly into their cauldron with one click.

### **3. 🧙‍♂️ Direct Alchemist Hero Control & Roguelite Perks**
You aren't just a passive commander! You directly control the **Alchemist** on the map:
- Move with `WASD`, dash with `Space`, and unleash the **Overload (`E`)** nova skill.
- Gain XP to **Level Up** mid-battle and pick **1 of 3 Skill Mutations (Perks)** to customize your build.
- Summon the **Arch-Chimera Boss** whenever you feel ready to test your defense layout for massive rewards.

---

## **🛠️ Tech Stack**

- 🎮 **Phaser 3**: Powers the battlefield canvas, projectile physics, status effects, and wave logic.
- ⚡ **Cloudflare Workers**: Powers the real-time **Global Codex** and **Alchemist Leaderboard** at the edge.
- 🎨 **Hybrid Canvas + Workshop Sidebar UI**: Combines smooth 60fps battlefield action with a responsive Alchemy Workshop panel.

---

## **🚀 Play It Now!**

Ready to brew your first Mythic tower and claim your spot in the Global Codex?

👉 **[Play AlcheCode TD right now in your browser!](/en/games/alchecode-td/play)**
