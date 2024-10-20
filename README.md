# 🚀 TaskTrack - Your Ultimate To-Do List Web Application

**TaskTrack** is a sleek, modern, and user-friendly task management web application designed to help you stay organized and productive. Built using [Next.js](https://nextjs.org) and styled with [Tailwind CSS](https://tailwindcss.com), TaskTrack integrates seamlessly with Firebase for real-time database management. Experience the ease of adding, editing, deleting, and completing tasks with an intuitive interface and smooth animations!

![TaskTrack Banner](https://i.imghippo.com/files/5nmyv1729422704.jpg)

## 🌟 Key Features

### Core Task Management
- **Add Tasks**: Quickly create tasks with titles and descriptions.
- **Edit Tasks**: Easily modify task details through a user-friendly modal interface.
- **Delete Tasks**: Permanently delete tasks with an option to undo the action.
- **Mark Tasks as Complete**: Toggle tasks between complete and incomplete statuses effortlessly.

### User Interface
- **Responsive Design**: Optimized for all devices, from mobile to desktop.
- **Dark Mode**: Switch between light and dark themes for personalized viewing.
- **RTL Support**: Toggle between English and Hebrew, featuring right-to-left layout for Hebrew users.
- **Animations**: Enjoy smooth transitions and interactions using [Framer Motion](https://www.framer.com/motion/).

### Error Handling & Feedback
- **API Error Handling**: User-friendly messages displayed for failed API calls (e.g., task creation or deletion).
- **Retry Mechanism**: Easily retry failed operations through a modal prompt.
- **Notifications**: Instant success notifications for added or edited tasks.
- **Button Locking**: Prevent rapid task creation by locking the button for 5 seconds after each attempt.

## 🛠 Technologies Used
- **Frontend**:
    - [Next.js](https://nextjs.org): For server-side rendering and static generation.
    - [Tailwind CSS](https://tailwindcss.com): For rapid and responsive styling.
    - [Framer Motion](https://www.framer.com/motion/): For stunning animations and transitions.
- **Backend**:
    - **Firebase Firestore**: For real-time task storage and management.
    - RESTful API endpoints in Next.js to interact with Firebase.
- **State Management**:
    - Managed with React's `useState` and `useEffect` hooks for efficient data handling.

## 📥 Getting Started

### Prerequisites
- **Node.js** and **npm** or **yarn**.
- **Firebase Account**: Ensure you have a Firebase project and Firestore database set up.

### Installation Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/wh1ter0seunm4skedX/tasktrack.git
   cd tasktrack
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up your Firebase configuration**:
   - Create a `.env.local` file in the root of the project with your Firebase credentials:
      ```bash
      NEXT_PUBLIC_API_KEY=your_motivational_quote_api_key
      NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
      NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
      ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**: Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 📁 Project Structure
- **`components/`**: Contains reusable UI components.
    - `TaskInput.tsx`: Form for creating new tasks.
    - `TaskItem.tsx`: Displays individual tasks with options to edit, delete, or complete.
    - `TaskList.tsx`: Manages the task list and communicates with the backend.
    - `TaskModal.tsx`: Modal for editing and viewing task details.
    - `ErrorModal.tsx`: Displays API error messages with retry options.
- **`firebaseConfig.ts`**: Configuration for connecting to Firebase Firestore.
- **`pages/api/tasks.ts`**: Next.js API routes for CRUD operations on tasks.
- **`locales/`**: JSON files for translations (`en.json` for English, `he.json` for Hebrew).

## 🌐 API Endpoints
- **GET `/api/tasks`**: Fetch all tasks from Firestore.
- **POST `/api/tasks`**: Create a new task.
- **PUT `/api/tasks`**: Update an existing task.
- **DELETE `/api/tasks`**: Remove a task by ID.

## 🔧 Firebase Setup
1. Create a Firebase project.
2. Enable Firestore in your Firebase console.
3. Add your Firebase configuration to `.env.local` (as shown above).

## 🚀 Future Enhancements
- **User Authentication**: Allow users to log in and manage their tasks.
- **Task Categories**: Organize tasks into categories (e.g., Work, Personal).
- **Task Priority**: Introduce prioritization options for tasks.
- **Due Dates**: Implement deadlines and reminders for tasks.

## 📸 Screenshots

### Dark Mode:
![Dark Mode Screenshot](/src/public/darkModeTablet.png)

### Light Mode:
![Light Mode Screenshot](/src/public/lightModeTablet.png)
