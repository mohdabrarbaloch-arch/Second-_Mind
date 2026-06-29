# Second Brain OS

*"Think once. Ask_ABraz handles the rest."*

Second Brain OS is a futuristic, premium AI Operating System frontend built as a web-based Virtual Office. It combines a 3D environment managed by your AI Agent (Ask_ABraz) with a sleek, glassmorphism 2D HUD. 

## Features

- **3D Virtual Office**: A fully interactive 3D layout featuring a CEO office, Developer Room, Marketing Room, and more, powered by React Three Fiber.
- **Glassmorphism UI**: Beautiful, translucent hovering panels with glowing neon accents.
- **Responsive Architecture**: Adapts seamlessly to Desktop, Tablet, and Mobile views.
- **Smooth Animations**: Hover states and page transitions powered by Framer Motion.
- **AI Agent Dashboard**: Live monitoring of AI Agents, their tasks, workloads, and system stats.

## Tech Stack

- **React 18** (TypeScript)
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Styling)
- **Framer Motion** (Animations)
- **React Three Fiber & Drei** (3D Rendering)
- **Lucide React** (Icons)

## Installation & Setup

1. **Clone the repository** (if not already done).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## Folder Architecture

```text
src/
├── components/
│   ├── 3d/
│   │   └── VirtualOffice.tsx     # The React Three Fiber 3D Scene
│   └── ui/
│       ├── cards/                # Reusable UI components
│       │   ├── AgentCard.tsx
│       │   └── TaskCard.tsx
│       ├── BottomPanel.tsx       # Live Agents panel
│       ├── RightSidebar.tsx      # Tasks and Notifications
│       └── Sidebar.tsx           # Main navigation menu
├── store/
│   └── mockData.ts               # Simulated tasks, rooms, and agents
├── types/
│   └── index.ts                  # TypeScript interfaces
├── App.tsx                       # Main application shell & layout
├── index.css                     # Global styles and Tailwind v4 theme
└── main.tsx                      # React DOM entry point
```

## Future Roadmap

1. **Custom 3D Assets**: Replace the procedural primitives with high-quality `.gltf` models for a hyper-realistic office.
2. **Backend Integration**: Connect AI agents to real large language models (LLMs) and APIs (e.g., Node.js, Python, Firebase).
3. **Task Automation**: Implement real drag-and-drop task assignment between rooms and agents.
4. **User Avatar**: Add personalized face mapping for Ask_ABraz and the user.
