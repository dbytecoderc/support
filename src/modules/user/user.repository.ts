import UserModel from '../../database/models/User';
import { User, CreateUserInput } from '../../@types/express';

export default class UserRepository {
	/**
	 * Function for adding a user to the database
	 * @param {CreateUserInput} userDetails - User details to be saved
	 * @returns {Promise<User>} saved datase object
	 */
  static async createUser(userDetails: CreateUserInput): Promise<User> {
    const user = new UserModel(userDetails);
    return await user.save();
  }

 	/**
	 * Find user using email address
	 * @param {string} email - unique email to fetch user
	 * @returns {Promise<User | null>} saved datase user object or null if there is no match
	 */
  static async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }
}
