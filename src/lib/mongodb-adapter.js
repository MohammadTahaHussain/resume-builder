import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const client = new MongoClient(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

export const mongodbAdapter = MongoDBAdapter(client, {
  databaseName: "resume-builder",
  collections: {
    Users: "users",
    Accounts: "accounts", 
    Sessions: "sessions",
    VerificationTokens: "verification_tokens"
  }
}) 