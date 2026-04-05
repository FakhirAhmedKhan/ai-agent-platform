import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

const LoginForm: React.FC = () => {
    const { login, error, clearError } = useAuthContext();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) clearError();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await login(formData);
            navigate('/');
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8 rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl transition-all hover:shadow-slate-200">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 shadow-xl shadow-slate-900/20">
                    <LogIn className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">Welcome Back</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Sign in to manage your AI multi-agent tasks
                </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="relative">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                            Email Address
                        </label>
                        <div className="group relative">
                            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-900" />
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="block w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-slate-900"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                            Password
                        </label>
                        <div className="group relative">
                            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-900" />
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="block w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-slate-900"
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="flex animate-shake items-center gap-3 rounded-2xl bg-rose-50 p-4 text-sm font-medium text-rose-600 border border-rose-100">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/30 transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-95 disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <>
                            Sign in to Dashboard
                            <LogIn className="h-4 w-4" />
                        </>
                    )}
                </button>

                <p className="text-center text-sm font-medium text-slate-500">
                    New to the platform?{' '}
                    <Link to="/register" className="font-bold text-slate-900 hover:underline">
                        Create an account
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
