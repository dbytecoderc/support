import CommentRequest from '../../database/models/Comment';
import { SupportRequest, Comment } from '../../@types/express';

export default class CommentRepository {
  /**
   * @param {Comment} id - ID of data to be fetched
   * @param {SupportRequest} support request detsils
   * @returns {Promise<Comment>} returned datase object
   */
  static async createComment(
    commentDetails: Comment,
    supportRequestDetails: SupportRequest,
  ): Promise<Comment> {
    const comment = new CommentRequest(commentDetails);
    await comment.save();
    supportRequestDetails.comments!.push(comment);
    await supportRequestDetails.save();
    return comment;
  }
}
