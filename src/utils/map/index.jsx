import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxClient from '@mapbox/mapbox-sdk';
import Geocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MyLocationMap = ({ address }) => {
  const [viewport, setViewport] = useState({
    latitude: 10.7769, // Tọa độ latitude của thành phố Hồ Chí Minh
    longitude: 106.7009, // Tọa độ longitude của thành phố Hồ Chí Minh
    zoom: 8, //
  });
  const [marker, setMarker] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [popupKey, setPopupKey] = useState(0); // Key riêng biệt cho Popup

  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  mapboxgl.accessToken = mapboxAccessToken;

  useEffect(() => {
    if (address) {
      const mapboxClient = MapboxClient({ accessToken: mapboxAccessToken });
      const geocodingService = Geocoding(mapboxClient);

      geocodingService
        .forwardGeocode({
          query: address,
          limit: 1,
        })
        .send()
        .then((response) => {
          const match = response.body.features[0];
          if (match) {
            const [longitude, latitude] = match.center;
            setMarker({ longitude, latitude });
            setViewport((prevViewport) => ({
              ...prevViewport,
              latitude,
              longitude,
              zoom: 14,
            }));
            setPopupInfo({
              longitude,
              latitude,
              address: match.place_name,
            });
          }
        })
        .catch((err) => {
          console.error('Geocoding error:', err);
        });
    }
  }, [address, mapboxAccessToken]);

  const togglePopup = () => {
    // Thay đổi key của Popup khi muốn hiện/ẩn Popup
    setPopupKey((prevKey) => prevKey + 1);
    setPopupInfo(null); // Ẩn Popup
  };

  return (
    <div style={{ width: '450px', height: '450px', margin: 'auto' }}>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        mapboxAccessToken={mapboxAccessToken}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle='mapbox://styles/mapbox/streets-v11'
      >
        {marker && (
          <Marker longitude={marker.longitude} latitude={marker.latitude}>
            <FaMapMarkerAlt style={{ color: 'red', fontSize: '24px' }} />
          </Marker>
        )}
        {popupInfo && (
          <Popup
            key={popupKey}
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            anchor='top'
          >
            <div onClick={togglePopup}>{popupInfo.address}</div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MyLocationMap;
