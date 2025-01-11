import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { createClient } from '@supabase/supabase-js';
import { v5 as uuidv5 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Missing NEXTAUTH_SECRET environment variable');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const UUID_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

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
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true, // Ustawione na `true` bez względu na środowisko
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true, // Ustawione na `true` bez względu na środowisko
      },
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true, // Ustawione na `true` bez względu na środowisko
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github') {
        try {
          const userUUID = uuidv5(user.id.toString(), UUID_NAMESPACE);

          const { data: existingUser, error: fetchError } = await supabase
            .from('user_table')
            .select('id')
            .eq('id', userUUID)
            .single();

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching user:', fetchError);
            return false;
          }

          if (!existingUser) {
            const { error: insertError } = await supabase
              .from('user_table')
              .insert([
                {
                  id: userUUID,
                  created_at: new Date().toISOString(),
                },
              ]);

            if (insertError) {
              console.error('Error inserting user:', insertError);
              return false;
            }
          }

          user.uuid = userUUID;
          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl) || url.startsWith(`${baseUrl}/my-resume`)) {
        return url;
      }
      return `${baseUrl}/builder`;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.uuid = user.uuid;
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        session.user = {};
      }

      if (token.uuid) {
        session.user.uuid = token.uuid;
      }
      if (token.id) {
        session.user.id = token.id;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }

      try {
        const { data: user, error } = await supabase
          .from('user_table')
          .select('id')
          .eq('id', session.user.uuid)
          .single();

        session.isAuthenticated = !!user && !error;
      } catch (error) {
        console.error('Error verifying session:', error);
        session.isAuthenticated = false;
      }

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
