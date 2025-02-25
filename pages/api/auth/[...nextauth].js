import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { createClient } from '@supabase/supabase-js';
import { v5 as uuidv5 } from 'uuid';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Required environment variables are missing');
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Required environment variables are missing');
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
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github') {
        try {
          const userUUID = uuidv5(user.id.toString(), UUID_NAMESPACE);
          const { data: existingUser, error: fetchError } = await supabase
            .from('user_table')
            .select('id')
            .eq('id', userUUID)
            .maybeSingle();

          if (fetchError) {
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
          console.error('Sign-in error:', error);
          return false;
        }
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/my-resume`;
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
      session.user = {
        id: token.id || null,
        uuid: token.uuid || null,
      };
      session.accessToken = token.accessToken || null;
      session.isAuthenticated = Boolean(token.uuid);
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  debug: false,
};

export default NextAuth(authOptions);
