import playPackageRepository from "~/repository/playPackagesRepository";
interface IPlayPackageService {
    addPlayPackage(playPackage: any): Promise<any>;

}



class PlayPackageService implements IPlayPackageService {

    async addPlayPackage(query: any) {
        try {
            const playPackageRepositoryInstance = new playPackageRepository();
            const playPackage = await playPackageRepositoryInstance.addPlayPackage(query)
            return playPackage
        } catch (error) {
            console.error('Error fetching prices:', error)
            throw error // Rethrow the error to be handled by the caller
        }
    }


}

export default PlayPackageService;

