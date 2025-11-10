import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    TextField,
    Stack,
    Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function TaskListHeader({ onAddTask, onFilterChange, taskCounts }) {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    const handleAddClick = () => {
        setIsAddingTask(true);
    };

    const handleConfirm = () => {
        if (newTask.title.trim()) {
            onAddTask({
                ...newTask,
                id: Date.now(),
                status: 'active',
                isCompleted: false
            });
            setNewTask({ title: '', description: '' });
            setIsAddingTask(false);
        }
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        onFilterChange(filter);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
            }}>
                <Typography variant="h4" component="h1">
                    Task List
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                    disabled={isAddingTask}
                >
                    New Task
                </Button>
            </Box>

            {/* Filter Chips */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                    label={`All (${taskCounts.all})`}
                    onClick={() => handleFilterChange('all')}
                    color={activeFilter === 'all' ? 'primary' : 'default'}
                    variant={activeFilter === 'all' ? 'filled' : 'outlined'}
                    clickable
                />
                <Chip
                    label={`Active (${taskCounts.active})`}
                    onClick={() => handleFilterChange('active')}
                    color={activeFilter === 'active' ? 'success' : 'default'}
                    variant={activeFilter === 'active' ? 'filled' : 'outlined'}
                    clickable
                />
                <Chip
                    label={`Completed (${taskCounts.completed})`}
                    onClick={() => handleFilterChange('completed')}
                    color={activeFilter === 'completed' ? 'default' : 'default'}
                    variant={activeFilter === 'completed' ? 'filled' : 'outlined'}
                    clickable
                />
            </Box>

            {/* Input Form BELOW filter chips */}
            {isAddingTask && (
                <Card sx={{
                    border: '2px solid #1976d2', // blue border
                    boxShadow: 0,
                    borderRadius: 2,
                    mb: 2
                }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            New Task
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({
                                    ...newTask,
                                    title: e.target.value
                                })}
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                multiline
                                rows={2}
                                value={newTask.description}
                                onChange={(e) => setNewTask({
                                    ...newTask,
                                    description: e.target.value
                                })}
                            />
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => setIsAddingTask(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleConfirm}
                                >
                                    Add Task
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Card>
            )}
        </Box>
    );
}

export default TaskListHeader;