const express = require('express');
const app = express();
const port = 3000;

const app = express();

let todos = [];

app.use(express.json());
app.use(express.static("public"));

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/task-counts', (req, res) => {
    const totalTasks = todos.length;
    const completedTasks = todos.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(2) : 0;

    res.json({
        totalTasks,
        completedTasks,
        pendingTasks,
        completionPercentage
    });
});

app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (task) {
        const newTask = {
            id: todos.length ? todos[todos.length - 1].id + 1 : 1,
            text: task,
            completed: false,
            important: false,
        };
        todos.push(newTask);
        res.status(201).json(newTask);
    } else {
        res.status(400).json({ error: 'Task is required' });
    }
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        const removed = todos.splice(index, 1);
        res.json({ message: 'Task deleted', removed, todos });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.patch('/todos/:id/complete', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        res.json({ message: 'Task status updated', task: todo });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.patch('/todos/:id/important', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.important = !todo.important;
        res.json({ message: 'Task priority updated', task: todo });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
/*
const path = require('path');

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve a simple message on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
*/
