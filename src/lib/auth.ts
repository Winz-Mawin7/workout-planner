import CredentialsProvider from 'next-auth/providers/credentials'
import { dbConnect } from '@/lib/mongodb'
import { compare } from 'bcryptjs'
import { AuthOptions } from 'next-auth'
// import { MongoDBAdapter } from '@auth/mongodb-adapter'
// import { Adapter } from 'next-auth/adapters'
import { Users } from '@/models/users.model'

export const authOptions: AuthOptions = {
  // adapter: MongoDBAdapter(clientPromise) as Adapter,
  session: {
    strategy: 'jwt',
  },
  // jwt: {
  //   maxAge: 60 * 60 * 24 * 30,
  // },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const { email, password } = credentials

        await dbConnect()
        const user = await Users.findOne({ email })

        if (!user) return null

        const isValid = await compare(password, user.password)
        if (!isValid) throw Error('Password is incorrect')

        return {
          id: user._id,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account }) {
    //   console.log('🚀 ~ signIn ~ account:', account)
    //   console.log('🚀 ~ signIn ~ user:', user)
    //   return true
    // },
    async jwt({ user, token, account, ...rest }) {
      if (account) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token, ...rest }) {
      if (token) {
        session.user.id = token.id
      }

      return session
    },
  },
}
