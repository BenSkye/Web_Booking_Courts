import tournamentService from '~/services/tournamentService'
import catchAsync from '~/utils/catchAsync'

class tournamentController {
  static createTournament = catchAsync(async (req: any, res: any, next: any) => {
    const tournamentServiceInstance = new tournamentService()
    console.log('req.body', req.body)
    const newTournament = await tournamentServiceInstance.addTournament(req.body, req.user._id)
    res.status(201).json({
      status: 'success',
      data: {
        tournament: newTournament
      }
    })
  })
  static getTournamentById = catchAsync(async (req: any, res: any, next: any) => {
    const tournamentServiceInstance = new tournamentService()
    const tournament = await tournamentServiceInstance.getTournamentById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        tournament
      }
    })
  })
  static getPersonalTournaments = catchAsync(async (req: any, res: any, next: any) => {
    console.log('req.user', req.user)
    const tournamentServiceInstance = new tournamentService()
    const tournaments = await tournamentServiceInstance.getPersonalTournaments(req.user._id)
    res.status(200).json({
      status: 'success',
      data: {
        tournaments
      }
    })
  })
  static getTournaments = catchAsync(async (req: any, res: any, next: any) => {
    const tournamentServiceInstance = new tournamentService()
    const tournaments = await tournamentServiceInstance.getTournaments()
    res.status(200).json({
      status: 'success',
      data: {
        tournaments
      }
    })
  })
  static getTournamentByCenterId = catchAsync(async (req: any, res: any, next: any) => {
    const tournamentServiceInstance = new tournamentService()
    const tournaments = await tournamentServiceInstance.getTournamentByCenterId(req.params.centerId)
    res.status(200).json({
      status: 'success',
      data: {
        tournaments
      }
    })
  })
  static cancelTournament = catchAsync(async (req: any, res: any, next: any) => {
    const tournamentServiceInstance = new tournamentService()
    const userId = req.user._id
    const tournament = await tournamentServiceInstance.cancelTournament(userId, req.params.tournamentId)
    res.status(201).json({
      status: 'success',
      data: {
        tournament
      }
    })
  })

  static approveTournament = catchAsync(async (req: any, res: any, next: any) => {
    const tournamentServiceInstance = new tournamentService()
    const pricePerDay = req.body.pricePerDay
    const tournament = await tournamentServiceInstance.approveTournament(req.params.tournamentId, pricePerDay)
    res.status(201).json({
      status: 'success',
      data: {
        tournament
      }
    })
  })
  static denyTournament = catchAsync(async (req: any, res: any, next: any) => {
    const tournamentServiceInstance = new tournamentService()
    const tournament = await tournamentServiceInstance.denyTournament(req.params.tournamentId)
    res.status(201).json({
      status: 'success',
      data: {
        tournament
      }
    })
  })
  static cancelBookingAndApproveTournament = catchAsync(async (req: any, res: any, next: any) => {
    const tournamentServiceInstance = new tournamentService()
    const pricePerDay = req.body.pricePerDay
    const listBookingId = req.body.listBookingId
    const totalAmount = req.body.totalAmount
    const paymentResult = await tournamentServiceInstance.cancelBookingAndApproveTournament(
      req.params.tournamentId,
      pricePerDay,
      totalAmount,
      listBookingId
    )
    res.status(201).json({
      status: 'success',
      data: {
        paymentResult
      }
    })
  })
  static callbackCancelBookingAndApproveTournament = catchAsync(async (req: any, res: any, next: any) => {
    console.log(req.body)
    const tournamentServiceInstance = new tournamentService()
    const result = tournamentServiceInstance.callbackCancelBookingAndApproveTournament(req.body)
  })
  static confirmTournament = catchAsync(async (req: any, res: any, next: any) => {
    const tournamentServiceInstance = new tournamentService()
    const paymentResult = await tournamentServiceInstance.confirmTournament(req.params.tournamentId)
    res.status(201).json({
      status: 'success',
      data: {
        paymentResult
      }
    })
  })
  static callbackConfirmTournament = catchAsync(async (req: any, res: any, next: any) => {
    console.log(req.body)
    const tournamentServiceInstance = new tournamentService()
    const result = tournamentServiceInstance.callbackConfirmTournament(req.body)
  })
  static getTournamentByInvoiceId = catchAsync(async (req: any, res: any, next: any) => {
    const tournamentServiceInstance = new tournamentService()
    const tournament = await tournamentServiceInstance.getTournamentByInvoiceId(req.params.invoiceId)
    res.status(200).json({
      status: 'success',
      data: {
        tournament
      }
    })
  })
}
export default tournamentController
