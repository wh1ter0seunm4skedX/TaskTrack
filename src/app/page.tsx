import TaskList from './components/TaskList';

export default function Home() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-primary)] bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 animate-gradient-x">

            {/* Floating Shapes in the Background */}
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="absolute bg-gradient-to-r from-yellow-300 to-red-400 w-72 h-72 rounded-full blur-3xl opacity-30 animate-floating-slow" />
                <div className="absolute bg-gradient-to-r from-green-300 to-blue-400 w-64 h-64 rounded-full blur-3xl opacity-40 animate-floating-fast" />
            </div>

            {/* Content Section */}
            <header className="mb-8 text-center z-10">
                <h1 className="text-5xl font-extrabold text-gray-800 tracking-wide font-primary">
                    TaskTrack - Manage Your Tasks
                </h1>
                <p className="text-gray-600 mt-4 font-secondary">
                    Add, edit, and manage your daily tasks with style.
                </p>
            </header>

            {/* TaskList Component - Core of the application */}
            <main className="w-full max-w-2xl z-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transition-transform transform hover:scale-105">
                <TaskList />
            </main>

            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-gray-500 z-10 font-secondary">
                Built with 💻 Next.js and Tailwind CSS
            </footer>
        </div>
    );
}
