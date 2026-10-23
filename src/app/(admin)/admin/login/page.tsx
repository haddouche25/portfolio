"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res || res.error) {
        setError("Invalid email or security token.");
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("An unexpected connection error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-md">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          System Access
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Authenticate to open the administrator console.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-300" htmlFor="email">
            Admin Identity
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@domain.com"
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-mono text-slate-300"
            htmlFor="password"
          >
            Security Token
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-blue-500 disabled:opacity-50"
        >
          {isLoading ? "Validating..." : "Authenticate"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="text-xs font-mono text-slate-500">
            Loading security portal...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
