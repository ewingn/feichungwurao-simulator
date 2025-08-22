import React from 'react';
import { Outlet, NavLink as RouterNavLink } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import Footer from '../components/Footer';

// Custom NavLink to apply active styles
const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    return (
        <RouterNavLink
            to={to}
            className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                        ? 'bg-white bg-opacity-10 text-white'
                        : 'text-indigo-100 hover:bg-white hover:bg-opacity-10' // <-- FIX: Changed '-' to ':' here
                }`
            }
        >
            {children}
        </RouterNavLink>
    );
};

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 font-sans">
            <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 shadow-lg sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2">
                        <HeartPulse size={28} className="text-pink-300" />
                        <h1 className="text-xl font-bold tracking-tight hidden sm:block">
                            Fei Cheng Wu Rao Sim
                        </h1>
                    </a>
                    <nav className="flex items-center gap-2">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/simulator">Simulator</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto py-8 sm:py-12 px-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;