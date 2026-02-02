# The Digital Stylist

**Subtitle:** From Closet Chaos to Confidence in 3 Seconds.

**Author:** Patrick Solomon

**Status:** Frontend-first. The RAG engine will be implemented in a separate repository.

---

## Overview
The Digital Stylist is a fast, mobile-first styling companion that turns a personal wardrobe into instant outfit decisions. It reduces decision fatigue by pairing context-aware recommendations with a clean, intuitive experience.

---

## Inspiration
People make thousands of decisions daily. By the time they reach their closet, decision fatigue is real. The Digital Stylist focuses on this pain: **too many choices, too little time, and low confidence in the final look**.

---

## How It Works (User View)
1. **Digitize** — Take quick photos of your clothes.
2. **Describe** — Share your occasion or vibe (e.g., class, dinner, event).
3. **Visualize** — Get high-fidelity outfit combinations.
4. **Decide** — Pick a look or get a perfect match recommendation.

---

## What This Repo Provides
This repository focuses on the frontend experience and core UX flow:

- **Closet View**: Add items, edit tags, remove pieces.
- **Generate View**:
  - **From Your Closet** — choose existing items.
  - **Right Now** — upload multiple photos + describe the occasion.
  - **Random Surprise** — placeholder for RAG-driven styling.
- **Profile Modal**: Clean profile view with editable fields and gender options.

---

## Architecture (High-Level)
This project is designed for a separate AI engine, but keeps the interface ready:

- **Wardrobe Indexing**: Images are tagged and structured for retrieval.
- **Context Matching**: User intent guides item selection.
- **Outfit Composition**: The system assembles coherent looks from available pieces.

*(Implementation details and model choices will live in a separate repository.)*

---

## Vision
The MVP starts as a private digital closet and evolves into a social style ecosystem:

- **Fashion Feed** for sharing AI-styled looks.
- **Brand Integration** for matching missing pieces.
- **Circular Flow** to sell or swap wardrobe items.

---

## Notes
- This repo is **frontend-first**.
- The RAG engine will be delivered in a separate repo.

---

## License
MIT (placeholder)
