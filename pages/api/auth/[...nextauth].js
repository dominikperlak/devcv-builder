import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl) || url.startsWith(`${baseUrl}/my-resume`)) {
        return url;
      }
      return `${baseUrl}/builder`;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.id) {
        session.user.id = token.id;
      }
      session.isAuthenticated = true;
      return session;
    },
  },
  events: {
    async error(message) {
      console.error('NextAuth Error:', message);
      if (message.error) {
        console.error('Error message:', message.error);
      }
    },
  },
  debug: true,
};

export default NextAuth(authOptions);
