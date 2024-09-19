// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET!
);

// generate access token
// export function generateAccessToken(userId: string): string {
//   return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "15m" });
// }

export function generateAccessToken(userId: string): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(JWT_SECRET);
}

// generate refresh token
// export function generateRefreshToken(userId: string): string {
//   return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
//     expiresIn: "7d",
//   });
// }
export function generateRefreshToken(userId: string): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_REFRESH_SECRET);
}

// verify access token
// export function verifyAccessToken(token: string): { userId: string } | null {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
//   } catch (error) {
//     return null;
//   }
// }

export async function verifyAccessToken(
  token: string
): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string };
  } catch {
    return null;
  }
}

// verify refresh token
// export function verifyRefreshToken(token: string): { userId: string } | null {
//   try {
//     return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
//       userId: string;
//     };
//   } catch (error) {
//     return null;
//   }
// }

export async function verifyRefreshToken(
  token: string
): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
    return payload as { userId: string };
  } catch {
    return null;
  }
}

// get token from cookies
export function getTokenFromCookies(): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  const cookieStore = cookies();
  return {
    accessToken: cookieStore.get("accessToken")?.value || null,
    refreshToken: cookieStore.get("refreshToken")?.value || null,
  };
}
