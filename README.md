# Instagram Clone

A responsive Instagram clone application built with React, featuring a modern UI, dark mode support, and interactive functionality.

## ⚠️ Important: Configuration First

Before running the application (via Docker or locally), you **must** create a `.env` file in the root directory to configure the necessary environment variables.

1.  Create a file named `.env` in the root folder.
2.  Add the following keys:

    ```env
    REACT_APP_API_END_POINT=https://api.thecatapi.com/v1
    REACT_APP_KEY=live_rwdlVDUecG1OpTGEHMFRP6Ri9ByAV7WVONmg9pmGWGM2xtBT57zGcUajhMEbhXUA
    ```

    > **Note:** Without these variables, the application and Docker build **will not work correctly**.

## 🚀 Running with Docker Compose (Recommended)

The easiest way to run the application is using Docker Compose.

1.  Ensure you have created the `.env` file as described above.
2.  Run the following command:

    ```bash
    docker-compose up --build -d
    ```

3.  The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 💻 Local Development (Alternative)

If you prefer to run the project without Docker:

```bash
# Install dependencies
npm install

# Start the development server
npm start
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
