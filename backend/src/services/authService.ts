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
  static async protect(token: string) {
    if (!token) {
      throw new Error('Token không tồn tại')
    }
    const decoded: jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET ?? '') as jwt.JwtPayload
    const currentUser = await userRepository.findUser({ _id: decoded.id })
    if (!currentUser) {
      throw new Error('Người dùng không tồn tại')
    }
    // if (currentUser.changePasswordAfter(decoded.iat)) {
    //   throw new Error('Người dùng đã đổi mật khẩu')
    // }
    return currentUser
  }
}
export default authService
