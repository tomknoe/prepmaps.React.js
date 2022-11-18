import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-animated-css";
import { Badge } from "react-bootstrap";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "./mapStyles";
import { getUsersFromApi } from "../services/UserServices";

const libraries = ["places"];
const center = { lat: 25.76585949266363, lng: -80.19816792343089 };

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await getUsersFromApi();
        setMarkers(response.data);
      } catch (error) {
        console.log("Can get trees");
      }
    };
    getCoordinates();
  }, []);

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    minZoom: 13,
    maxZoom: 17,
  };
  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <Animated>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onLoad={onMapLoad}
        id="PrEPMap"
      >
        {markers.map((marker) => (
          <Marker
            key={marker.uid}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={{
              url: "/map-marker.svg",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(19.5, 15),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.latitude,
              lng: selected.longitude,
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h6>{selected.name}</h6>
              <p>{selected.address}</p>
              {selected.PrEP ? (
                <Badge pill bg="primary">
                  PrEP
                </Badge>
              ) : (
                <></>
              )}{" "}
              {selected.PEP ? (
                <Badge pill bg="primary">
                  PEP
                </Badge>
              ) : (
                <></>
              )}{" "}
              {selected.testing ? (
                <Badge pill bg="primary">
                  HIV Testing
                </Badge>
              ) : (
                <></>
              )}{" "}
              {selected.insurance ? (
                <Badge pill bg="secondary">
                  Insurance Required
                </Badge>
              ) : (
                <Badge pill bg="success">
                  Insurance Not Required
                </Badge>
              )}
              <br />
              <br />
              <a href={selected.website} target="_blank">
                {selected.website}
              </a>
              <p style={{ marginTop: "7px", marginBottom: "1px" }}>{selected.phone}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </Animated>
  );
};

export default Map;
