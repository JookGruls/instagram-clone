# Instagram Clone

A responsive Instagram clone application built with React, featuring a modern UI, dark mode support, and interactive functionality.

## 🚀 Getting Started

### Prerequisites

Before running the project, you **must** configure your environment variables.

1.  Create a file named `.env` in the root directory.
2.  Add your API keys and configuration in the `.env` file (refer to `.env.example` if available, or ask the team for keys).

### Installation & Run

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### 🐳 Docker Support

You can also run the application using Docker.

**Using Docker Compose (Recommended):**

```bash
# Build and run container
docker-compose up -d --build

# Access the app at http://localhost:3000
```

**Using Docker manually:**

```bash
# Build the image
docker build -t instagram-clone .

# Run the container (Make sure you have a .env file locally if needed, or pass env vars)
docker run -p 3000:80 --env-file .env instagram-clone
```

## ✨ Features

- **Search Functionality**:

  - Search for users or categories.
  - Includes a responsive search drawer (desktop) and search dropdown (mobile).
  - Search history support.

- **Appearance Settings**:

  - **Dark Mode & Light Mode**: Seamlessly switch between themes via the "More" menu or Sidebar.
  - Persistent theme preference.

- **Responsive Design**:
  - Fully optimized for both **Desktop** and **Mobile** views.
  - **Mobile**: Bottom navigation bar + Top header navigation.
  - **Desktop**: Full sidebar navigation.
  - Responsive Profile page layout (Grid vs List/Scroll).

## 📱 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)
