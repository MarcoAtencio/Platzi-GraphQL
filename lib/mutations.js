'use strict';

const connectDB = require('./db');
const { ObjectID } = require('mongodb');
module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: '',
    };
    const newCourse = Object.assign(defaults, input);
    let db, course;
    try {
      db = await connectDB();
      course = await db.collection('courses').insertOne(input);
      newCourse._id = course.insertedId;
    } catch (error) {
      console.error(error);
    }
    return newCourse;
  },
  editCourse: async (root, { _id, input }) => {
    let db, course;
    try {
      db = await connectDB();
      await db.collection('courses').updateOne(
        {
          _id: ObjectID(_id),
        },
        {
          $set: input,
        }
      );
      course = await db.collection('courses').findOne({ _id: ObjectID(_id) });
    } catch (error) {
      console.error(error);
    }
    return course;
  },

  createStudent: async (root, { input }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      student = await db.collection('students').insertOne(input);
      input._id = student.insertedId;
    } catch (error) {
      console.error(error);
    }
    return input;
  },
  editStudent: async () => {
    let db, student;
    try {
      db = await connectDB();
      await db.collection('students').updateOne(
        {
          _id: ObjectID(_id),
        },
        {
          $set: input,
        }
      );
      student = await db.collection('students').findOne({ _id: ObjectID(_id) });
    } catch (error) {
      console.error(error);
    }
    return student;
  },
};
