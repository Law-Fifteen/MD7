import { useState } from "react";

type LoginProps = {
  onLogin: (username: string) => void;
};

const USERS: Record<string, string> = {
  MarkChristenson: "MD7SalesAcademy",
  JohnMiller: "MD7SalesAcademy",
  Morgenstern: "Admin12",
  Guest: "MD7SalesAcademy",
};

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();
    if (USERS[trimmedUser] && USERS[trimmedUser] === trimmedPass) {
      setError("");
      onLogin(trimmedUser);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-academy">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,210,198,0.24),transparent_32%),linear-gradient(140deg,#052F47_0%,#071B24_55%,#0D3F50_100%)]" />
      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="mb-8 flex justify-center">
          <img src="./Resources/MD7-Logo.svg" alt="MD7" className="h-16 w-16 rounded-2xl bg-white p-3" />
        </div>
        <h1 className="mb-2 text-center text-2xl font-semibold text-white">MD7 Sales Academy</h1>
        <p className="mb-8 text-center text-sm text-white/50">Sign in to continue</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              autoFocus
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-teal"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-teal"
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-academy transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
