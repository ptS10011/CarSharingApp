const state = {
    map: null
}

const getters = {
}

const actions = {
    initMap({ state, commit }, element) {
        const options = {
            zoom: 10,
            center: new google.maps.LatLng(51.1078852, 17.0385376)
        };
        const map = new google.maps.Map(element, options);

        commit('setMapInstance', map);
    }
}

const mutations = {

    setMapInstance(state, map) {
        state.map = map;
        console.log(map);

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}