# 🧭 Roaddy — Road Trip Planner

Roaddy is an open-source road trip planning web app built with Next.js. Plan your stops, organize them by day, and visualize your route on an interactive map.

---

## ✨ Features

### Current
- 📍 **Add & manage stops** — add locations by clicking on the map or searching
- ✏️ **Edit stops** — set name, day, category, and duration
- 🗂 **Day organization** — group stops by day with color-coded markers
- 🔗 **Day connections** — toggle polylines connecting stops within each day
- 🗺 **Fit to stops** — auto-zoom the map to show all your stops
- 📤 **Export trip** — save your trip as a JSON file
- 📥 **Import trip** — load a previously exported trip
- 🗑 **Reset trip** — start over with a confirmation dialog

### Coming Soon
- [ ] **My Trips** — save and manage multiple trips
- [ ] **Explore** — discover popular road trip routes and destinations
- [ ] **Profile** - user profile management and registration
- [ ] **Distance and driving time** - more information about driving
- [ ] **Share** - sharable trip link
- [ ] **POI** - nearby POI suggestions
- [ ] **AI** - ai trip Generator
- [ ] **Optimizing** - auto-optimize route

> Feel free to provide contribution :D

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/roaddy.git
cd roaddy
npm install
npm run dev
Open http://localhost:3000 in your browser.
```

### Build for production

```bash
npm run build
npm start
```

## 🗂 Project Structure

```
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout with metadata and fonts
│   ├── page.tsx          # Landing / home page
│   └── planner/          # Planner route
│       └── page.tsx      # Main planner page
├── components/
│   ├── map/              # Map-related components
│   │   ├── MapView.tsx   # Leaflet map wrapper
│   │   └── MapToolbar.tsx# Floating toolbar on the map
│   ├── planner/          # Planner UI components
│   │   ├── Topbar.tsx    # Top navigation bar
│   │   ├── Sidebar.tsx   # Stop list sidebar
│   │   └── EditStopModal.tsx
│   └── ui/               # Reusable UI primitives (shadcn/ui based)
├── store/                # Zustand global state
│   └── tripStore.ts
└── types/                # TypeScript types
    └── trip.ts
```

## 🛠 Tech Stack

| Technology   | Purpose          |
| ------------ | ---------------- |
| Next.js 15   | React framework  |
| React 19     | UI library       |
| Leaflet      | Interactive maps |
| Zustand      | State management |
| Tailwind CSS | Styling          |
| shadcn/ui    | UI components    |
| TypeScript   | Type safety      |

## 🗺 Map Attribution
Map tiles provided by OpenStreetMap contributors.
© OpenStreetMap contributors — data is available under the ODbL license.

## ☕ Support
If you find Roaddy useful, consider supporting development:

<a href='https://ko-fi.com/W7W21VSAQB' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## 📄 License
This project is licensed under the MIT License. See [LICENSE](license.md) for details.


