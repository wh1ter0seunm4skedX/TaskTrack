'use client'; // Ensures this is a Client Component

import TaskList from './components/TaskList';
import { useEffect, useState } from 'react';
import en from './locales/en.json';
import he from './locales/he.json';

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');
    const translations = language === 'en' ? en : he;

    useEffect(() => {
        const savedMode = localStorage.getItem('theme') === 'dark';
        setIsDarkMode(savedMode);
        document.body.classList.toggle('dark', savedMode);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'he' : 'en');
    };

    return (
        <div className={`relative flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] ${isDarkMode ? 'animate-dark-gradient-x' : 'animate-gradient-x'} ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-pink-100 via-white to-pink-200'}`}>
            {/* Floating background shapes */}
            <div className="absolute inset-0 flex justify-center items-center">
                <div className={`absolute ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-pink-200 to-white'} w-72 h-72 rounded-full blur-3xl opacity-30 animate-floating-slow`} />
                <div className={`absolute ${isDarkMode ? 'bg-gray-600' : 'bg-gradient-to-r from-pink-300 to-white'} w-64 h-64 rounded-full blur-3xl opacity-40 animate-floating-fast`} />
            </div>

            {/* Main content */}
            <header className="mb-8 text-center z-10">
                <h1 className="text-5xl font-extrabold text-gray-800 tracking-wide dark:text-white">
                    {translations.taskTrackTitle}
                </h1>
                <p className="text-gray-600 mt-4 dark:text-gray-300">
                    {translations.taskTrackSubtitle}
                </p>
            </header>

            {/* TaskList Component */}
            <main className="w-full max-w-2xl z-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transition-transform transform hover:scale-105 dark:bg-gray-700 dark:bg-opacity-90">
                <TaskList translations={translations} />
            </main>

            {/* Dark Mode Toggle Button */}
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={toggleDarkMode}
                    className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {isDarkMode ? translations.lightMode : translations.darkMode}
                </button>
            </div>

            {/* Language Toggle Button */}
            <div className="fixed top-4 left-4 z-50">
                <button
                    onClick={toggleLanguage}
                    className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
                >
                    <span className="text-lg font-bold">
                        {language === 'en' ? 'עברית' : 'English'}
                    </span>
                </button>
            </div>

            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-gray-500 z-10 dark:text-gray-400">
                Built with 💻 Next.js and Tailwind CSS
            </footer>
        </div>
    );
}
