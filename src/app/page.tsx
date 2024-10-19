'use client';

import TaskList from './components/TaskList';
import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import en from './locales/en.json';
import he from './locales/he.json';

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [tasks, setTasks] = useState([]);
    const translations = language === 'en' ? en : he;

    useEffect(() => {
        // Fetch the motivational quote
        const fetchQuote = async () => {
            try {
                const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
                    headers: {
                        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY
                    } as AxiosRequestConfig['headers']
                });
                const data = response.data[0];
                setQuote(data.quote);
                setAuthor(data.author);
            } catch (error) {
                console.error('Error fetching the quote:', error);
            }
        };

        fetchQuote();

        // Fetch tasks from our Firebase API
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks');
                setTasks(response.data); // Setting tasks fetched from Firestore
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
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
        <div className={`relative flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] 
            ${isDarkMode ? 'animate-dark-gradient-x' : 'animate-gradient-x'} 
            ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-pink-100 via-white to-pink-200'} 
            ${language === 'he' ? 'rtl' : ''}`}>

            {/* Floating background shapes */}
            <div className="absolute inset-0 flex justify-center items-center">
                <div
                    className={`absolute ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-pink-200 to-white'} w-72 h-72 rounded-full blur-3xl opacity-30 animate-floating-slow`}/>
                <div
                    className={`absolute ${isDarkMode ? 'bg-gray-600' : 'bg-gradient-to-r from-pink-300 to-white'} w-64 h-64 rounded-full blur-3xl opacity-40 animate-floating-fast`}/>
            </div>

            {/* Main content */}
            <header className="mb-8 text-center z-10">
                <h1 className="text-5xl font-extrabold text-gray-800 tracking-wide dark:text-white">
                    {translations.taskTrackTitle.split('-')[0]} -
                    <span
                        className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                        {translations.taskTrackTitle.split('-')[1]}
                    </span>
                </h1>
                <p className="text-gray-600 mt-4 dark:text-gray-300">
                    {translations.taskTrackSubtitle}
                </p>
            </header>

            {/* Quote section */}
            <div className="mb-8 p-4 bg-white rounded-lg shadow-md dark:bg-gray-700">
                <p className="text-center text-xl font-semibold text-gray-900 dark:text-gray-200">&#34;{quote}"</p>
                <p className="text-center text-sm font-light text-gray-700 dark:text-gray-300">- {author}</p>
            </div>

            {/* TaskList Component - Core of the application */}
            <main
                className="w-full max-w-2xl z-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 dark:bg-gray-700 dark:bg-opacity-90"
            >
                <TaskList tasks={tasks} translations={translations}/>
            </main>

            {/* Dark Mode Toggle Button */}
            <div className="fixed top-4 right-4 z-50">
                <button onClick={toggleDarkMode}
                        className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className={`fill-violet-700 block ${isDarkMode ? 'hidden' : 'block'}`} fill="currentColor"
                         viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg className={`fill-yellow-500 ${isDarkMode ? 'block' : 'hidden'}`} fill="currentColor"
                         viewBox="0 0 20 20">
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 011.414 0z"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Language Toggle Button */}
            <div className="fixed top-4 left-4 z-50">
                <label
                    htmlFor="language-toggle"
                    className={`flex items-center cursor-pointer ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="language-toggle"
                            className="checkbox hidden"
                            onChange={toggleLanguage}
                        />
                        <div
                            className="block border-[1px] dark:border-white border-gray-900 w-14 h-8 rounded-full"></div>
                        <div
                            className="dot absolute left-1 top-1 dark:bg-white bg-gray-800 w-6 h-6 rounded-full transition transform translate-x-0 checked:translate-x-full"></div>
                    </div>
                    <div className="ml-3 dark:text-white text-gray-900 font-medium">
                        {language === 'he' ? 'עברית' : 'English'}
                    </div>
                </label>
            </div>


            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-gray-500 z-10 dark:text-gray-400">
                Built with 💻 Next.js and Tailwind CSS
            </footer>
        </div>
    );
}
