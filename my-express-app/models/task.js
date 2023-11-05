const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDesc: String,
  dueDate: Date,
  id: Number,
  completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;