import   User from '~/models/userModel'

class userRepository {
  static findByIdAndUpdate(id: string, arg1: { $set: { username: any; email: any; password: any; profilePicture: any; }; }) {
    throw new Error('Method not implemented.');
  }
  static async addUser(user: any) {
    const newUser = new User(user)
    return newUser.save()
  }
  static async addPartner(user: any) {
    user.role = 'manager'; // Set the role to 'manager'
    const newUser = new User(user);
    return newUser.save();
  }
  static async findUser(query: any) {
    const user = User.findOne(query)
    return user
  }
  static async findByEmail(userEmail: string) {
    return await User.findOne({ userEmail })
  }

  static async create(userDetails: { userName: string; userEmail: string; password: string; avatar: string; userPhone?: number; }) {
    const user = new User(userDetails)
    return await user.save()
  }
  static async updateUser(userId: string, updates: { userName?: string; avatar?: string, userPhone?: number;  }) {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    return user;
  }
}
export default userRepository;
