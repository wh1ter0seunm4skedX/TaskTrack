# TaskTrack - To-Do List Web Application

This is **TaskTrack**, a web application for managing your daily tasks, built with [Next.js](https://nextjs.org) and styled using [Tailwind CSS](https://tailwindcss.com). The app allows users to add, edit, delete, and mark tasks as complete.

## Current Features

- **Task Management**:
    - Add tasks with a title and description.
    - Display a list of tasks with options to mark as complete or delete.
    - Responsive design for all devices (mobile, tablet, desktop).
- **Components Implemented**:
    - `TaskInput`: Allows users to input new tasks.
    - `TaskItem`: Displays each task with actions to complete or delete.
    - `TaskList`: Manages and displays the list of tasks.
- **TypeScript Integration**:
    - Using TypeScript for type safety, including defining the `Task` interface in `types.ts`.

## Upcoming Features

- **Edit Tasks**: Implement a feature to allow users to edit existing tasks.
- **Persistent Data**: Add a backend/database to persist tasks across sessions.
- **Error Handling**: Improve user experience by adding proper error messages when task operations fail.

## Getting Started

To run the project locally, follow these steps:

1. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2. **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

- **`src/app/components/`**: Contains the core components (`TaskInput`, `TaskItem`, `TaskList`) for task management.
- **`src/app/types.ts`**: Defines the `Task` interface used throughout the app.
- **`src/app/page.tsx`**: The main entry point where tasks are displayed and managed.

## Future Enhancements

- **Edit task feature**.
- **Database integration** 
- **User authentication** (maybe - I'm not sure that I will do it 😋).

