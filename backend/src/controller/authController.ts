import authService from '~/services/authService'
import AppError from '~/utils/appError'
import catchAsync from '~/utils/catchAsync'

class authController {
  static registerUser = catchAsync(async (req: any, res: any, next: any) => {
    console.log('req.body', req.body)
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
        httpOnly: true
      })
      .status(200)
      .json({
        status: 'success',
        data: {
          user: foundUser
        }
      })
  })
}
export default authController
