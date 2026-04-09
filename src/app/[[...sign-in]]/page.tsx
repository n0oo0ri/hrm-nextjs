"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const role = (session.user as any)?.role;
      console.log("Authenticated, role:", role);
      if (role) {
        console.log("Redirecting to:", `/${role}`);
        router.push(`/${role}`);
      }
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else if (result?.ok) {
        // Update session to get latest data
        console.log("Sign in successful, updating session...");
        const updated = await update();
        console.log("Session updated:", updated);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="h-screen flex items-center justify-center bg-lamaSkyLight"
      suppressHydrationWarning
    >
      <div className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 w-full max-w-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Image src="https://cdn.brandfetch.io/idOaERzIUS/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1771701639861" alt="Logo" width={144} height={144} />
        </h1>
        <h2 className="text-gray-400">Sign in to your account</h2>

        {error && (
          <div className="text-sm text-red-400 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@school.com"
              className="p-2 rounded-md ring-1 ring-gray-300 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="p-2 rounded-md ring-1 ring-gray-300 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Demo: Use test credentials to sign in
        </p>
      </div>
    </div>
  );
};

export default LoginPage;