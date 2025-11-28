import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, Users, Package, Map, LogOut } from 'lucide-react';
import { logout } from '../services/authService';

const Sidebar = ({ isOpen }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/booking', icon: Package, label: 'Book Shipment' },
        { path: '/tracking', icon: Map, label: 'Track Shipment' },
        { path: '/drivers', icon: Users, label: 'Drivers' },
        { path: '/vehicles', icon: Truck, label: 'Vehicles' },
    ];

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    if (!isOpen) return null;

    return (
        <div className="w-64 bg-slate-900 text-white flex flex-col transition-all duration-300">
            <div className="h-16 flex items-center justify-center border-b border-slate-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    TMS Pro
                </h1>
            </div>

            <nav className="flex-1 py-6 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${isActive(item.path)
                                ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
