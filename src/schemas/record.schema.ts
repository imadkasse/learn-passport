import mongoose from 'mongoose';

export const RecordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: Date,
    surah: String,
    fromAya: Number,
    toAya: Number,
    evaluation: String,
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  },
);
