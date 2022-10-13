import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../lib/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      async authorize(credentials) {
        await db.connect();

        // find user
        const user = await User.findOne({
          email: credentials.email,
        });

        // disconnect databse
        await db.disconnect();

        // check user credentials
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };
        }

        throw new Error("Invalid email or password");
      },

    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
});
