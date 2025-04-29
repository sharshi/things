import { useState, useEffect } from 'react';
import '../styles.css';
import confetti from 'canvas-confetti';

const KanbanPage = () => {
    const [newTaskText, setNewTaskText] = useState('');
    const [tasks, setTasks] = useState(() => {
        // Load tasks from localStorage on initial render
        const savedTasks = localStorage.getItem('kanbanTasks');
        return savedTasks ? JSON.parse(savedTasks) : {
            todo: [],
            inprogress: [],
            done: []
        };
    });
    const [draggedTask, setDraggedTask] = useState(null);
    const [sourceColumnId, setSourceColumnId] = useState(null);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    }, [tasks]);

    // Generate a unique ID for new tasks
    const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

    // Add a new task to the todo column
    const addTask = () => {
        if (newTaskText.trim() === '') {
            showTemporaryMessage('Please enter a task description.');
            return;
        }

        const newTask = {
            id: generateId(),
            text: newTaskText
        };

        setTasks((prev: any) => ({
            ...prev,
            todo: [...prev.todo, newTask]
        }));
        setNewTaskText('');
    };

    // Delete a task after confirmation
    const deleteTask = (taskId: any) => {
        showConfirmation('Are you sure you want to delete this task?', () => {
            setTasks((prev: any) => {
                const newTasks = { ...prev };
                for (const columnId in newTasks) {
                    newTasks[columnId] = newTasks[columnId].filter((task: any) => task.id !== taskId);
                }
                return newTasks;
            });
        });
    };

    // Handle drag start
    const handleDragStart = (e: any, taskId: any, columnId: any) => {
        setDraggedTask(taskId);
        setSourceColumnId(columnId);
        e.currentTarget.classList.add('dragging');
    };

    // Handle drag end
    const handleDragEnd = (e: any) => {
        e.currentTarget.classList.remove('dragging');
        setDraggedTask(null);
        setSourceColumnId(null);
        // Remove drag-over styling from all columns
        document.querySelectorAll('.kanban-column').forEach(col =>
            col.classList.remove('drag-over'));
    };

    // Handle drag over a column
    const handleDragOver = (e: any) => {
        e.preventDefault();
        const column = e.currentTarget;
        if (column) {
            document.querySelectorAll('.kanban-column').forEach(col =>
                col.classList.remove('drag-over'));
            column.classList.add('drag-over');
        }
    };

    // Handle drag enter
    const handleDragEnter = (e: any) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    // Handle drag leave
    const handleDragLeave = (e: any) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            e.currentTarget.classList.remove('drag-over');
        }
    };

    // Handle drop to move task between columns
    const handleDrop = (e: any, targetColumnId: any) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');

        if (draggedTask && sourceColumnId) {
            // Find the task to move
            const taskToMove = tasks[sourceColumnId].find((task: any) => task.id === draggedTask);

            if (taskToMove) {
                setTasks((prev: any) => {
                    const newTasks = { ...prev };
                    // Remove from source column
                    newTasks[sourceColumnId] = newTasks[sourceColumnId].filter(
                        (task: any) => task.id !== draggedTask
                    );
                    // Add to target column
                    newTasks[targetColumnId] = [...newTasks[targetColumnId], taskToMove];
                    return newTasks;
                });

                // Trigger confetti if moving to done column
                if (targetColumnId === 'done' && sourceColumnId !== 'done') {
                    triggerConfetti();
                }
            }
        }
    };

    // Trigger confetti animation
    const triggerConfetti = () => {
        // First, a big, colorful burst
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            angle: 90,
            startVelocity: 50,
            gravity: 0.9,
            ticks: 400,
            colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
            shapes: ['square', 'circle'],
            zIndex: 1000
        });

        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const randomInRange = (min: any, max: any) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
                colors: ['#26ccff', '#a25afd', '#ff5e7e']
            });

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
                colors: ['#88ff5a', '#fcff42', '#ffa62d']
            });
        }, 250);
    };

    // Show temporary message (like an alert)
    const showTemporaryMessage = (message: any) => {
        const messageBox = document.createElement('div');
        messageBox.textContent = message;
        messageBox.className = 'fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300 ease-out';
        document.body.appendChild(messageBox);

        setTimeout(() => {
            messageBox.style.opacity = '0';
            setTimeout(() => {
                messageBox.remove();
            }, 300);
        }, 2500);
    };

    // Show confirmation dialog
    const showConfirmation = (hi: string, func: any) => {
        func();
    //     const ConfirmDialog = ({ message, onConfirm, onCancel }: any) => (
    //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
    //             <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
    //                 <p className="text-gray-700 mb-4">{message}</p>
    //                 <div className="flex justify-end gap-3">
    //                     <button
    //                         className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
    //                         onClick={onCancel}
    //                     >
    //                         Cancel
    //                     </button>
    //                     <button
    //                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
    //                         onClick={onConfirm}
    //                     >
    //                         Confirm
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     );

        // const confirmRoot = document.createElement('div');
        // document.body.appendChild(confirmRoot);

        // const cleanup = () => {
        //     document.body.removeChild(confirmRoot);
        // };

        // This would typically use ReactDOM.render in a non-hooks context
        // In a real React app, you'd use a context or state to manage this UI
        // This is a simplified representation
        // const (component: any = (
        //     <ConfirmDialog
        //         message={message}
        //         onConfirm={() => {
        //             onConfirm();
        //             cleanup();
        //         }}
        //         onCancel={cleanup}
        //     />
        // );

        // // In a real implementation, you'd render this component
        // // For this example, we'll just call the confirm function directly
        // if (window.confirm(message)) {
        //     onConfirm();
        // }
   };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
                    Kanban Task Tracker
                </h1>

                <div className="mb-8 p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="text"
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                        placeholder="Enter new task..."
                        className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button
                        onClick={addTask}
                        className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow"
                    >
                        Add Task
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="kanban-board">
                    {['todo', 'inprogress', 'done'].map((columnId) => (
                        <div
                            key={columnId}
                            id={columnId}
                            className="kanban-column bg-white rounded-lg shadow p-4 flex flex-col"
                            data-column-id={columnId}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, columnId)}
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                                {columnId === 'todo' ? 'To Do' :
                                    columnId === 'inprogress' ? 'In Progress' :
                                        'Done 🎉'}
                            </h2>
                            <div className="tasks-container flex-grow space-y-3 overflow-y-auto max-h-96 p-1">
                                {tasks[columnId].map((task: any) => (
                                    <div
                                        key={task.id}
                                        className="task bg-gray-100 p-3 rounded-md shadow-sm cursor-grab flex justify-between items-center"
                                        draggable="true"
                                        data-task-id={task.id}
                                        onDragStart={(e) => handleDragStart(e, task.id, columnId)}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <span className="text-gray-800 break-words mr-2">{task.text}</span>
                                        <button
                                            className="delete-task-btn text-gray-400 hover:text-red-500 font-bold text-lg ml-2 px-1"
                                            title="Delete task"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteTask(task.id);
                                            }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KanbanPage;
