"use client";
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader"; 

function Map({ address }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyBpqmbiDe38y1FcoTPa20U2B2pVjlopqTk", //
      version: "weekly",
    });

    loader.load().then(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const map = new window.google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 12,
          });
          const marker = new window.google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  }, [address]);

  return <div style={{ height: "600px" }} ref={mapRef} />;
}

export default Map;
