import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    
    constructor(
        private readonly tripDao: TripDAO,
        private readonly userSession: UserSession,
    ) {
    }

    public getTripsByUser(user: User): Trip[] {
        const loggedUser: User = this.userSession.getLoggedUser();

        if (loggedUser == null) {
            throw new UserNotLoggedInException();
        }
        
        return user.isFriendWith(loggedUser)
            ? this.tripDao.findTripsByUser(user)
            : [];
    }
}
