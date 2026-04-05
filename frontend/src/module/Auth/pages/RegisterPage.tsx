import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 relative overflow-hidden">
             {/* Background elements */}
             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-200/50 rounded-full blur-3xl"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-slate-200/50 rounded-full blur-3xl"></div>

            <div className="z-10 w-full px-4">
                <div className="flex justify-center mb-8">
                   <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Antigravity</h1>
                </div>
                <div className="flex justify-center">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
