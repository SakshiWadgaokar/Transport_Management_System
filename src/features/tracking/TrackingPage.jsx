import React, { useState } from 'react';
import { trackShipment } from '../../services/bookingService';
import { Search, MapPin, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const TrackingPage = () => {
    const [trackingId, setTrackingId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!trackingId) return;

        setLoading(true);
        try {
            const shipment = await trackShipment(trackingId);

            // Transform API response to UI format if needed, or just use it directly
            // For now, let's mock the "updates" part since our simple DB model doesn't store history yet
            setTrackingResult({
                ...shipment,
                currentLocation: 'In Transit', // Placeholder
                eta: 'Calculating...', // Placeholder
                updates: [
                    { time: shipment.createdAt, status: 'Shipment Created', location: shipment.origin },
                    { time: '---', status: shipment.status, location: '---' }
                ]
            });
        } catch (error) {
            console.error('Tracking failed', error);
            alert('Tracking ID not found');
            setTrackingResult(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Track Your Shipment</h1>
                <p className="text-slate-500">Enter your tracking ID to see real-time updates</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <form onSubmit={handleTrack} className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            placeholder="Enter Tracking ID (e.g. SH-1001)"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                        {loading ? 'Tracking...' : 'Track'}
                    </button>
                </form>
            </div>

            {trackingResult && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="bg-blue-600 p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-blue-100 text-sm">Shipment ID</p>
                                <h2 className="text-2xl font-bold">{trackingResult.id}</h2>
                            </div>
                            <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                {trackingResult.status}
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between text-sm">
                            <div>
                                <p className="text-blue-200">Estimated Delivery</p>
                                <p className="font-semibold">{trackingResult.eta}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-blue-200">Current Location</p>
                                <p className="font-semibold">{trackingResult.currentLocation}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-8 relative">
                            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-200 -z-10"></div>
                            <div className="flex flex-col items-center bg-white px-2">
                                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white mb-2">
                                    <Package className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-medium text-slate-600">Picked Up</span>
                            </div>
                            <div className="flex flex-col items-center bg-white px-2">
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white mb-2">
                                    <Truck className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-medium text-slate-600">In Transit</span>
                            </div>
                            <div className="flex flex-col items-center bg-white px-2">
                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-2">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-medium text-slate-400">Delivered</span>
                            </div>
                        </div>

                        <h3 className="font-bold text-slate-900 mb-4">Shipment Updates</h3>
                        <div className="space-y-6 relative border-l-2 border-slate-100 ml-3 pl-6">
                            {trackingResult.updates.map((update, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-sm"></div>
                                    <p className="text-sm font-bold text-slate-900">{update.status}</p>
                                    <p className="text-sm text-slate-500">{update.location}</p>
                                    <p className="text-xs text-slate-400 mt-1">{update.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackingPage;
