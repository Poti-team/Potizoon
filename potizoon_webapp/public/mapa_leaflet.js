import { brasil } from './brasil.js';


//var accessToken = 'DrJxa11c2KHKAHPpARQEsp36AKbgBAHZBMkCg5M5FzWI3Ut1x182IC3udbMcOjVs';

var map = L.map('map', {
    zoomControl: false

}).setView([-15.15, -42.0], 5);

//osm layer
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//jawg layer
// var Jawg_Streets = L.tileLayer(
// 'https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=' + accessToken, {
//     attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     minZoom: 0,
//     maxZoom: 22
// }
// );

var estilo = {
    color: '#3388ff',
    weight: 0,
    fillOpacity: 0
};

var estiloSelecionado = {
    color: '#ff7800',
    weight: 2,
    fillOpacity: 0.5
};

var featureSelecionada = null;

var brasil_geojson = L.geoJSON(brasil, {
    style: estilo,
    onEachFeature: function(feature, layer) {
        layer.on({
            click: function(e) {
                if (featureSelecionada) {
                    brasil_geojson.resetStyle(featureSelecionada);
                }
                e.target.setStyle(estiloSelecionado);
                featureSelecionada = e.target;
                console.log(feature.properties.name);
            }
        });
    }
}).addTo(map);

// var baseMaps = {
//     "OSM": osm,
//     "Jawg Streets": Jawg_Streets
// };

// var overlayMaps = {
//     "Brasil": brasil_geojson
// };


// L.control.layers(baseMaps, overlayMaps).addTo(map);

