'use client';
import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import brasil from '../../data/brasil.json' 

import styles from './map.module.css';

// after figuring out which feature to load, do this (geoJsonData is a json file)
function loadFeature(featureName: string, geoJsonData: any) {
    const feature = geoJsonData.features.find((f: any) => f.properties.name.toLowerCase() === featureName.toLowerCase());
    return feature || null;
}


//Map component itself
//It has as param a userInput. So, when the userInput is not empty, it will load the feature
const Map = ({userInput}: {userInput: string}) => {

  const [selectedFeature, setSelectedFeature] = useState(null); // react hook for tracking state of something

  const position: [number, number] = [-15.15, -42.0]; // center of the map or starting position

  const handleLoadFeature = (featureName: string) => {
    const feature = loadFeature(featureName, brasil);
    setSelectedFeature(feature); //tells browser what is the current feature
  };

  return(
  <MapContainer center={position} zoom={5} style={{height: '100%'}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

      {/*It's only loading a individual feature*/}
     {selectedFeature && <GeoJSON data={selectedFeature} style={styles}/>}
  </MapContainer>
)}

export default Map;