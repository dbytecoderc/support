import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create Schema
const SupportRequest = new Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'CLOSED', 'INPROGRESS'],
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

export default mongoose.model<any>('SupportRequest', SupportRequest);
