import Trip from "../trip/Trip";

export default class User {
    private trips: Trip[] = [];
    private friends: User[] = [];

    public getFriends(): User[] {
        return this.friends;
    }

    public addFriend(user: User): void {
        this.friends.push(user);
    }

    public addTrip(trip: Trip): void {
        this.trips.push(trip);
    }

    public getTrips(): Trip[] {
        return this.trips;
    }

    public isFriendWith(person: User): boolean {
        return this.getFriends()
            .filter((friend) => friend === person)
            .length > 0;
    }
}
