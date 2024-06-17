import centerService from '~/services/centerService'
import AppError from '~/utils/appError'
import catchAsync from '~/utils/catchAsync'
import PlayPackageService from '~/services/playPackageService';

class PlayPackageController {
    static createPlayPackage = catchAsync(async (req: any, res: any, next: any) => {
        req.body = { ...req.body, user: req.user._id }; // Đảm bảo gán user vào req.body hoặc gửi cùng với request
        const playPackageServiceInstance = new PlayPackageService();
        const newPlayPackage = await playPackageServiceInstance.addPlayPackage(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                newPlayPackage
            }
        });
    });
}
export default PlayPackageController;