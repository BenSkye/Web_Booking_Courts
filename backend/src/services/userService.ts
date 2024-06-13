// userService.ts
import userRepository from '~/repository/userRepository';
import AppError from '~/utils/appError';
import jwt from 'jsonwebtoken'
class UserService {
 
    static async updateUser(userId: string, infor: Object ) {
    const user = await userRepository.findUser({ _id: userId })
    if (!user) {
      throw new AppError('Người dùng không tồn tại', 401)
    }
    
    
    const updatedUser = await userRepository.updateUser(userId, infor);


    if (!updatedUser) {
      throw new AppError('Lỗi khi cập nhật thông tin người dùng', 401)
    }

    const token = jwt.sign(
      { id: updatedUser._id, role: updatedUser.role, avatar: updatedUser.avatar, userName: updatedUser.userName, userPhone: updatedUser.userPhone },
      process.env.JWT_SECRET ?? ''
    )

    const {  password:userPassword, ...newuser } = updatedUser.toObject()
    return {  newuser, token }
}
static async getAllUser() {
  return await userRepository.getAllUser();
}

}

export default UserService;
