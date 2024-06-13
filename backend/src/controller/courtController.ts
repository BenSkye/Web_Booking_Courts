import courtService from '~/services/courtService'
import catchAsync from '~/utils/catchAsync'

class courtController {

    static  getAllCourt = catchAsync(async (req: any, res: any, next: any) => {
        try {
          const users = await courtService.getAllCourt();
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching users', error });
        }
      });
}
export default courtController
