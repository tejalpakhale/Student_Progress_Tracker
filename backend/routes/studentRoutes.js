const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST: Add a student
router.post('/add', async (req, res) => {
  const { name, marks } = req.body;

  try {
    const newStudent = new Student({ name, marks });
    await newStudent.save();
    res.status(201).json({ message: '✅ Student added successfully', student: newStudent });
  } catch (error) {
    console.error('❌ Error saving student:', error);
    res.status(500).json({ error: '❌ Error saving student' });
  }
});

// GET: Get all students
router.get('/all', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('❌ Error fetching students:', error);
    res.status(500).json({ error: '❌ Error fetching students' });
  }
});

// DELETE: Delete a student by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: '✅ Student deleted', student: deletedStudent });
  } catch (error) {
    console.error('❌ Error deleting student:', error);
    res.status(500).json({ error: '❌ Error deleting student' });
  }
});

// DELETE: Delete all students
router.delete('/delete-all', async (req, res) => {
  try {
    await Student.deleteMany({});
    res.json({ message: '🧹 All students deleted' });
  } catch (error) {
    console.error('❌ Error deleting all students:', error);
    res.status(500).json({ error: '❌ Error deleting all students' });
  }
});

module.exports = router;
