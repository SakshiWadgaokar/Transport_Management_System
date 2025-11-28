import React, { useState, useEffect } from 'react';
import { getVehicles } from '../../services/resourceService';
import { Plus, Search, Truck, Settings } from 'lucide-react';

const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getVehicles()
            .then(data => {
                if (Array.isArray(data)) {
                    setVehicles(data);
                } else {
                    console.error('Expected array of vehicles, got:', data);
                    setVehicles([]);
                }
            })
            .catch(err => {
                console.error(err);
                setVehicles([]);
            });
    }, []);

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Vehicle Management</h1>
                    <p className="text-slate-500">Manage your transport fleet</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Vehicle
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search vehicles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {filteredVehicles.map((vehicle) => (
                        <div key={vehicle.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <Truck className="h-6 w-6 text-blue-600" />
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${vehicle.status === 'Available'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {vehicle.status}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900">{vehicle.name}</h3>
                            <p className="text-sm text-slate-500 mb-4">{vehicle.number}</p>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Type:</span>
                                    <span className="font-medium text-slate-900">{vehicle.type}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Capacity:</span>
                                    <span className="font-medium text-slate-900">{vehicle.capacity}</span>
                                </div>
                            </div>

                            <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center">
                                <Settings className="h-4 w-4 mr-2" />
                                Manage
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VehiclesPage;
