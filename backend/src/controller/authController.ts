import authService from '~/services/authService'
import AppError from '~/utils/appError'
import catchAsync from '~/utils/catchAsync'

class authController {
  static registerUser = catchAsync(async (req: any, res: any, next: any) => {
    const newUser = await authService.registerUser(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  })
  static registerPartner = catchAsync(async (req: any, res: any, next: any) => {
    const newUser = await authService.registerPartner(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  })
  static loginUser = catchAsync(async (req: any, res: any, next: any) => {
    const { userEmail, password } = req.body
    if (!userEmail || !password) {
      return next(new AppError('Vui lòng nhập email và mật khẩu', 400))
    }
    const { foundUser, token } = await authService.loginUser(userEmail, password)
    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      })
      .status(201)
      .json({
        status: 'success',
        data: {
          user: foundUser,
          token: token
        }
      })
  })

  //check user đã đăng nhập chưa
  static protect = catchAsync(async (req: any, res: any, next: any) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return next(new AppError('Vui lòng đăng nhập để truy cập', 401))
    }
    const currentUser = await authService.protect(token)
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
}
export default authController
