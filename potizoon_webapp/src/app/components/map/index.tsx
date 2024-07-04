'use client';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'

var estilo = {
    color: '#3388ff',
    weight: 0,
    fillOpacity: 0
};

const position: [number, number] = [-15.15, -42.0];
const Map = ({geoJsonData}) => (
  <MapContainer center={position} zoom={5} style={{ height: '100%', width: '100%' }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <GeoJSON data={geoJsonData} style={estilo}/>
  </MapContainer>
)

export default Map;