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
tournamenRoute.route('/:id').get(tournamentController.getTournamentById)
export default tournamenRoute
