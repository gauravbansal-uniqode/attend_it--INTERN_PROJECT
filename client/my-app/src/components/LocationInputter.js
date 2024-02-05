import React, { useState } from 'react';

const LocationInputter = () => {
  const [location, setLocation] = useState('');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        showPosition,
        showError
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // You can use these coordinates or call a reverse geocoding API to get a location name.

    setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
  };

  const showError = (error) => {
    alert(`Error getting location: ${error.message}`);
  };

  return (
    <div>
      <h1>Current Location Inputter</h1>
      <input
        type="text"
        value={location}
        placeholder="Current Location"
        readOnly
      />
      <button onClick={getCurrentLocation}>Get Current Location</button>
    </div>
  );
};

export default LocationInputter;