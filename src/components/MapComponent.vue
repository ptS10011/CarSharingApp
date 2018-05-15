<template>
    <div>
      <div class="google-map" :id="mapName"></div>

      <v-bottom-sheet inset max-width="400px">
          <v-btn slot="activator" color="red" dark ref="infoWindowActivator" style="display:none"></v-btn>
          <v-card tile>
            <v-card-media
              :src="car.url"
              height="150px"
              contain
            >
            </v-card-media>

          <v-card-title primary-title>
            <div>
              <div class="headline">{{ car.name }}</div>
              <span class="grey--text">Zasięg: {{ car.range}} km</span>
            </div>
          </v-card-title>

            <v-layout row wrap>
              <v-flex xs12 class="pb-3">
                <v-divider></v-divider>
              </v-flex>

              <v-flex xs4 class="pl-4 info-window-element">
                <h5 class="mb-0 grey--text">NUMER BOCZNY</h5>
                <div>{{car.sideNumber}}</div>

              </v-flex>
              <v-flex xs4 class="pl-4 info-window-element">
                <h5 class="mb-0 grey--text">KOLOR</h5>
                <div>{{car.color}}</div>
              </v-flex>
              <v-flex xs4 class="pl-2 info-window-element">
                <h5 class="mb-0 grey--text">REJESTRACJA</h5>
                <div>{{car.platesNumber}}</div>
              </v-flex>

              <v-flex xs12 class="pt-3 pb-3">
                <v-divider></v-divider>
              </v-flex>


              <v-flex xs6 px-3 mb-3>
                <v-btn color="blue darken-3" large dark block  round @click="bookCar">Rezerwuj</v-btn>
              </v-flex>
              <v-flex xs6 px-3  mb-3>
                <v-btn  color="green darken-3"  large dark block round @click="rentCar">Wypożycz</v-btn>
              </v-flex>
            </v-layout>
              
          </v-card>
        </v-bottom-sheet>
        <v-snackbar
          :timeout="3000"
          :bottom="true"
          :right="true"
          v-model="snackbar"
        >
          {{ snackbarText}}
          <v-btn flat color="white" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import axios from 'axios';
import api from '../api';

import VehicleElement from './Map/VehicleElement';
import ParkingElement from './Map/ParkingElement';
import ZoneElement from './Map/ZoneElement';
import PoiElement from './Map/PoiElement';
import MapManager from './Map/MapManager';

import store from '../store';

export default {
  name: 'google-map',
  props: ['name'],
  data: function() {
    return {
      mapName: this.name + '-map',
      mapManager: null,
      mapElements: {
        parkings: null,
        vehicles: null,
        zones: null,
        poi: null
      },
      snackbarText: '',
      snackbar: false,
      car: {
        name: '',
        range: '',
        color: '',
        sideNumber: '',
        platesNumber: '',
        url:
          'https://api-client-portal.vozilla.pl//attachments/d5619a4f-48e9-4eb0-a93e-2ca788b47c2c'
      }
    };
  },
  computed: {
    vehicles: () => store.state.mapElements.vehicles,
    parkings: () => store.state.mapElements.parkings,
    zones: () => store.state.mapElements.zones,
    poi: () => store.state.mapElements.poi,
    vehiclesFilter: () => store.state.mapFilters.vehiclesFilter,
    parkingsFilter: () => store.state.mapFilters.parkingsFilter,
    zoneFilter: () => store.state.mapFilters.zoneFilter,
    poiFilter: () => store.state.mapFilters.poiFilter,
    vehicleModelFilter: () => store.state.mapFilters.vehicleModelFilter
  },
  watch: {
    vehicles: function() {
      const map = this.mapManager.getMap();
      this.mapElements.vehicles.createMarkers(
        this.vehicles,
        this.openVehicleInfo
      );
      this.mapElements.vehicles.showVehicles(map);
    },
    parkings: function() {
      const map = this.mapManager.getMap();
      this.mapElements.parkings.createMarkers(this.parkings, map);
      this.mapElements.parkings.showParkings(map);
    },
    zones: function() {
      this.mapElements.zones.createZones(this.zones, this.mapManager.getMap());
    },
    poi: function() {
      const map = this.mapManager.getMap();
      this.mapElements.poi.createMarkers(this.poi, map);
      this.mapElements.poi.showPoi(map);
    },
    vehiclesFilter: function() {
      if (this.vehiclesFilter) {
        this.mapElements.vehicles.showVehicles(this.mapManager.getMap());
      } else {
        this.mapElements.vehicles.hideVehicles();
      }
    },
    parkingsFilter: function() {
      if (this.parkingsFilter) {
        this.mapElements.parkings.showParkings(this.mapManager.getMap());
      } else {
        this.mapElements.parkings.hideParkings();
      }
    },
    zoneFilter: function() {
      if (this.zoneFilter) {
        this.mapElements.zones.showZones(this.mapManager.getMap());
      } else {
        this.mapElements.zones.hideZones();
      }
    },
    poiFilter: function() {
      if (this.poiFilter) {
        this.mapElements.poi.showPoi(this.mapManager.getMap());
      } else {
        this.mapElements.poi.hidePoi();
      }
    },
    vehicleModelFilter: function() {
      this.mapElements.vehicles.hideVehicles();
      store.dispatch('getVehiclesByModel', this.vehicleModelFilter);
    }
  },
  mounted: function() {
    this.mapManager = new MapManager();
    this.mapElements.vehicles = new VehicleElement();
    this.mapElements.parkings = new ParkingElement();
    this.mapElements.zones = new ZoneElement();
    this.mapElements.poi = new PoiElement();
    this.mapManager.initMap(document.getElementById(this.mapName));
  },
  methods: {
    openVehicleInfo: function(marker, vehicle) {
      this.centerMarker(marker.getPosition().lat(), marker.getPosition().lng());
      this.$refs.infoWindowActivator.$el.click();
      this.car.name = vehicle.name;
      this.car.range = vehicle.rangeKm;
      this.car.color = vehicle.color;
      console.log(vehicle.color);

      this.car.sideNumber = vehicle.sideNumber;
      this.car.platesNumber = vehicle.platesNumber;
    },
    centerMarker: function(latitude, longitude) {
      this.mapManager.getMap().setZoom(16);
      let latLng = new google.maps.LatLng(latitude - 0.002, longitude); //Makes a latlng
      this.mapManager.getMap().panTo(latLng);
    },
    bookCar: function() {
      this.snackbarText = 'Zarezerwowano pojazd';
      this.snackbar = true;
    },
    rentCar: function() {
      this.snackbarText = 'Wypożyczono pojazd';
      this.snackbar = true;
    }
  }
};
</script>

<style scoped>
.google-map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bottom-sheet--inset .card {
  border-radius: 15px 15px 0 0;
}

.info-window-element {
  text-transform: uppercase;
}
</style>