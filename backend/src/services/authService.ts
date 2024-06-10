import { NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import userRepository from '~/repository/userRepository'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs';
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
      throw new Error('Email không tồn tại')
    }
    const isMatch = bcrypt.compareSync(password, foundUser.password)
    if (!isMatch) {
      throw new Error('Mật khẩu không đúng')
    }
    const token = jwt.sign({ id: foundUser._id, role: foundUser.role, avatar: foundUser.avatar, userName: foundUser.userName, userEmail: foundUser.userEmail, userPhone: foundUser.userPhone }, process.env.JWT_SECRET ?? '')
    const { password: userPassword, ...user } = foundUser.toObject()
    return { foundUser, token }
  }
  static async protect(token: string) {
    if (!token) {
      throw new Error('Token không tồn tại')
    }
    const decoded: jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET ?? '') as jwt.JwtPayload
    const currentUser = await userRepository.findUser({ _id: decoded.id,   })
    if (!currentUser) {
      throw new Error('Người dùng không tồn tại')
    }
    // if (currentUser.changePasswordAfter(decoded.iat)) {
    //   throw new Error('Người dùng đã đổi mật khẩu')
    // }
    return currentUser
  }

 

 static async googleLogin(userEmail: string, userName: string, avatar: string, userPhone: string) {
    const user = await userRepository.findByEmail(userEmail);

    if (user) {
      const token = jwt.sign({ id: user._id, role: user.role, avatar: user.avatar, userName: user.userName, userEmail: user.userEmail, userPhone: user.userPhone }, process.env.JWT_SECRET ?? '');
      const { password, ...rest } = user.toObject();
      return { user: rest, token };
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const username = userName.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8);
      const phoneLength = Math.floor(Math.random() * 2) + 10; // Ngẫu nhiên 10 hoặc 11
      let userPhoneStr = '';
      for (let i = 0; i < phoneLength; i++) {
        userPhoneStr += Math.floor(Math.random() * 10); // Thêm số ngẫu nhiên từ 0-9
      }
      const userPhone = parseInt(userPhoneStr, 10); // Chuyển đổi chuỗi số điện thoại thành số
      const newUser = await userRepository.create({
        userName,
        userEmail,
        password: hashedPassword,
        avatar: avatar,
        userPhone: userPhone,
      });

      const token = jwt.sign({ id: newUser._id, role: newUser.role, avatar: newUser.avatar, userName: newUser.userName, userEmail: newUser.userEmail, userPhone: newUser.userPhone  },process.env.JWT_SECRET ?? '');
      const { password: hashedPassword2, ...rest } = newUser.toObject();
      return { user: rest, token };
    }
  }
}
export default authService
