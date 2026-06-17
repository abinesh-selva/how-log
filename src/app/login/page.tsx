import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--cream)] px-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#E8E3DC] max-w-sm w-full text-center">
        <h1 className="text-3xl font-black text-[var(--ink)] mb-2">Welcome Back</h1>
        <p className="text-[var(--ink-muted)] mb-8">Sign in to save your countdowns and get email reminders.</p>

        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/dashboard" })
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-[var(--ink)] text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-opacity"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20.94c5.12 0 9.29-4.17 9.29-9.29 0-.66-.06-1.3-.17-1.92H12v3.63h5.36c-.23 1.2-1.04 2.21-2.18 2.87v2.38h3.53C20.78 16.71 22 14.5 22 11.65c0-.85-.09-1.67-.24-2.45H12v4.68h6.2c-.3 1.55-1.74 2.68-3.4 2.68-2.22 0-3.95-1.97-3.64-4.27h-4.4c-.65 2.87 1.51 5.64 4.49 5.64 1.34 0 2.55-.5 3.51-1.33l-2.6-2.1c-.5.35-1.12.56-1.8.56-1.84 0-3.37-1.44-3.53-3.25h-4.1c.42 3.19 3.03 5.64 6.27 5.64z" fill="currentColor" stroke="none"/>
            </svg>
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  )
}
