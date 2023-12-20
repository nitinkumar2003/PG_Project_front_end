import React, { useState, useCallback, memo } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api';
import { googleApiKey } from '../utilities/Constant';

const containerStyle = { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0 0 10px 0', };
const GoogleMapCom = ({ lat, lng, name }) => {
    const [map, setMap] = useState(null);
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const [directions, setDirections] = useState(null);
    const markerPosition = { lat: lat, lng: lng };
    const defaultCenter = { lat: lat, lng: lng };
    const [center, setCenter] = useState(defaultCenter);
    console.log('latlatlong',lat,lng)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleApiKey
    });

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(defaultCenter);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const onMarkerClick = () => {
        setInfoWindowOpen(true);
    };

    const onInfoWindowClose = () => {
        setInfoWindowOpen(false);
    };

    const onInfoWindowClick = () => {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: new window.google.maps.LatLng(defaultCenter.lat, defaultCenter.lng),
                destination: new window.google.maps.LatLng(markerPosition.lat, markerPosition.lng),
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error(`Directions request failed due to ${status}`);
                }
            }
        );
    };

    return (
        <div style={containerStyle}>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {/* Display directions on the map */}
                    {directions && <DirectionsRenderer directions={directions} />}

                    {/* Markers */}
                    {markerPosition && (
                        <Marker
                            position={markerPosition}
                            onClick={onMarkerClick}
                        >
                            {infoWindowOpen && (
                                <InfoWindow
                                    position={markerPosition}
                                    onCloseClick={onInfoWindowClose}
                                    onClick={onInfoWindowClick}
                                >
                                    <div>
                                        <h2>{name}</h2>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    )}
                </GoogleMap>
            ) : (
                <></>
            )}
        </div>
    );
};

export default memo(GoogleMapCom);
