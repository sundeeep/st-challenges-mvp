import { Account, ID } from "appwrite";
import appwriteClient from ".";

class AppwriteAccount {
    constructor() {
        this.account = new Account(appwriteClient)
    }

    // create -> create a new User
    // get -> get the existing logged in user
    // createEmailPasswordSession -> creates the login session -> logged in user

    async createAppwriteAccount(email, password, fullName) {
        const result = await this.account.create({
            userId: ID.unique(),
            email: email,
            password: password,
            name: fullName
        });

        return result;
    }

    async getAppwriteUser() {
        try {
            const result = await this.account.get();
            return result;
        } catch (error) {
            console.log("User session not found!")
            return ""
        }
    }

    async createAppwriteEmailPasswordSession(email, password) {
        const result = await account.createEmailPasswordSession({
            email: email,
            password: password
        });

        return result;

    }


}

export default AppwriteAccount;