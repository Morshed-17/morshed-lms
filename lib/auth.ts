
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { sendMail } from "./send-mail";
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        console.log(email)
        await sendMail({
          sendTo: email,
          email: "MorshedLMS <morshedmto@gmail.com>",
          subject: "MorshedLMS - Verify your email",
          text: "",
          html: `Your OTP is <strong>${otp}</strong>`,
        });
      },
    }),
    admin()
  ],
});
