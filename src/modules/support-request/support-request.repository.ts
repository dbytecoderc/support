import SupportRequestModel from '../../database/models/SupportRequest';
import { SupportRequest } from '../../@types/express';

export default class SupportRequestRepository {
  /**
   * @param {SupportRequest} requestDetails - Support request details to be saved
   * @returns {Promise<SupportRequest>} saved datase object
   */
  static async createSupportRequest(
    requestDetails: SupportRequest,
  ): Promise<SupportRequest> {
    const supportRequest = new SupportRequestModel(requestDetails);
    return await supportRequest.save();
  }

  /**
   * @param {string} id - ID of data to be fetched
   * @returns {Promise<SupportRequest>} returned datase object
   */
  static async getSupportRequest(id: string): Promise<SupportRequest> {
    return await SupportRequestModel.findOne({
      _id: id,
      status: { $ne: 'CLOSED' },
    }).populate('owner comments', '-password');
  }

  /**
   * @returns {Promise<SupportRequest[]>} fetched resource
   */
  static async getSupportRequests(): Promise<SupportRequest[]> {
    return await SupportRequestModel.find().populate(
      'owner comments',
      '-password',
    );
  }

  /**
   * @param {number} time from last month
   * @returns {Promise<SupportRequest[]>} fetched resource
   */
  static async getClosedSupportRequests(
    lastMonth: number,
  ): Promise<SupportRequest[]> {
    return await SupportRequestModel.find({
      status: 'CLOSED',
      completedAt: { $gt: lastMonth },
    }).populate('owner comments', '-password');
  }

  /**
   * @param {string} id - ID of data to be fetched
   * @returns {Promise<SupportRequest[]>} fetched resource
   */
  static async getUserSupportRequests(id: string): Promise<SupportRequest[]> {
    return await SupportRequestModel.find({
      owner: id,
      status: { $ne: 'CLOSED' },
    }).populate('owner comments', '-password');
  }

  /**
   * @param {string} id - ID of data to be fetched
   * @param {Object} data data to facilitate update
   * @returns {Promise<SupportRequest>} Updated data
   */
  static async updateSupportRequest(id: string, data: any): Promise<SupportRequest> {
    return await SupportRequestModel.findByIdAndUpdate(
      { _id: id },
      { ...data },
      { new: true },
    );
  }
}
