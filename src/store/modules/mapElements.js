import api from '../../api'

const state = {
    vehicles: [],
    parkings: [],
    zones: [],
    poi: []
}

const actions = {
    getAllVehicles(context) {
        api.getAllVehicles(data => {
            context.commit('updateVehicles', data)
        });
    },
    getVehiclesByModel(context, model) {
        api.getVehiclesByModel(data => {
            context.commit('updateVehicles', data)
        }, model);
    },
    getParkings(context) {
        api.getParkings(data => {
            context.commit('updateParkings', data)
        });
    },
    getZones(context) {
        api.getZones(data => {
            context.commit('updateZones', data)
        });
    },
    getPoi(context) {
        api.getPoi(data => {
            context.commit('updatePoi', data)
        });
    }
}

const mutations = {
    updateVehicles(state, data) {
        state.vehicles = data;
    },
    updateParkings(state, data) {
        state.parkings = data;
    },
    updateZones(state, data) {
        state.zones = data;
    },
    updatePoi(state, data) {
        state.poi = data;
    },
}

export default {
    state,
    actions,
    mutations
}