# TaskTrack - To-Do List Web Application

**TaskTrack** is a modern and user-friendly task management web application built using [Next.js](https://nextjs.org), styled with [Tailwind CSS](https://tailwindcss.com), and integrated with Firebase for real-time database management. The application allows users to easily add, edit, delete, and mark tasks as complete, with error handling and a smooth, animated user interface.

## Features

### Core Task Management:
- **Add Tasks**: Users can create tasks with a title and description. Duplicate tasks are prevented, and a notification confirms successful task creation.
- **Edit Tasks**: Users can modify task titles and descriptions via a modal interface.
- **Delete Tasks**: Tasks can be permanently deleted, with an option to undo the action for a limited time.
- **Mark Tasks as Complete**: Toggle tasks between complete and incomplete status.

### User Interface:
- **Responsive Design**: Works across all devices (mobile, tablet, desktop).
- **Dark Mode**: Toggle between light and dark themes.
- **RTL Support**: Toggle between English and Hebrew, supporting right-to-left layout for Hebrew.
- **Animations**: Smooth animations using [Framer Motion](https://www.framer.com/motion/) for button interactions and modals.

### Error Handling & Feedback:
- **API Error Handling**: Provides user-friendly messages when API calls fail (e.g., task creation, edit, or deletion).
- **Retry Mechanism**: When a task-related operation fails, users can retry the action through a modal.
- **Notifications**: Shows success notifications when tasks are added or edited.
- **Button Locking**: Prevents rapid task creation by locking the button for 5 seconds after each task creation attempt.

## Technologies Used
- **Frontend**:
    - [Next.js](https://nextjs.org) for server-side rendering and static generation.
    - [Tailwind CSS](https://tailwindcss.com) for rapid, responsive styling.
    - [Framer Motion](https://www.framer.com/motion/) for animations and transitions.
- **Backend**:
    - **Firebase Firestore** for real-time task storage and management.
    - RESTful API endpoints in Next.js to interact with Firebase.
- **State Management**:
    - Managed with React's `useState` and `useEffect` hooks.
    - Task data fetched and synchronized with Firebase via API requests.

## Getting Started

### Prerequisites
- **Node.js** and **npm** or **yarn**.
- **Firebase Account**: Make sure you have a Firebase project and Firestore database set up.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tasktrack.git
   cd tasktrack
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your Firebase configuration:
    - Create a `.env.local` file in the root of the project with your Firebase credentials:
      ```bash
      NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
      NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
      ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Project Structure

- **`components/`**: Contains reusable components for the UI.
    - `TaskInput.tsx`: Input form for creating tasks.
    - `TaskItem.tsx`: Displays individual tasks with options to edit, delete, or mark as complete.
    - `TaskList.tsx`: Manages the list of tasks and communicates with the backend API.
    - `TaskModal.tsx`: Modal component for editing and viewing task details.
    - `ErrorModal.tsx`: Modal that appears when an API error occurs, with options to retry or cancel.
- **`firebaseConfig.ts`**: Configuration for connecting to Firebase Firestore.
- **`pages/api/tasks.ts`**: Next.js API routes for interacting with Firebase Firestore (CRUD operations).
- **`locales/`**: JSON files for managing translations (`en.json` for English, `he.json` for Hebrew).

## API Endpoints

- **GET `/api/tasks`**: Fetches all tasks from Firestore.
- **POST `/api/tasks`**: Creates a new task.
- **PUT `/api/tasks`**: Updates an existing task.
- **DELETE `/api/tasks`**: Deletes a task by ID.

## Firebase Setup

1. Create a Firebase project.
2. Enable Firestore in your Firebase console.
3. Add the Firebase configuration to `.env.local` (as shown above).

## Future Enhancements

- **User Authentication**: Enable users to log in and manage their own tasks.
- **Task Categories**: Organize tasks into categories (e.g., Work, Personal).
- **Task Priority**: Add support for prioritizing tasks.
- **Due Dates**: Add task deadlines and reminders.

## Screenshots

### Dark Mode:
![Dark Mode Screenshot](/src/public/darkModeTablet.png)

### Light Mode:
![Light Mode Screenshot](/src/public/lightModeTablet.png)


## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a Pull Request.
