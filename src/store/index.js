import Vue from 'vue'
import Vuex from 'vuex'
import mapFilters from './modules/mapFilters'
import map from './modules/map'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        mapFilters,
        map
    },
    strict: debug,
})