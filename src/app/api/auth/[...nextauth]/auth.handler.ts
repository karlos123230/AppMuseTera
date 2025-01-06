import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        })

        if (!user?.password) return null

        const valid = await bcrypt.compare(credentials?.password || "", user.password)
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          professionalRegister: user.professionalRegister
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.professionalRegister = user.professionalRegister
      }
      return token
    },
    session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.id
        session.user.professionalRegister = token.professionalRegister
      }
      return session
    }
  },
  pages: { signIn: "/" }
})
