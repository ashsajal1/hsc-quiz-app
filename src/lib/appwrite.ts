// src/appwrite.js
import { Client, Account, OAuthProvider } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1')// The Appwrite API endpoint
  .setProject('674304b2002f919b31ea')// Your Appwrite project IDexport const account = new Account(client)
export { OAuthProvider }
export const account = new Account(client);

