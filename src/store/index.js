import Vue from 'vue'
import Vuex from 'vuex'
import mapFilters from './modules/mapFilters'
import mapElements from './modules/mapElements'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        mapFilters,
        mapElements
    },
    strict: debug,
})