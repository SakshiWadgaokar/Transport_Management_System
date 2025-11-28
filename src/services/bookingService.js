const API_URL = 'http://localhost:3000/api/bookings';

export const createBooking = async (bookingData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
    });

    if (!response.ok) throw new Error('Booking failed');
    return response.json();
};

export const trackShipment = async (trackingId) => {
    const response = await fetch(`${API_URL}/track/${trackingId}`);
    if (!response.ok) throw new Error('Tracking failed');
    return response.json();
};
