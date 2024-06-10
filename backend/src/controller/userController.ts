// userController.ts
import UserService from '~/services/userService';
import catchAsync from '~/utils/catchAsync';

class UserController {
  static updateUser = catchAsync(async (req: any, res: any, next: any) => {
    const userId = req.user.id;
    const { userName, avatar, userPhone } = req.body;

    const  {  newuser, token } = await UserService.updateUser(userId, { userName, avatar, userPhone });
    
    

    res.status(200).json({
      status: 'success',
      data: {
        user: newuser,
        // token: token,
      }
    });
  });
}

export default UserController;
