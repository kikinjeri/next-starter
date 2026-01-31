# next-starter 🎬  
A minimal, cinematic Next.js starter template

This project exists because I wanted a **clean, reusable, unopinionated Next.js foundation** that I could use for any future project — without rewriting the same setup every time. The goal was to create a starter that is:

- minimal but structured  
- responsive and accessible  
- visually atmospheric (deep charcoal, soft off‑white, gold accents)  
- flexible enough for any design direction  
- easy to extend with reusable components  

This README documents the purpose of the starter, how it’s structured, and how to use it.

---

## 🎯 Why This Starter Exists

I created this starter to solve a few recurring problems:

### **1. Rebuilding the same boilerplate for every project**
Each new Next.js project required:
- folder setup  
- layout structure  
- global styles  
- typography  
- components like Header, Footer, Button, Card, Section  

This template eliminates that repetition.

### **2. Wanting a cinematic, modern aesthetic without locking myself in**
I wanted a foundation that *feels* premium:
- deep charcoal background  
- soft off‑white text  
- gold accent  
- subtle gradient wash  

…but still leaves room for any future design direction.

### **3. A clean, reusable component set**
Not a design system.  
Not a UI library.  
Just structural components I can reuse anywhere.

---

## 🧱 Features

- **Next.js 14+** with App Router  
- **Cinematic color palette** (charcoal, off‑white, gold)  
- **Subtle gradient background** for atmosphere  
- **Montserrat font** (regular, bold, italic)  
- **Single shared stylesheet** (`styles.css`)  
- **Minimal global styles** (`globals.css`)  
- **Reusable structural components**:
  - `Header`
  - `Footer`
  - `Container`
  - `Section`
  - `Card`
  - `Button`
- **Fully responsive** (TailwindCSS)  
- **Accessible by default** (semantic HTML + helpers)  

---

## 📁 Folder Structure

next-starter/
│
├── app/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Section.tsx
│
├── styles/
│   └── styles.css
│
├── public/
│
├── globals.css
└── README.md


---

## 🎨 Cinematic Design System (Minimal + Flexible)

This starter uses a subtle, atmospheric palette:

- **Background:** deep charcoal  
- **Text:** soft off‑white  
- **Accent:** saturated gold  
- **Gradient:** radial cinematic wash  

These values live in CSS variables so you can override them anytime.

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install

Run the dev server:

bash
npm run dev
Open your browser:


Code
http://localhost:3000
🧩 Reusable Components
Each component is intentionally minimal and structural.

Example: Card
tsx
<Card title="Example">
  <p>This is a card.</p>
</Card>
Example: Button
tsx
<Button>Click Me</Button>
Example: Section
tsx
<Section title="About">
  <p>Section content goes here.</p>
</Section>
🛠 Customizing the Starter
You can easily modify:

colors

spacing

typography

components

layout

Because everything is centralized in:

Code
styles/styles.css
This keeps the starter flexible and future‑proof.

📦 Deployment
Deploy anywhere that supports Next.js:

Vercel

Netlify

Cloudflare Pages

Render

📜 License
MIT — free to use, modify, and build on.