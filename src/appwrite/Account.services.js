import { Account, ID } from "appwrite";
import appwriteClient from ".";

// Account: Authentication module: create user, login sessions, logout, login with google, linkedin, github, faceebook


class AppwriteAccount {
    constructor() {
        this.account = new Account(appwriteClient)
    }

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
            console.log("User session not found!", error)
            return null;
        }
    }

    async createAppwriteEmailPasswordSession(email, password) {
        try {
            const result = await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
            return result;
        } catch (error) {
            console.log("Error in logging in the user: ", error)
            return ""
        }
    }

    async logout() {
        try {
            const result = await this.account.deleteSession({
                sessionId: 'current'
            });
            console.log(result);
            return result;
        } catch (error) {
            console.error(error)
        }
    }
}

export default AppwriteAccount;