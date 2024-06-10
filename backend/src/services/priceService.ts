import priceRepository from '../repository/priceRepository'; // Adjust the import path as necessary

class PriceService {
    static async getPrices(query: any) {
        try {
            const prices = await priceRepository.getPrices(query);
            return prices;
        } catch (error) {
            console.error('Error fetching prices:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }
    static async getPricesByScheduleType(cheduleType: string) {
        try {
            const prices = await priceRepository.getPricesByScheduleType(cheduleType);
            return prices;
        } catch (error) {
            console.error('Error fetching prices by schedule type:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }
}

export default PriceService;