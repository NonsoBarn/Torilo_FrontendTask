# 📊 Makay App

A modern **React + TypeScript** HR management application built with **Vite**, **shadcn/ui**, **TailwindCSS**, and **Redux Toolkit** for state management.

This project demonstrates a scalable architecture with reusable components, efficient state handling, and clean UI design.

---

## 🚀 Tech Stack

- ⚛️ **React + TypeScript** – Component-based UI with type safety
- ⚡ **Vite** – Lightning-fast bundler for development and build
- 🎨 **shadcn/ui + TailwindCSS** – Pre-styled and customizable UI components
- 🎞️ **Framer Motion** – Smooth animations and transitions
- 📦 **Redux Toolkit** – Scalable global state management
- 🛠️ **Custom Hooks & Utils** – Encapsulated logic for reusability

---

## 📂 Project Structure

```
src/
├── components/                # Reusable UI and app-specific components
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
|   |   ├── calender.tsx
|   |   ├── input.tsx
|   |   ├── popover.tsx
|   |   ├── dialog.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── tabs.tsx
│   │   └── dropdown-menu.tsx
│   ├── layout/                # Layout components
│   │   └── Navbar.tsx
│   │
│   ├── dashboard/             # Dashboard-specific sections
│   │   ├── AttendanceCard.tsx
│   │   ├── TaskFeed.tsx
│   │   ├── TimeoffSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── CelebrationsPanel.tsx
│   │   ├── TimeoffRecord.tsx
│   │   └── MyTeams.tsx
│   └── common/                # Possible Shared components
│       └──Modal.tsx
│
│
├── store/                     # Redux store and slices
│   ├── index.ts
│   ├── middleware/
│   │   └── localStorageMiddleware.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └──attendanceSlice.ts
│   │
│
├── hooks/                     # Custom React hooks
│   ├── useAppSelector.ts
│   ├── useAttendanceAction.ts
│   ├── useBreakTimer.ts
│   ├── useCurrentTime.ts
│   └── useModalState.ts
│
├── utils/                     # Helper functions & configs
│   ├── modalConfig.ts
│   ├── attendanceHelper.ts
│   └── timeUtils.ts
│
├── lib/                       # Generic utilities
│   └── utils.ts
│
├── pages/                     # Page-level components
│   └── Dashboard.tsx
│
├── types/                     # Global TypeScript types
│   └── index.ts
│
└── App.tsx                    # Root component
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/NonsoBarn/Torilo_FrontendTask.git

```

### 2️⃣ Install dependencies

```bash
npm install

```

### 3️⃣ Run the development server

```bash
npm run dev

```

Visit **http://localhost:5173** to see the app in action.

---

## 🧩 Features

- ⏱ **Attendance Tracker** – Clock-In, Clock-Out functionality
- ⏲ **Break Timer** – Take & Cancel break functionality
- ⏲ **Others** – Celebrations Panel, Activity Feed, Team Overview & Benefits Static Card display
- 📦 **Custom Hooks** – Manage app state and logic (selectors, attendance, timers, modals, and time)

---

## 🛠️ Development Practices

- **Scalable folder structure** for long-term growth
- **Type safety** with `types/` and slice-level `types.ts`
- **Reusable UI** through `components/ui`, `components/dashboard`, `components/layout`, and `components/common`
- **State persistence** with `localStorageMiddleware`
- **Custom hooks** to abstract Redux boilerplate (`useAppSelector`)
