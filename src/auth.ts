// src/auth.ts
import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { sql } from '@/lib/db';
import bcrypt from 'bcrypt';

// ✅ Types pour NextAuth (sans JWT module)
declare module 'next-auth' {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Credentials manquants');
          return null;
        }

        console.log('🔍 Recherche user:', credentials.email);

        const users = await sql`
          SELECT id, email, name, role, password_hash 
          FROM users 
          WHERE email = ${credentials.email}
        `;

        const user = users[0];

        if (!user) {
          console.log('❌ User non trouvé en DB');
          return null;
        }

        console.log('✅ User trouvé:', { email: user.email, role: user.role });

        const isValid = await bcrypt.compare(credentials.password as string, user.password_hash);

        console.log('🔐 Password valide?', isValid);

        if (!isValid) {
          console.log('❌ Password incorrect');
          return null;
        }

        console.log('✅ Login réussi!');

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
