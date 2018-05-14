<template>
<div>
  <div class="google-map" :id="mapName">
  </div>
  <v-bottom-sheet inset :max-width="car.width">
      <v-btn slot="activator" color="red" dark ref="infoWindowActivator" style="display:none"></v-btn>
      <v-card tile>
        <v-card-media
          :src="car.url"
          :height="car.height"
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
          <v-flex xs6 px-3 mb-3>
            <v-btn color="indigo" darken-4 large dark block round @click="bookCar">Rezerwuj</v-btn>
          </v-flex>
          <v-flex xs6 px-3  mb-3>
            <v-btn  color="green" darken-4 large dark block round @click="rentCar">Wypożycz</v-btn>
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
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios';
import api from '../api';

import icon_car_available_full from '../assets/icons/car48_green_full.png';
import icon_car_available_average from '../assets/icons/car48_green_average.png';
import icon_car_available_low from '../assets/icons/car48_green_low.png';
import icon_parking from '../assets/icons/parking_icon3.png';
import store from '../store';

export default {
  name: 'google-map',
  props: ['name'],
  data: function() {
    return {
      snackbar: false,
      snackbarText: '',
      mapName: this.name + '-map',
      vehicles: [],
      parkings: [],
      zone: [],
      map: null,
      icons: {
        icon_car_available_full,
        icon_car_available_average,
        icon_car_available_low,
        icon_parking
      },

      sheet: false,
      car: {
        name: '',
        url:
          'https://api-client-portal.vozilla.pl//attachments//d5619a4f-48e9-4eb0-a93e-2ca788b47c2c',
        height: '100px',
        width: '100%',
        range: '100km'
      },
      pictureUrls: {
        '300c43e9-815f-4839-a2a7-3f60e23b7af3':
          'd5619a4f-48e9-4eb0-a93e-2ca788b47c2c',
        'e7ace1de-ab7f-4120-922d-23441a041bd9':
          '5d2d409c-e25e-4d27-a8ee-bd6ec6586290'
      },
      mapElements: {
        vehicles: [],
        parkings: [],
        zones: []
      }
    };
  },
  computed: {
    vehiclesFilter: () => store.state.mapFilters.vehiclesFilter,
    parkingsFilter: () => store.state.mapFilters.parkingsFilter,
    zoneFilter: () => store.state.mapFilters.zoneFilter,
    vehicleModelFilter: () => store.state.mapFilters.vehicleModelFilter,
    batteryFilter: () => store.state.mapFilters.batteryFilter
  },
  watch: {
    vehiclesFilter: function() {
      let map = this.vehiclesFilter ? this.map : null;
      this.setVehicleMarkers(map);
    },
    parkingsFilter: function() {
      let map = this.parkingsFilter ? this.map : null;
      this.mapElements.parkings.forEach(parkingMarker =>
        parkingMarker.setMap(map)
      );
    },
    zoneFilter: function() {
      let map = this.zoneFilter ? this.map : null;
      this.mapElements.zones.forEach(zone => zone.setMap(map));
    },
    vehicleModelFilter: function() {
      this.setVehicleMarkers(null);
      api.getVehicles(data => {
        this.vehicles = data;
        this.createVehicleMarkers();
      }, this.vehicleModelFilter);
    }
  },
  mounted: function() {
    this.initMap();
    this.fetchData();
  },
  methods: {
    initMap: function() {
      const element = document.getElementById(this.mapName);
      const options = {
        zoom: 12,
        center: new google.maps.LatLng(51.1078852, 17.0385376)
      };
      this.map = new google.maps.Map(element, options);
    },
    fetchData: function() {
      api.getVehicles(data => {
        this.vehicles = data;
        this.createVehicleMarkers();
      }, this.vehicleModelFilter);

      api.getParkings(data => {
        this.parkings = data;
        this.createMarkersParkings();
      });

      api.getZones(data => {
        this.zone = data;
        this.createZones();
      });
    },
    createVehicleMarkers: function() {
      this.vehicles.forEach(vehicle => {
        const position = new google.maps.LatLng(
          vehicle.location.latitude,
          vehicle.location.longitude
        );
        let icon = this.icons.icon_car_available_full;
        if (vehicle.batteryLevelPct < 70) {
          icon = this.icons.icon_car_available_average;
        }
        if (vehicle.batteryLevelPct < 40) {
          icon = this.icons.icon_car_available_low;
        }

        const marker = new google.maps.Marker({
          position: position,
          animation: google.maps.Animation.DROP,
          icon: icon,
          map: this.map
        });
        marker.addListener('click', () => {
          this.centerMarker(
            marker.getPosition().lat(),
            marker.getPosition().lng()
          );

          this.$refs.infoWindowActivator.$el.click();
          let vehicleId = this.pictureUrls[vehicle.picture.id];
          this.car.url =
            'https:/api-client-portal.vozilla.pl//attachments/' + vehicleId;
          this.car.name = vehicle.name;
          this.car.range = vehicle.rangeKm;
          if (window.innerWidth > 500) {
            this.car.width = '500px';
            this.car.height = '300px';
          } else {
            this.car.width = '100%';
            this.car.height = '200px';
          }
        });

        this.mapElements.vehicles.push(marker);
      });
      this.setVehicleMarkers(this.map);
    },

    createMarkersParkings: function() {
      this.parkings.forEach(parking => {
        const position = new google.maps.LatLng(
          parking.location.latitude,
          parking.location.longitude
        );
        const marker = new google.maps.Marker({
          position: position,
          animation: google.maps.Animation.DROP,
          icon: this.icons.icon_parking,
          map: this.map
        });
        this.mapElements.parkings.push(marker);
      });
    },

    createZones: function() {
      for (let i = 0; i < this.zone.length; i++) {
        let allowedAreasForZone = this.zone[i].allowedAreas;
        for (let j = 0; j < allowedAreasForZone.length; j++) {
          this.createZonePath(allowedAreasForZone[j].points);
        }
      }
    },
    createZonePath: function(points) {
      let myPoints = points;
      let pointsForPath = [];
      for (let i = 0; i < myPoints.length; i++) {
        let newPoint = {
          lat: myPoints[i].latitude,
          lng: myPoints[i].longitude
        };

        pointsForPath.push(newPoint);
      }

      let myPath = new google.maps.Polygon({
        paths: pointsForPath,
        strokeColor: '#00FF00',
        strokeOpacity: 0.7,
        strokeWeight: 2,
        fillColor: '#00FF00',
        fillOpacity: 0.05
      });
      myPath.setMap(this.map);
      this.mapElements.zones.push(myPath);
    },
    setVehicleMarkers(map) {
      this.mapElements.vehicles.forEach(vehicleMarker => {
        vehicleMarker.setMap(map);
      });
      // TODO: grupowanie/rozgrupowywanie elementow nam mapie
      // this.vehicleMarkerCluster = new MarkerClusterer(
      //   this.map,
      //   this.mapElements.vehicles,
      //   {
      //     imagePath:
      //       'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      //   }
      // );
    },
    centerMarker: function(latitude, longitude) {
      this.map.setZoom(18);
      let latLng = new google.maps.LatLng(latitude - 0.0007, longitude); //Makes a latlng
      this.map.panTo(latLng);
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
  background: gray;
}
.infoWindowBtn {
  margin-bottom: 20px;
}

.bottom-sheet--inset .card {
  border-radius: 15px 15px 0 0;
}
</style>