import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// generate access token
export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "15m" });
}

// generate refresh token
export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
}

// verify access token
export function verifyAccessToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  } catch (error) {
    return null;
  }
}

// verify refresh token
export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      userId: string;
    };
  } catch (error) {
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
