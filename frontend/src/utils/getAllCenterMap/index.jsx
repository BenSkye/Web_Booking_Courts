import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxClient from '@mapbox/mapbox-sdk';
import Geocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { formatPrice } from '../priceFormatter';
import { FaMapMarkerAlt } from 'react-icons/fa';

const GetAllLocationCenter = ({ locations }) => {
  const [viewport, setViewport] = useState({
    latitude: 10.7769, // Tọa độ latitude của thành phố Hồ Chí Minh
    longitude: 106.7009, // Tọa độ longitude của thành phố Hồ Chí Minh
    zoom: 10, //
  });
  const [markers, setMarkers] = useState([]);

  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  mapboxgl.accessToken = mapboxAccessToken;

  useEffect(() => {
    const mapboxClient = MapboxClient({ accessToken: mapboxAccessToken });
    const geocodingService = Geocoding(mapboxClient);

    // Xử lý tất cả các địa điểm
    Promise.all(
      locations.map((location) => {
        return geocodingService
          .forwardGeocode({
            query: location?.location,
            limit: 1,
          })
          .send()
          .then((response) => {
            const match = response.body.features[0];
            if (match) {
              const [longitude, latitude] = match.center;
              return {
                id: location.id,
                longitude,
                latitude,
                address: match.location,
                // name: location.nameCenter, 
                name: location.centerName,
                price: location.pricePerHour.price,
              };
            }
          })
          .catch((err) => {
            console.error('Geocoding error:', err);
          });
      })
    ).then((markers) => {
      setMarkers(markers.filter((marker) => marker !== undefined));
    });
  }, [locations, mapboxAccessToken]);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        mapboxAccessToken={mapboxAccessToken}
        onViewportChange={(viewport) => setViewport(viewport)}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        style={{ borderRadius: '0.5rem' }}
      >
        <div style={{ position: 'absolute', right: 30, top: 30 }}>
          <NavigationControl />
        </div>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.longitude}
            latitude={marker.latitude}
          >
            <div
              style={{
                position: 'relative',
                width: 'max-content',
                padding: '4px',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                zIndex: '1',
              }}
            >
              <FaMapMarkerAlt
                style={{
                  color: 'red',
                  fontSize: '20px',
                  position: 'absolute',
                  top: '-24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
              <Link to={`/detail/${marker.id}`}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                  }}
                >
                  {marker.name}
                </div>
              </Link>
              <div style={{ fontSize: '10px' }}>
                {formatPrice(marker.price)}đ/giờ
              </div>
            </div>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default GetAllLocationCenter;
