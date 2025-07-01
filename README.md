# Collaborative Whiteboard & Live Code Editor
## 🚀 Overview

The **Collaborative Whiteboard & Live Code Editor** is a powerful, full-stack web application meticulously engineered to facilitate real-time, interactive collaboration. It's an ideal tool for diverse scenarios like pair programming, technical brainstorming, and dynamic educational sessions. This project uniquely merges a free-form digital whiteboard with a robust live code editor, offering instant output previews—all seamlessly synchronized across multiple users in real-time.

Imagine the fluid interaction of **Excalidraw** combined with the immediate feedback of **CodePen**, purpose-built for synchronous, collaborative development and learning.

---

## ✨ Features

* **Real-time Drawing Whiteboard:** Sketch, draw, and annotate on an expansive canvas. Every stroke is instantly propagated and visible to all connected participants, fostering immediate visual communication.
* **Live Code Editing:** Craft HTML, CSS, and JavaScript within a sophisticated editor powered by the same engine as VS Code (Monaco Editor), complete with syntax highlighting and basic auto-completion.
* **Instant Code Preview:** Witness your HTML, CSS, and JavaScript render and execute immediately within a secure, sandboxed iframe. This provides unparalleled live feedback for frontend development.
* **Synchronized Sessions:** All whiteboard interactions and code modifications are broadcast and updated instantaneously for every user in the active session, ensuring a unified collaborative experience.
* **Initial State Persistence (In-Memory):** The current state of the whiteboard drawings and code snippets is maintained in the backend's memory. New users joining an ongoing session will immediately see the latest collaborative progress.
* **Responsive User Interface:** A clean, intuitive, and adaptive user interface crafted with **Bootstrap 5**, ensuring optimal usability across a range of devices and screen sizes.

---

## 🛠️ Tech Stack

This project is architected as a **monorepo**, housing both the frontend and backend applications within a single unified repository. This structure streamlines development, sharing of configurations, and deployment for tightly coupled full-stack applications.

### Frontend (`interactive-whiteboard-code/`)

* **React.js (v18+):** A declarative, component-based JavaScript library for building dynamic and interactive user interfaces. Chosen for its efficiency in handling UI updates and rich ecosystem.
* **Socket.IO Client (v4+):** The client-side library for establishing persistent, low-latency, bi-directional communication with the backend WebSocket server. Essential for real-time synchronization.
* **HTML Canvas API:** Native browser API leveraged for programmatic drawing on the whiteboard. Provides fine-grained control over pixel manipulation for fluid drawing.
* **Monaco Editor (via `@monaco-editor/react`):** An official React wrapper for the powerful code editor that powers VS Code. Offers a professional, feature-rich coding experience directly in the browser.
* **React Bootstrap (v2+):** Re-implemented Bootstrap 5 components for React. Provides pre-built, accessible, and themeable UI components, accelerating front-end development and ensuring responsiveness.
* **`useCallback` & `useMemo` Hooks:** React's built-in optimization hooks. `useCallback` is used to memoize functions (like event handlers) to prevent unnecessary re-renders of child components, while `useMemo` memoizes expensive computations or values. Crucial for maintaining performance during high-frequency interactions (drawing, typing).

### Backend (`whiteboard-backend/`)

* **Node.js (v18+):** A high-performance, asynchronous JavaScript runtime environment. Chosen for its non-blocking I/O model, making it ideal for real-time applications.
* **Express.js (v4+):** A fast, unopinionated, and minimalist web framework for Node.js. Provides a robust set of features for web and mobile applications, including routing and middleware.
* **Socket.IO Server (v4+):** The server-side component complementing the Socket.IO client. Manages WebSocket connections, handles client events, and broadcasts real-time data to connected users.
* **CORS (Cross-Origin Resource Sharing):** A Node.js middleware that enables secure communication between your frontend (running on `localhost:3000`) and your backend (running on `localhost:5000`), bypassing browser same-origin policy restrictions.
* **Nodemon:** A development utility that monitors for any changes in your Node.js source and automatically restarts the server. Greatly enhances the developer experience by eliminating manual server restarts.

---

## 🚀 Getting Started

Follow these steps to set up and run the entire application on your local machine.

### Prerequisites

Ensure you have the following installed on your development environment:

* **Node.js:** Version 18 or higher. Download from [nodejs.org](https://nodejs.org/).
* **npm:** Node Package Manager, which comes bundled with Node.js.

### 1. Clone the Repository

Begin by cloning the complete monorepo to your local system:

```bash
git clone [https://github.com/your-username/collaborative-whiteboard-app.git](https://github.com/Asadp3406/collaborative-whiteboard-app.git)
cd collaborative-whiteboard-app
