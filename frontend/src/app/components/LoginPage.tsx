import { useState } from "react";
import axios from "axios";
import { TrendingUp, Eye, EyeOff, Lock, User, Mail, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'trading_dashboard_users';

interface StoredUser {
    username: string;
    email: string;
    passwordHash: string;
}

// Simple deterministic hash (not cryptographic — use a real backend for production)
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
    }
    return hash.toString(36);
}

function getUsers(): StoredUser[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}


interface LoginPageProps {
    onLogin: () => void;
}

type Mode = 'login' | 'signup' | 'success';

export default function LoginPage({ onLogin }: LoginPageProps) {
    const [mode, setMode] = useState<Mode>('login');

    // Login fields
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Signup fields
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirm, setSignupConfirm] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const switchMode = (next: Mode) => {
        setError('');
        setShowPassword(false);
        setShowConfirm(false);
        setMode(next);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/users/login", {
                username: loginUsername,
                password: loginPassword
            });
            const message = response.data.message
            if (message == "Login successful") {
                const userDataApiResponse = await axios.get("http://127.0.0.1:5000/api/users/userData", {
                    params: { username: "test" }   // pass username here
                });
                localStorage.setItem("username", userDataApiResponse.data['username']);
                localStorage.setItem("email", userDataApiResponse.data['email']);
                onLogin();
            } else {
                setError("Login failed: " + message);
            }
        } catch (error: any) {
            console.error("Login failed:", error);
            setError("Login failed: " + error.message);
        }
        setLoading(false)
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (signupPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (signupPassword !== signupConfirm) {
            setError('Passwords do not match.');
            return;
        }

        const users = getUsers();

        if (users.find((u) => u.username === signupUsername)) {
            setError('Username is already taken.');
            return;
        }
        if (users.find((u) => u.email === signupEmail)) {
            setError('An account with this email already exists.');
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/users/signup", {
                username: signupUsername,
                email: signupEmail,
                password: signupPassword
            });
            setLoading(false);
            setMode("success");
            setMessage(response.data.message);
        } catch (error: any) {
            setLoading(false);
            setError("Signup failed: " + error.message);
        }
    };

    const inputClass =
        'w-full py-2.5 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition';

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
            <div className="w-full max-w-md px-6">
                {/* Brand */}
                <div className="flex flex-col items-center mb-8">
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                        style={{ background: 'var(--color-primary)' }}
                    >
                        <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-[var(--color-text-primary)] mb-1" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        Trading Dashboard
                    </h1>
                    <p className="text-[var(--color-text-secondary)]" style={{ fontSize: '0.875rem' }}>
                        {mode === 'login' ? 'Sign in to access your dashboard' : mode === 'signup' ? 'Create a new account' : ''}
                    </p>
                </div>

                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 shadow-xl">

                    {/* ── Success screen ── */}
                    {mode === 'success' && (
                        <div className="flex flex-col items-center gap-4 py-4">
                            <CheckCircle className="w-12 h-12" style={{ color: 'var(--color-primary)' }} />
                            <p className="text-[var(--color-text-primary)] text-center" style={{ fontSize: '1rem', fontWeight: 600 }}>
                                Account created!
                            </p>
                            <p className="text-[var(--color-text-secondary)] text-center" style={{ fontSize: '0.875rem' }}>
                                You can now sign in with your new credentials.
                            </p>
                            <button
                                onClick={() => {
                                    setLoginUsername(signupUsername);
                                    setLoginPassword('');
                                    switchMode('login');
                                }}
                                className="w-full mt-2 py-2.5 rounded-lg text-white transition hover:opacity-90"
                                style={{ background: 'var(--color-primary)', fontSize: '0.9375rem', fontWeight: 600 }}
                            >
                                Go to Sign In
                            </button>
                        </div>
                    )}

                    {/* ── Login form ── */}
                    {mode === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label htmlFor="l-username" className="block text-[var(--color-text-secondary)] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                                    <input
                                        id="l-username"
                                        type="text"
                                        value={loginUsername}
                                        onChange={(e) => setLoginUsername(e.target.value)}
                                        placeholder="Enter username"
                                        autoComplete="username"
                                        required
                                        className={`${inputClass} pl-9 pr-4`}
                                        style={{ fontSize: '0.9rem' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="l-password" className="block text-[var(--color-text-secondary)] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                                    <input
                                        id="l-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        placeholder="Enter password"
                                        autoComplete="current-password"
                                        required
                                        className={`${inputClass} pl-9 pr-10`}
                                        style={{ fontSize: '0.9rem' }}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition" tabIndex={-1}>
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && <ErrorBanner message={error} />}

                            <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg text-white transition hover:opacity-90 active:opacity-80 disabled:opacity-60" style={{ background: 'var(--color-primary)', fontSize: '0.9375rem', fontWeight: 600 }}>
                                {loading ? 'Signing in…' : 'Sign In'}
                            </button>

                            <p className="text-center text-[var(--color-text-secondary)]" style={{ fontSize: '0.875rem' }}>
                                Don't have an account?{' '}
                                <button type="button" onClick={() => switchMode('signup')} className="text-[var(--color-primary)] hover:underline" style={{ fontWeight: 600 }}>
                                    Sign Up
                                </button>
                            </p>
                        </form>
                    )}

                    {/* ── Sign-up form ── */}
                    {mode === 'signup' && (
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label htmlFor="s-username" className="block text-[var(--color-text-secondary)] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                                    <input
                                        id="s-username"
                                        type="text"
                                        value={signupUsername}
                                        onChange={(e) => setSignupUsername(e.target.value)}
                                        placeholder="Choose a username"
                                        autoComplete="username"
                                        required
                                        className={`${inputClass} pl-9 pr-4`}
                                        style={{ fontSize: '0.9rem' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="s-email" className="block text-[var(--color-text-secondary)] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                                    <input
                                        id="s-email"
                                        type="email"
                                        value={signupEmail}
                                        onChange={(e) => setSignupEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        className={`${inputClass} pl-9 pr-4`}
                                        style={{ fontSize: '0.9rem' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="s-password" className="block text-[var(--color-text-secondary)] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                                    <input
                                        id="s-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                        placeholder="Min. 6 characters"
                                        autoComplete="new-password"
                                        required
                                        className={`${inputClass} pl-9 pr-10`}
                                        style={{ fontSize: '0.9rem' }}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition" tabIndex={-1}>
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="s-confirm" className="block text-[var(--color-text-secondary)] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                                    <input
                                        id="s-confirm"
                                        type={showConfirm ? 'text' : 'password'}
                                        value={signupConfirm}
                                        onChange={(e) => setSignupConfirm(e.target.value)}
                                        placeholder="Repeat your password"
                                        autoComplete="new-password"
                                        required
                                        className={`${inputClass} pl-9 pr-10`}
                                        style={{ fontSize: '0.9rem' }}
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition" tabIndex={-1}>
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && <ErrorBanner message={error} />}

                            <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg text-white transition hover:opacity-90 active:opacity-80 disabled:opacity-60" style={{ background: 'var(--color-primary)', fontSize: '0.9375rem', fontWeight: 600 }}>
                                {loading ? 'Creating account…' : 'Create Account'}
                            </button>

                            <p className="text-center text-[var(--color-text-secondary)]" style={{ fontSize: '0.875rem' }}>
                                Already have an account?{' '}
                                <button type="button" onClick={() => switchMode('login')} className="text-[var(--color-primary)] hover:underline" style={{ fontWeight: 600 }}>
                                    Sign In
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

function ErrorBanner({ message }: { message: string }) {
    return (
        <div
            className="px-3 py-2.5 rounded-lg border"
            style={{
                background: 'rgba(239,68,68,0.1)',
                borderColor: 'rgba(239,68,68,0.3)',
                color: '#f87171',
                fontSize: '0.85rem',
            }}
        >
            {message}
        </div>
    );
}
