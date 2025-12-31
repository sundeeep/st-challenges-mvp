import AppwriteTablesDB from "../../appwrite/TablesDB.service.js"
import { APPWRITE_CHALLENGES_TABLE_ID } from "./constants.js";

const tablesDb = new AppwriteTablesDB();

const createChallenge = async(data) => {
    const newChallenge = await tablesDb.createRow(APPWRITE_CHALLENGES_TABLE_ID, data);
    return newChallenge;
}

const getAllChallenges = async() => {
    const allChallenges = await tablesDb.listRows(APPWRITE_CHALLENGES_TABLE_ID)
    return allChallenges;
}

const getChallengeById = async(challengeId) => {
    const challenge = await tablesDb.getRow(APPWRITE_CHALLENGES_TABLE_ID, challengeId)
    return challenge;
}

const updateChallege = async(updatedData, challengeId) => {

}


export {createChallenge, getAllChallenges, getChallengeById}