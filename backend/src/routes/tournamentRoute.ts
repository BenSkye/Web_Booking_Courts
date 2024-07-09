import { Router } from 'express'
import authController from '~/controller/authController'
import tournamentController from '~/controller/tournamentController'
const tournamenRoute = Router()
tournamenRoute.route('/all-tournaments').get(tournamentController.getTournaments)
tournamenRoute
  .route('/create-tournament')
  .post(authController.protect, authController.restricTO('customer'), tournamentController.createTournament)
tournamenRoute
  .route('/personal-tournaments')
  .get(authController.protect, authController.restricTO('customer'), tournamentController.getPersonalTournaments)
tournamenRoute.route('/tournament-in-center/:centerId').get(tournamentController.getTournamentByCenterId)
tournamenRoute
  .route('/approved-tournament/:tournamentId')
  .put(authController.protect, authController.restricTO('manager'), tournamentController.approveTournament)
tournamenRoute
  .route('/cancel-booking-and-approved-tournament/:tournamentId')
  .put(
    authController.protect,
    authController.restricTO('manager'),
    tournamentController.cancelBookingAndApproveTournament
  )
tournamenRoute
  .route('/callback-cancel-booking-and-approved-tournament')
  .post(tournamentController.callbackCancelBookingAndApproveTournament)
tournamenRoute
  .route('/denied-tournament/:tournamentId')
  .put(authController.protect, authController.restricTO('manager'), tournamentController.denyTournament)
tournamenRoute.route('/:id').get(tournamentController.getTournamentById)
export default tournamenRoute
