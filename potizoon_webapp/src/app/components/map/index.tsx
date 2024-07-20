'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import brasil from '../../data/brasil.json';
import 'leaflet/dist/leaflet.css';
import styles from './map.module.css';
var st = require('geojson-bounds');

// Function to load feature and its bounds
function loadFeature(featureName: string, geoJsonData: any, isState: boolean): { feature: any, featureBounds: any } {
  const feature = geoJsonData.features.find((f: any) =>
    isState ? f.properties.Estado?.toLowerCase() === featureName.toLowerCase() : f.properties.name?.toLowerCase() === featureName.toLowerCase()
  );
  const featureBounds = [[st.yMax(feature), st.xMin(feature), ], [st.yMin(feature), st.xMax(feature)]];

  return { feature, featureBounds };

}

function MapEffect({ userInput, isState, setSelectedFeature, boundsRef }: { userInput: string, isState: boolean, setSelectedFeature: (feature: any) => void, boundsRef: React.MutableRefObject<any> }) {
  const map = useMap();

  useEffect(() => {
    if (userInput) {
      const { feature, featureBounds } = loadFeature(userInput, brasil, isState);
      setSelectedFeature(feature);
      boundsRef.current = featureBounds;
      if (featureBounds) {
        const bounds = featureBounds;
        map.flyToBounds(bounds);
      }
    }
  }, [userInput, isState, map, setSelectedFeature, boundsRef]);

  return null;
}

// Main Map component
const Map = ({ userInput, isState }: { userInput: string, isState: boolean }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const boundsRef = useRef(null);
  const position: [number, number] = [-15.15, -42.0];

  return (
    <MapContainer center={position} zoom={5} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEffect
        userInput={userInput}
        isState={isState}
        setSelectedFeature={setSelectedFeature}
        boundsRef={boundsRef}
      />
      {selectedFeature && <GeoJSON data={selectedFeature} style={styles} />}
    </MapContainer>
  );
};

export default Map;