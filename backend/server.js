const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

 mongoose.connect('mongodb+srv://nijithvlk9400:NJT5162@cluster0.fi0qono.mongodb.net/sample?appName=Cluster0')
 .then(() => console.log('☑️ connected to MongoDB'))
 .catch(err => console.error('❌ Database error', err));

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
}));

const Task = mongoose.model('Task', new mongoose.Schema({
    subject: String,
    taskDetails: String,
    deadline: String,
}));

app.post('/register', async (req, res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created!" });
    } catch (error) {
        res.status(500).json({ error: "error.message" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const foundUser = await User.findOne({ username, password });
        if (foundUser) res.status(200).json({ message: "Login successful!" });
        else res.status(401).json({ message: "Wrong username or password" });
    } catch (error) {
        res.status(500).json({ error: "error.message" });   
    
    }
});
 app.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json( newTask);
    } catch (error) {
        res.status(500).json({ error: "error.message" });
    }
});
 app.get('/tasks', async (req, res) => {
    try {
        const allTasks = await Task.find();

        res.status(200).json(allTasks);
    } catch (error) {
        res.status(500).json({ error: "error.message" });
    }
});
 app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete (req.params,id);
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ error: "error.message" });
    }
});
 app.listen(3000,() => console.log(' Backend running on port 3000'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`backend running on port ${port}`));


 