import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "example@example.com" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            // Replace with your own API request logic
            const res = await fetch("http://localhost:8000/sellerUser/login", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            });
            const user = await res.json();
            // If no error and we have user data, return it
            if (res.ok && user) {
              console.log("user", user);
              return user;
            }
            // Return null if user data could not be retrieved
            return null;
          },
        }),
      ],
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.user = user; // Attach the entire user object to the token
          }
          return token;
        },
        async session({ session, token }) {
          session.user = token.user; // Attach the entire user object to the session
          return session;
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
      // session: {
      //   jwt: true,
      // },
      // jwt: {
      //   secret: process.env.NEXTAUTH_SECRET,
      // },
      pages: {
        signIn: '/auth/signin', // Custom sign-in page
        error: '/auth/error', // Error page
      },
  };