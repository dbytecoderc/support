import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create Schema
const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model<any>('Comment', CommentSchema);
