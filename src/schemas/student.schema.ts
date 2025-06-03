import mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  name: String,
  teacherId: String,
  notes: {
    type: String,
    default: '',
  },
});
