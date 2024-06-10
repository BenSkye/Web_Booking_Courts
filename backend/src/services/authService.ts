import { NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import userRepository from '~/repository/userRepository'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import AppError from '~/utils/appError'
class authService {
  static async registerUser(user: any) {
    const password = bcrypt.hashSync(user.password, 12)
    user.password = password
    const newUser = userRepository.addUser(user)
    return newUser
  }
  static async registerPartner(user: any) {
    const password = bcrypt.hashSync(user.password, 12)
    user.password = password
    const newUser = userRepository.addPartner(user)
    return newUser
  }
  static async loginUser(userEmail: string, password: string) {
    const foundUser = await userRepository.findUser({ userEmail })
    if (!foundUser) {
      throw new AppError('Email không tồn tại', 401)
    }
    const isMatch = bcrypt.compareSync(password, foundUser.password)
    if (!isMatch) {
      throw new AppError('Mật khẩu không đúng', 401)
    }
    const token = jwt.sign(
      { id: foundUser._id, role: foundUser.role, avatar: foundUser.avatar, userName: foundUser.userName },
      process.env.JWT_SECRET ?? ''
    )
    const { password: userPassword, ...user } = foundUser.toObject()
    return { foundUser, token }
  }

  static async protect(token: string) {
    if (!token) {
      throw new AppError('bạn chưa đăng nhập', 401)
    }
    const decoded: jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET ?? '') as jwt.JwtPayload
    const currentUser = await userRepository.findUser({ _id: decoded.id })
    if (!currentUser) {
      throw new AppError('Người dùng không tồn tại', 401)
    }
    const ifChangePass = await userRepository.changePasswordAfter(decoded.iat ?? 0, currentUser._id.toString())
    if (ifChangePass) {
      throw new AppError('Người dùng đã đổi mật khẩu', 401)
    }
    return currentUser
  }

  static async googleLogin(userEmail: string, userName: string, avatar: string) {
    const user = await userRepository.findByEmail(userEmail)

    if (user) {
      const token = jwt.sign(
        { id: user._id, role: user.role, avatar: user.avatar, userName: user.userName },
        process.env.JWT_SECRET ?? ''
      )
      const { password, ...rest } = user.toObject()
      return { user: rest, token }
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const username = userName.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8)

      const newUser = await userRepository.create({
        userName,
        userEmail,
        password: hashedPassword,
        avatar: avatar
      })

      const token = jwt.sign(
        { id: newUser._id, role: newUser.role, avatar: newUser.avatar, userName: newUser.userName },
        process.env.JWT_SECRET ?? ''
      )
      const { password: hashedPassword2, ...rest } = newUser.toObject()
      return { user: rest, token }
    }
  }

  static async changePassword(userId: string, passwordCurrent: string, newPassword: string) {
    const user = await userRepository.findUser({ _id: userId })
    if (!user) {
      throw new AppError('Người dùng không tồn tại', 401)
    }
    const truePassword = await bcrypt.compare(passwordCurrent, user.password)

    if (!truePassword) {
      throw new AppError('Mật khẩu hiện tại không đúng', 401)
    }
    user.password = bcrypt.hashSync(newPassword, 12)
    const userNewPass = await userRepository.updatePassword(userId, user.password)
    if (!userNewPass) {
      throw new AppError('Lỗi khi cập nhật mật khẩu', 401)
    }
    const token = jwt.sign(
      { id: userNewPass._id, role: userNewPass.role, avatar: userNewPass.avatar, userName: userNewPass.userName },
      process.env.JWT_SECRET ?? ''
    )
    const { password: userPassword, ...newuser } = userNewPass.toObject()
    return { userNewPass, token }
  }
}
export default authService
