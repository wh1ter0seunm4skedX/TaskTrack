import TaskList from './components/TaskList';

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center">
            TaskTrack - Manage Your Tasks
          </h1>
          <p className="text-center text-gray-600">Add, edit, and manage your daily tasks easily.</p>
        </header>

        {/* TaskList Component - Core of the application */}
        <main className="w-full max-w-2xl">
          <TaskList />
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500">
          Built with Next.js and Tailwind CSS
        </footer>
      </div>
  );
}
