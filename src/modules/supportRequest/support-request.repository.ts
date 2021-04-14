import SupportRequest from '../../database/models/SupportRequest';

export default class SupportRequestRepository {
  /**
   * @param {Object} requestDetails - Support request details to be saved
   * @returns {Object} saved datase object
   */
  static async createSupportRequest(requestDetails: any) {
    const supportRequest = new SupportRequest(requestDetails);
    return await supportRequest.save();
  }

  /**
   * @param {Object} id - ID of data to be fetched
   * @returns {Object} returned datase object
   */
  static async getSupportRequest(id: string) {
    return await SupportRequest.findOne({ _id: id }).populate('owner comments');
  }

  /**
   * @returns {Object} fetched resource
   */
  static async getSupportRequests() {
    return await SupportRequest.find().populate('owner comments');
  }

  /**
   * @returns {Object} fetched resource
   */
  static async getClosedSupportRequests() {
    return await SupportRequest.find({ status: 'CLOSED' }).populate(
      'owner comments',
    );
  }

  /**
   * @param {Object} id - ID of data to be fetched
   * @returns {Object} fetched resource
   */
  static async getUserSupportRequests(id: string) {
    return await SupportRequest.find({ owner: id }).populate('owner comments');
  }

  /**
   * @param {Object} id - ID of data to be fetched
   * @param {Object} data data to facilitate update
   * @returns {Object} Updated data
   */
  static async updateSupportRequest(id: string, data: any) {
    return await SupportRequest.findByIdAndUpdate(
      { _id: id },
      { ...data },
      { new: true },
    );
  }
}
