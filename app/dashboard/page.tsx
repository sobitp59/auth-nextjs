// "use client";

import { verifyAccessToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
// import { useAuth } from "../hooks/useAuth";

async function Dashboard() {
  // const { isAuthenticated, isLoading } = useAuth();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (!isAuthenticated) {
  //   return null;
  // }

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = await verifyAccessToken(token);

  if (!payload) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Protected Page
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome to the Dashboard area!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
