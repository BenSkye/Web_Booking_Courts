import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = '';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MyLocationMap = ({ address }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (address) {
      geocodeAddress(address);
    }
  }, [address]);

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      console.log('Geocoding response:', data); // Debugging: log the response
      if (data.status !== 'OK') {
        setError(`Geocoding API error: ${data.status}`);
        return;
      }
      if (data.results && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ lat, lng });
        setError(null);
      } else {
        setError('Geocoding API returned no results.');
      }
    } catch (err) {
      console.error('Error fetching geocoding data:', err);
      setError('Failed to fetch geocoding data.');
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      {location ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={15}
        >
          <Marker position={location} />
        </GoogleMap>
      ) : (
        <div>Loading map...</div>
      )}
      {address && <p>Address: {address}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </LoadScript>
  );
};

export default MyLocationMap;
