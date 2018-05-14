<template>
      <v-list>
        <v-list-tile >
          <!-- <v-list-tile-action @click.stop="rightDrawer = !rightDrawer">
            <v-btn flat icon>
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action> -->
          <v-list-tile-title class="title">Filtruj Obiekty</v-list-tile-title>
        </v-list-tile>
        <v-divider class="mt-2"></v-divider>        
        <v-list-tile class="mt-3">
            <v-checkbox
              v-model="showZone"
              label="Strefa dozwolona"
              color="indigo"
              hide-details
              right
            ></v-checkbox>
        </v-list-tile>-
        <v-list-tile class="mt-2">
            <v-checkbox
              v-model="showVehicles"
              label="Pojazdy"
              color="green"
              hide-details
            ></v-checkbox>
            <v-select
              :items="vehicleModels"
              v-model="selectedVehicleModel"
              label="Model pojazdu"
              single-line
              v-if="showVehicles"
            ></v-select>
        </v-list-tile>
        <v-list-tile class="mt-2">
            <v-checkbox
              v-model="showParkings"
              label="Parkingi"
              color="blue"
              hide-details
            ></v-checkbox>
        </v-list-tile>
        <v-list-tile class="mt-2" v-if="false">
          
          <v-subheader>Min. poziom baterii</v-subheader>
            <v-select
              :items="batteryLevels"
              v-model="batteryLvl"
              label="Min. poziom baterii"
              single-line
              v-if="showVehicles"
            ></v-select>
        </v-list-tile>
      </v-list>
</template>

<script>
export default {
  data() {
    return {
      vehicleModels: [
        {
          text: 'Wszystkie',
          value: ''
        },
        {
          text: 'NISSAN e-NV200',
          value: '351564a6-50b4-4d03-ac3d-7eade9beb4a9'
        },
        {
          text: 'NISSAN Leaf',
          value: 'a8d1ddbb-4201-4a64-813b-779e3d58e54e'
        },

        {
          text: 'Enigma Python Car',
          value: '00000000-0000-0000-0000-000000000000'
        },

        {
          text: 'Nissan Old Leaf',
          value: '00000000-0000-0000-0000-000000000002'
        }
      ],
      batteryLevels: [
        {
          text: '0%',
          value: 0
        },
        {
          text: '25%',
          value: 25
        },
        {
          text: '50%',
          value: 50
        },
        {
          text: '75%',
          value: 75
        },
        {
          text: '90%',
          value: 90
        },
        {
          text: '100%',
          value: 100
        }
      ]
    };
  },

  computed: {
    batteryLvlText: function() {
      return 'Min. Bateria ' + this.batteryLvl + '%';
    },
    showVehicles: {
      get() {
        return this.$store.state.mapFilters.vehiclesFilter;
      },
      set(value) {
        this.$store.commit('updateVehiclesFilter', value);
      }
    },
    showParkings: {
      get() {
        return this.$store.state.mapFilters.parkingsFilter;
      },
      set(value) {
        this.$store.commit('updateParkingsFilter', value);
      }
    },
    showZone: {
      get() {
        return this.$store.state.mapFilters.zoneFilter;
      },
      set(value) {
        this.$store.commit('updateZoneFilter', value);
      }
    },
    selectedVehicleModel: {
      get() {
        return this.$store.state.mapFilters.vehicleModelFilter;
      },
      set(value) {
        this.$store.commit('updateVehicleModelFilter', value);
      }
    },
    batteryLvl: {
      // TODO: filtrowanie po poziomie baterii
      get() {
        return this.$store.state.mapFilters.batteryFilter;
      },
      set(value) {
        this.$store.commit('updateBatteryFilter', value);
      }
    }
  }
};
</script>
