import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    // Email/Password login
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          // Try to check Google Sheets database for user
          try {
            const { getUserByEmail } = await import('@/lib/sheets-db');
            const user = await getUserByEmail(credentials?.email);
            
            if (user && user.is_active === 'TRUE') {
              // In production, you'd verify password hash here
              // For now, demo password check
              if (credentials?.password === 'demo123') {
                return {
                  id: user.user_id,
                  email: user.email,
                  name: `${user.first_name} ${user.last_name}`,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  phone: user.phone
                }
              }
            }
          } catch (sheetsError) {
            console.log('Google Sheets authentication failed:', sheetsError.message);
            // Don't throw, just continue to fallback
          }
          
          // Fallback to demo user if sheets not configured or failed
          if (credentials?.email === 'demo@royomber.com' && credentials?.password === 'demo123') {
            return {
              id: 'demo_user',
              email: 'demo@royomber.com',
              name: 'Demo User',
              firstName: 'Demo',
              lastName: 'User'
            }
          }
          
          // For any other credential combination, return null (auth failed)
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          // Return null instead of throwing to prevent crashes
          if (credentials?.email === 'demo@royomber.com' && credentials?.password === 'demo123') {
            return {
              id: 'demo_user',
              email: 'demo@royomber.com',
              name: 'Demo User',
              firstName: 'Demo',
              lastName: 'User'
            }
          }
        }
        
        return null
      }
    })
  ],
  
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  
  callbacks: {
    async session({ session, token }) {
      // Add user ID to session
      session.user.id = token.sub
      return session
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  
  session: {
    strategy: 'jwt',
  },
  
  theme: {
    colorScheme: 'dark',
    brandColor: '#e6c87b',
    logo: '/logo.jpg'
  }
})

export { handler as GET, handler as POST }
