import React, { useState, useEffect } from 'react';
import { getDrivers, getVehicles } from '../../services/resourceService';
import { createBooking } from '../../services/bookingService';
import { Package, MapPin, Calendar, Truck, User, CheckCircle } from 'lucide-react';

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    customer: '',
    origin: '',
    destination: '',
    date: '',
    weight: '',
    vehicleId: '',
    driverId: ''
  });
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  useEffect(() => {
    getDrivers().then(setDrivers).catch(console.error);
    getVehicles().then(setVehicles).catch(console.error);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createBooking(bookingData);
      setTrackingId(result.trackingId);
      setSuccess(true);
    } catch (error) {
      console.error('Booking failed', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-500 mb-6">
            Shipment has been successfully booked. A confirmation email has been sent to the customer.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg text-left mb-6">
            <p className="text-sm text-slate-500 mb-1">Tracking ID</p>
            <p className="text-lg font-mono font-bold text-slate-900">{trackingId}</p>
          </div>
          <button
            onClick={() => { setSuccess(false); setStep(1); setBookingData({ customer: '', origin: '', destination: '', date: '', weight: '', vehicleId: '', driverId: '' }); }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Another Shipment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Book New Shipment</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button
            className={`flex-1 py-4 text-sm font-medium text-center ${step === 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}
            onClick={() => setStep(1)}
          >
            1. Shipment Details
          </button>
          <button
            className={`flex-1 py-4 text-sm font-medium text-center ${step === 2 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}
            onClick={() => setStep(2)}
            disabled={!bookingData.origin || !bookingData.destination}
          >
            2. Route & Load
          </button>
          <button
            className={`flex-1 py-4 text-sm font-medium text-center ${step === 3 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}
            onClick={() => setStep(3)}
            disabled={!bookingData.vehicleId}
          >
            3. Resource Assignment
          </button>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Customer Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      name="customer"
                      value={bookingData.customer}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter customer name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Origin</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      name="origin"
                      value={bookingData.origin}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, State"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      name="destination"
                      value={bookingData.destination}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, State"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Load Weight (kg)</label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      name="weight"
                      value={bookingData.weight}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 5000"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next: Route Planning
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Route Optimization Analysis</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-slate-600">{bookingData.origin}</span>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 px-2 text-xs text-slate-500">
                      ~450 km
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm text-slate-600">{bookingData.destination}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-slate-500">Est. Distance</p>
                    <p className="font-bold text-slate-900">452 km</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-slate-500">Est. Time</p>
                    <p className="font-bold text-slate-900">5h 30m</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-slate-500">Est. Cost</p>
                    <p className="font-bold text-slate-900">$850</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4">Select Vehicle Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Truck', 'Van', 'Trailer'].map((type) => (
                    <div
                      key={type}
                      className={`border rounded-xl p-4 cursor-pointer transition-all ${bookingData.vehicleType === type
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                        : 'border-slate-200 hover:border-blue-300'
                        }`}
                      onClick={() => setBookingData(prev => ({ ...prev, vehicleType: type }))}
                    >
                      <Truck className={`h-8 w-8 mb-2 ${bookingData.vehicleType === type ? 'text-blue-600' : 'text-slate-400'}`} />
                      <p className="font-medium text-slate-900">{type}</p>
                      <p className="text-xs text-slate-500">Capacity: 2000kg+</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next: Assign Resources
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Assign Vehicle</label>
                <select
                  name="vehicleId"
                  value={bookingData.vehicleId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.filter(v => v.status === 'Available').map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.number}) - {v.capacity}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Assign Driver</label>
                <select
                  name="driverId"
                  value={bookingData.driverId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a driver</option>
                  {drivers.filter(d => d.status === 'Available').map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.license})</option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-900">Booking Summary</h4>
                  <p className="text-xs text-blue-700 mt-1">
                    {bookingData.origin} to {bookingData.destination} • {bookingData.weight}kg
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !bookingData.vehicleId || !bookingData.driverId}
                  className={`px-6 py-2 rounded-lg text-white font-semibold transition-all ${loading || !bookingData.vehicleId || !bookingData.driverId
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
                    }`}
                >
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
