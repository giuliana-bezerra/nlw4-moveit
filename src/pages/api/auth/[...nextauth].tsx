// @ts-nocheck
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.user.id = user.sub;
      return Promise.resolve(session);
    },
  },
});
