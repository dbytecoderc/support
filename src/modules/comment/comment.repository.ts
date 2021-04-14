import CommentRequest from '../../database/models/Comment';

export default class CommentRepository {
  static async createComment(commentDetails: any, supportRequestDetails: any) {
    const comment = new CommentRequest(commentDetails);
    await comment.save();
    supportRequestDetails.comments.push(comment);
    await supportRequestDetails.save();
    return comment;
  }
}
