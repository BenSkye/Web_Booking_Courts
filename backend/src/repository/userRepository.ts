import User from '~/models/userModel'

class userRepository {
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

  static async create(userDetails: { userName: string; userEmail: string; password: string; avatar: string }) {
    const user = new User(userDetails)
    return await user.save()
  }
}
export default userRepository
