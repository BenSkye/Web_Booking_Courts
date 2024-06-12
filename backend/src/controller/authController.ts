import authService from '~/services/authService'
import AppError from '~/utils/appError'
import catchAsync from '~/utils/catchAsync'
import bcryptjs from 'bcryptjs'
class authController {
  static registerUser = catchAsync(async (req: any, res: any, next: any) => {
    const authServiceInstance = new authService()
    const newUser = await authServiceInstance.registerUser(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  })
  static registerPartner = catchAsync(async (req: any, res: any, next: any) => {
    const authServiceInstance = new authService()

    const newUser = await authServiceInstance.registerPartner(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  })
  static loginUser = catchAsync(async (req: any, res: any, next: any) => {
    const authServiceInstance = new authService()

    const { userEmail, password } = req.body
    if (!userEmail || !password) {
      return next(new AppError('Vui lòng nhập email và mật khẩu', 400))
    }
    const { user, token } = await authServiceInstance.loginUser(userEmail, password)
    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      })
      .status(201)
      .json({
        status: 'success',
        data: {
          user: user,
          token: token
        }
      })
  })
  static changePassword = catchAsync(async (req: any, res: any, next: any) => {
    const authServiceInstance = new authService()

    const { oldPassword, newPassword, confirmPassword } = req.body
    console.log('req.body', req.body)
    if (!oldPassword || !newPassword || !confirmPassword) {
      return next(new AppError('Vui lòng nhập mật khẩu cũ và mật khẩu mới', 400))
    }
    if (newPassword !== confirmPassword) {
      return next(new AppError('Vui lòng nhập xác nhận mật khẩu trùng với mật khẩu mới', 400))
    }
    const { userNewPass, token } = await authServiceInstance.changePassword(req.user._id, oldPassword, newPassword)
    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      })
      .status(200)
      .json({
        status: 'success',
        data: {
          user: userNewPass,
          token: token
        }
      })
  })

  //check user đã đăng nhập chưa
  static protect = catchAsync(async (req: any, res: any, next: any) => {
    const authServiceInstance = new authService()

    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    console.log('token', token)
    if (!token) {
      return next(new AppError('Vui lòng đăng nhập để truy cập', 401))
    }
    const currentUser = await authServiceInstance.protect(token)
    req.user = currentUser as any
    next()
  })

  //Check user role có qyền thực hiện action không
  static restricTO = (...roles: [string]) => {
    return (req: any, res: any, next: any) => {
      if (!roles.includes(req.user.role)) {
        return next(new AppError('You do not have permission to perform this action', 403))
      }
      next()
    }
  }

  static googleLogin = catchAsync(async (req: any, res: any, next: any) => {
    const authServiceInstance = new authService()

    const { email, name, photo } = req.body

    if (!email) {
      return next(new AppError('Vui lòng nhập email', 400))
    }

    const { user, token } = await authServiceInstance.googleLogin(email, name, photo)

    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000) // 1 hour
      })
      .status(200)
      .json({
        status: 'success',
        data: {
          user,
          token
        }
      })
  })
}
export default authController
