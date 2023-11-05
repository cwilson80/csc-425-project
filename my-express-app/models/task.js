const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  duedate: String,
  completed: Boolean,
  id: Number
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;