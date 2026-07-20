import { useState } from "react";

type LoginProps = {
  onLogin: (username: string) => void;
};

const _0x1a: Record<string, string> = {
  MarkChristenson: atob("TUQ3U2FsZXNhY2FkZW15"),
  JohnMiller: atob("TUQ3U2FsZXNhY2FkZW15"),
  Morgenstern: atob("QWRtaW4xMg=="),
  Guest: atob("TUQ3U2FsZXNhY2FkZW15"),
};

export function Login({ onLogin }: LoginProps) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const _0x2 = (e: React.FormEvent) => {
    e.preventDefault();
    const _u = u.trim();
    const _p = p.trim();
    if (_0x1a[_u] && _0x1a[_u] === _p) {
      setErr("");
      onLogin(_u);
    } else {
      setErr(atob("SW52YWxpZCB1c2VybmFtZSBvciBzZWNyZXQ="));
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
        <form onSubmit={_0x2} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder={atob("VXNlcm5hbWU=")}
              value={u}
              onChange={(e) => { setU(e.target.value); setErr(""); }}
              autoFocus
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-teal"
            />
          </div>
          <div>
            <input
              type={atob("cGFzc3dvcmQ=")}
              placeholder={atob("U2VjcmV0")}
              value={p}
              onChange={(e) => { setP(e.target.value); setErr(""); }}
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-teal"
            />
          </div>
          {err && <p className="text-xs text-red-400">{err}</p>}
          <button
            type="submit"
            className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-academy transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            {atob("U2lnbiBJbg==")}
          </button>
        </form>
      </div>
    </div>
  );
}
