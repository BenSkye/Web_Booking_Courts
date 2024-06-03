import User from '~/models/userModel'

class userRepository {
  static async addUser(user: any) {
    const newUser = new User(user)
    return newUser.save()
  }
  static async findUser(query: any) {
    const user = User.findOne(query)
    return user
  }
}
export default userRepository
