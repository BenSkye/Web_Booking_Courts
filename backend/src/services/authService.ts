import { NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import userRepository from '~/repository/userRepository'
import jwt from 'jsonwebtoken'
class authService {
  static async registerUser(user: any) {
    const password = bcrypt.hashSync(user.password, 12)
    user.password = password
    const newUser = userRepository.addUser(user)
    return newUser
  }
  static async loginUser(userEmail: string, password: string) {
    const foundUser = await userRepository.findUser({ userEmail })
    if (!foundUser) {
      throw new Error('Email không tồn tại')
    }
    const isMatch = bcrypt.compareSync(password, foundUser.password)
    if (!isMatch) {
      throw new Error('Mật khẩu không đúng')
    }
    const token = jwt.sign({ id: foundUser._id, role: foundUser.role }, process.env.JWT_SECRET ?? '')
    const { password: userPassword, ...user } = foundUser.toObject()
    return { foundUser, token }
  }
}
export default authService
