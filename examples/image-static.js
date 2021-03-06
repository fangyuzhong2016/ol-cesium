/**
 * @module examples.image-static
 */
const exports = {};
import OLCesium from 'olcs/OLCesium.js';
import * as olProj from 'ol/proj.js';
import olView from 'ol/View.js';
import {defaults as olControlDefaults} from 'ol/control.js';
import olSourceOSM from 'ol/source/OSM.js';
import olLayerTile from 'ol/layer/Tile.js';
import olMap from 'ol/Map.js';

import {Image as ImageLayer} from 'ol/layer.js';
import {getCenter} from 'ol/extent.js';
import Static from 'ol/source/ImageStatic.js';

const imageExtent = [-40, 50, -10, 65];

const ol2d = new olMap({
  layers: [
    new olLayerTile({
      source: new olSourceOSM()
    }),
    new ImageLayer({
      source: new Static({
        url: 'data/image-static.png',
        crossOrigin: '',
        projection: 'EPSG:4326',
        imageExtent
      })
    })
  ],
  controls: olControlDefaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  target: 'map',
  view: new olView({
    center: olProj.transform(getCenter(imageExtent), 'EPSG:4326', 'EPSG:3857'),
    zoom: 4,
    projection: 'EPSG:3857'
  })
});

const ol3d = new OLCesium({
  map: ol2d
});
const scene = ol3d.getCesiumScene();
const terrainProvider = new Cesium.CesiumTerrainProvider({
  url: '//assets.agi.com/stk-terrain/world',
  requestVertexNormals: true
});
scene.terrainProvider = terrainProvider;
ol3d.setEnabled(true);


document.getElementById('enable').addEventListener('click', () => ol3d.setEnabled(!ol3d.getEnabled()));


export default exports;
