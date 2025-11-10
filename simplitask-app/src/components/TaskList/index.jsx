import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import TaskListHeader from './TaskListHeader';
import EmptyState from '../EmptyState';
import Statistic from '../Statistic';

const STORAGE_KEY = 'tasks';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [deleteDialog, setDeleteDialog] = useState({ open: false, taskId: null });

    // Load tasks from localStorage on mount (with 12 hour expiration)
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;

            const parsed = JSON.parse(raw);
            if (!parsed || !Array.isArray(parsed.tasks) || typeof parsed.timestamp !== 'number') return;

            const now = Date.now();
            const hours12 = 12 * 60 * 60 * 1000;
            if (now - parsed.timestamp < hours12) {
                setTasks(parsed.tasks);
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (err) {
            localStorage.removeItem(STORAGE_KEY);
            console.error('Failed to load tasks from localStorage', err);
        }
    }, []);

    // Persist tasks + timestamp whenever tasks change
    useEffect(() => {
        try {
            const payload = { tasks, timestamp: Date.now() };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (err) {
            console.error('Failed to save tasks to localStorage', err);
        }
    }, [tasks]);

    const handleStatusChange = (taskId) => {
        setTasks(prev => prev.map(task => {
            if (task.id === taskId) {
                const newStatus = task.status === 'active' ? 'completed' : 'active';
                return { ...task, status: newStatus, isCompleted: newStatus === 'completed' };
            }
            return task;
        }));
    };

    const handleDelete = (taskId) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
        setDeleteDialog({ open: false, taskId: null });
    };

    const handleAddTask = (newTask) => {
        setTasks(prev => [newTask, ...prev]);
    };

    const openDeleteDialog = (taskId) => {
        setDeleteDialog({ open: true, taskId });
    };

    const closeDeleteDialog = () => {
        setDeleteDialog({ open: false, taskId: null });
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return task.status === 'active';
        if (filter === 'completed') return task.status === 'completed';
        return true;
    });

    const taskCounts = {
        all: tasks.length,
        active: tasks.filter(task => task.status === 'active').length,
        completed: tasks.filter(task => task.status === 'completed').length
    };

    return (
        <Box sx={{ px: 8 }}>
            <Statistic
                total={taskCounts.all}
                active={taskCounts.active}
                completed={taskCounts.completed}
            />
            <Card
                sx={{
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 2,
                    height: '600px',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <TaskListHeader
                    onAddTask={handleAddTask}
                    onFilterChange={setFilter}
                    taskCounts={taskCounts}
                />

                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        pr: 1
                    }}
                >
                    {tasks.length === 0 ? (
                        <EmptyState />
                    ) : (
                        filteredTasks.map((task) => (
                            <Card
                                key={task.id}
                                sx={{
                                    marginBottom: 2,
                                    border: '1.5px solid #b0b3b8',
                                    boxShadow: 0
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    padding: 2,
                                    gap: 2
                                }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <CardHeader
                                                title={task.title}
                                                sx={{ padding: 0 }}
                                            />
                                            <Chip
                                                label={task.status === 'active' ? 'Active' : 'Completed'}
                                                color={task.status === 'active' ? 'success' : 'default'}
                                                size="small"
                                            />
                                        </Box>
                                        <CardContent sx={{ padding: '8px 0' }}>
                                            {task.description}
                                        </CardContent>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleStatusChange(task.id)}
                                            startIcon={task.status === 'active' ? <CheckCircleIcon /> : <RefreshIcon />}
                                            color={task.status === 'active' ? 'primary' : 'inherit'}
                                            sx={
                                                task.status === 'completed'
                                                    ? {
                                                        color: '#374151',
                                                        borderColor: '#374151',
                                                        '&:hover': {
                                                            borderColor: '#374151',
                                                            background: '#f3f4f6'
                                                        }
                                                    }
                                                    : {}
                                            }
                                        >
                                            {task.status === 'active' ? 'Mark as Completed' : 'Re-open'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => openDeleteDialog(task.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        ))
                    )}
                </Box>

                <Dialog
                    open={deleteDialog.open}
                    onClose={closeDeleteDialog}
                    aria-labelledby="delete-dialog-title"
                    PaperProps={{
                        sx: {
                            width: '400px',
                            maxWidth: '90vw'
                        }
                    }}
                >
                    <DialogTitle
                        id="delete-dialog-title"
                        sx={{ padding: '20px' }}
                    >
                        Delete Task
                    </DialogTitle>
                    <DialogContent sx={{ padding: '20px' }}>
                        Are you sure you want to delete this task? This action cannot be undone.
                    </DialogContent>
                    <DialogActions sx={{ padding: '20px' }}>
                        <Button onClick={closeDeleteDialog} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleDelete(deleteDialog.taskId)}
                            color="error"
                            variant="contained"
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </Box>
    );
}

export default TaskList;