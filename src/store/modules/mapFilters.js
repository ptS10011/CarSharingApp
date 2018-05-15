const state = {
  vehiclesFilter: true,
  parkingsFilter: true,
  zoneFilter: true,
  poiFilter: true,
  vehicleModelFilter: '',
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
  updatePoiFilter(state, value) {
    state.poiFilter = value;
  },
  updateVehicleModelFilter(state, value) {
    state.vehicleModelFilter = value;
  }
}

export default {
  state,
  mutations
}