import 'jest'
import UserNotLoggedInException from '../src/exception/UserNotLoggedInException';
import Trip from '../src/trip/Trip';
import TripDAO from '../src/trip/TripDAO';
import TripService from '../src/trip/TripService'
import User from '../src/user/User';
import UserSession from '../src/user/UserSession';

describe('TripService should', () => {

    it('throw exception when user is not logged in', () => {
        const userSession: jest.Mocked<UserSession> = {
            getLoggedUser: jest.fn(() => null)
        };

        const target: TripService = new TripService(new TripDAO(), userSession);
        expect(() => target.getTripsByUser(new User())).toThrowError(UserNotLoggedInException);
    });

    it('return no trips when logged user is not a friend', () => {
        const loggedUser: User = new User();
        const userSession: jest.Mocked<UserSession> = {
            getLoggedUser: jest.fn(() => loggedUser)
        };

        const target: TripService = new TripService(new TripDAO(), userSession);

        expect(target.getTripsByUser(new User()).length).toEqual(0);
    });

    it('return trips when logged user is a friend', () => {
        const loggedUser: User = new User();
        const trips: Trip[] = [new Trip()];
        const user: User = new User();
        user.addFriend(loggedUser);
        user.addTrip(trips[0]);

        const userSession: jest.Mocked<UserSession> = {
            getLoggedUser: jest.fn(() => loggedUser)
        };
        const tripDao: jest.Mocked<TripDAO> = {
            findTripsByUser: jest.fn((user: User) => trips)
        };

        const target: TripService = new TripService(tripDao, userSession);

        expect(target.getTripsByUser(user)).toBe(trips);
    });
});
