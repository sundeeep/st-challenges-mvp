import { Client } from "appwrite";
import { APPWRITE_API_ENDPOINT, APPWRITE_PROJECT_ID } from "../utils/appwrite/constants";

const appwriteClient = new Client()
    .setEndpoint(APPWRITE_API_ENDPOINT) // Your API Endpoint
    .setProject(APPWRITE_PROJECT_ID); // Your project ID

export default appwriteClient;