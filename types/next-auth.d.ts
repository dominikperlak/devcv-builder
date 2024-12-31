import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    id?: string;
    isAuthenticated?: boolean;
    user?: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
      id?: string;
    };
  }

  interface JWT {
    accessToken?: string;
    id?: string;
  }
}