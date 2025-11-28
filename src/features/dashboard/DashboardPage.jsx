import React from 'react';
import { getDrivers, getVehicles } from '../../services/resourceService';
import { trackShipment } from '../../services/bookingService'; // We can use a getShipments if we add it, or just mock for now
import { Package, Truck, Users, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
        </div>
    </div>
);

const DashboardPage = () => {
    const [stats, setStats] = useState({
        activeShipments: 0,
        availableDrivers: 0,
        availableVehicles: 0
    });
    const [recentShipments, setRecentShipments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const driversData = await getDrivers();
                const vehiclesData = await getVehicles();
                // For now, we'll just mock shipments fetch or add a service for it
                const shipmentsRes = await fetch('http://localhost:3000/api/bookings');
                const shipmentsData = await shipmentsRes.json();

                const drivers = Array.isArray(driversData) ? driversData : [];
                const vehicles = Array.isArray(vehiclesData) ? vehiclesData : [];
                const shipments = Array.isArray(shipmentsData) ? shipmentsData : [];

                setStats({
                    activeShipments: shipments.filter(s => s.status === 'In Transit').length,
                    availableDrivers: drivers.filter(d => d.status === 'Available').length,
                    availableVehicles: vehicles.filter(v => v.status === 'Available').length
                });
                setRecentShipments(shipments.slice(0, 5));
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500">Welcome back to TMS Pro</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Shipments"
                    value={stats.activeShipments}
                    icon={Package}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Available Drivers"
                    value={stats.availableDrivers}
                    icon={Users}
                    color="bg-green-500"
                />
                <StatCard
                    title="Available Vehicles"
                    value={stats.availableVehicles}
                    icon={Truck}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Pending Actions"
                    value="3"
                    icon={AlertCircle}
                    color="bg-amber-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Shipments</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="pb-3 text-sm font-medium text-slate-500">ID</th>
                                    <th className="pb-3 text-sm font-medium text-slate-500">Customer</th>
                                    <th className="pb-3 text-sm font-medium text-slate-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentShipments.map((shipment) => (
                                    <tr key={shipment.id}>
                                        <td className="py-3 text-sm text-slate-900">{shipment.trackingId || shipment.id}</td>
                                        <td className="py-3 text-sm text-slate-600">{shipment.customer}</td>
                                        <td className="py-3">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${shipment.status === 'In Transit'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {shipment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Driver Status (Preview)</h2>
                    <div className="space-y-4">
                        <p className="text-slate-500 text-sm">View all drivers in the Drivers page.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
