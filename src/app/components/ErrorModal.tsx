import { motion, AnimatePresence } from 'framer-motion';

interface ErrorModalProps {
    errorMessage: string;
    onRetry: () => void | null;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, onRetry, onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white p-6 rounded-lg shadow-lg text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                >
                    <p className="text-xl mb-4">{errorMessage}</p>
                    <div className="flex justify-center space-x-4">
                        <button
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                            onClick={onRetry}
                        >
                            Retry
                        </button>
                        <button
                            className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition-colors"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ErrorModal;
