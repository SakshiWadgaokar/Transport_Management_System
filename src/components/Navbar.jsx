import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { getCurrentUser } from '../services/authService';

const Navbar = ({ toggleSidebar }) => {
    const user = getCurrentUser();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
                <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-500">{user?.email || 'Guest'}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
