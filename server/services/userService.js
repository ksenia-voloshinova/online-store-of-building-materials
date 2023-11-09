import { db } from "../db/index.js";

class UserService {
    async getUserByEmail(email) {
        await db.read();
        const { users } = db.data;

        return users.find(user => user.email === email);
    }

    async getUserById(id) {
        await db.read();
        const { users } = db.data;

        return users.find(user => user.id === id);
    }

    async getSubscribedUserByEmail(email) {
        await db.read();
        const { usersSubscription } = db.data;

        return usersSubscription.find(userEmail => userEmail === email);
    }

    async createUser(user) {
        await db.read();
        const { users } = db.data;

        users.push({
            id: Date.now(),
            phone: "",
            ...user,
        });
        await db.write();

        return user;
    }

    async createSubscriptionUser(user) {
        await db.read();
        const { usersSubscription } = db.data;

        usersSubscription.push(user);
        await db.write();

        return user;
    }
}

export default new UserService();