const state = {
  vehiclesFilter: true,
  parkingsFilter: true,
  zoneFilter: true,
  vehicleModelFilter: '',
  batteryFilter: 0
}

const mutations = {

  updateVehiclesFilter(state, value) {
    state.vehiclesFilter = value;
  },
  updateParkingsFilter(state, value) {
    state.parkingsFilter = value;
  },
  updateZoneFilter(state, value) {
    state.zoneFilter = value;
  },
  updateVehicleModelFilter(state, value) {
    state.vehicleModelFilter = value;
  },
  updateBatteryFilter(state, value) {
    state.batteryFilter = value;
  }
}

export default {
  state,
  mutations
}