import connectDB from './mongodb'
import User from '../models/User'
import Account from '../models/Account'
import Session from '../models/Session'

export function CustomAdapter() {
  return {
    async createUser(data) {
      await connectDB()
      const user = new User(data)
      await user.save()
      return user
    },

    async getUser(id) {
      await connectDB()
      return await User.findById(id)
    },

    async getUserByEmail(email) {
      await connectDB()
      return await User.findOne({ email })
    },

    async getUserByAccount({ provider, providerAccountId }) {
      await connectDB()
      const account = await Account.findOne({ provider, providerAccountId })
      if (!account) return null
      return await User.findById(account.userId)
    },

    async updateUser(data) {
      await connectDB()
      return await User.findByIdAndUpdate(data.id, data, { new: true })
    },

    async deleteUser(userId) {
      await connectDB()
      await User.findByIdAndDelete(userId)
      await Account.deleteMany({ userId })
      await Session.deleteMany({ userId })
    },

    async linkAccount(data) {
      await connectDB()
      const account = new Account(data)
      await account.save()
      return account
    },

    async unlinkAccount({ provider, providerAccountId }) {
      await connectDB()
      await Account.findOneAndDelete({ provider, providerAccountId })
    },

    async createSession(data) {
      await connectDB()
      const session = new Session(data)
      await session.save()
      return session
    },

    async getSessionAndUser(sessionToken) {
      await connectDB()
      const session = await Session.findOne({ sessionToken })
      if (!session) return null
      const user = await User.findById(session.userId)
      return { session, user }
    },

    async updateSession(data) {
      await connectDB()
      return await Session.findOneAndUpdate(
        { sessionToken: data.sessionToken },
        data,
        { new: true }
      )
    },

    async deleteSession(sessionToken) {
      await connectDB()
      await Session.findOneAndDelete({ sessionToken })
    },

    async createVerificationToken(data) {
      await connectDB()
      // For now, we'll skip verification tokens
      return data
    },

    async useVerificationToken({ identifier, token }) {
      await connectDB()
      // For now, we'll skip verification tokens
      return null
    }
  }
} 