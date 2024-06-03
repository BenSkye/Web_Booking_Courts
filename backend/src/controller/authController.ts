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
}
export default authController
