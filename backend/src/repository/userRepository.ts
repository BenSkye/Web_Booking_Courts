import User from '~/models/userModel'

class userRepository {
  static async addUser(user: any) {
    const newUser = new User(user)
    return newUser.save()
  }
  static async addPartner(user: any) {
    user.role = 'manager' // Set the role to 'manager'
    const newUser = new User(user)
    return newUser.save()
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

  static async updatePassword(userId: string, password: string) {
    const passwordChangeAt = Date.now() - 5000 ///để tránh trường hợp token được tạo trước khi password được thay đổi
    return await User.findByIdAndUpdate(userId, { password, passwordChangeAt }, { new: true })
  }
  static async changePasswordAfter(JWTTimestamp: number, userId: string) {
    const user = await User.findById({ _id: userId })
    if (user) {
      if (user.passwordChangeAt) {
        const changedTimestamp = Math.floor(user.passwordChangeAt.getTime() / 1000)
        return JWTTimestamp < changedTimestamp
      }
    }
    return false
  }
}
export default userRepository
