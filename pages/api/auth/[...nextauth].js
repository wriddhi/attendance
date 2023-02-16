import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// Initialize the JS client
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

// Make a request

export const authOptions = {

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { username, password } = credentials

        const { data: users, error } = await supabase.from('admins').select('*').eq('username', username).eq('password', password)
        console.log(users)
        if (error) {
          console.log("Error => ", error)
          return null
        }

        if (!users.length) {
          return null
        }

        return users[0]
      }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/",
  },
}

export default NextAuth(authOptions)