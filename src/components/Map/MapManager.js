import store from '../../store';

class MapManager {
    constructor() {
        this.map = null;
    }

    initMap(element) {
        //default options
        const options = {
            zoom: 12,
            center: new google.maps.LatLng(51.1078852, 17.0385376)
        };
        this.map = new google.maps.Map(element, options);

        this.loadMapElements();
    }

    loadMapElements() {
        store.dispatch('getAllVehicles');
        store.dispatch('getParkings');
        store.dispatch('getZones');
        store.dispatch('getPoi');
    }

    getMap() {
        return this.map;
    }
}
export default MapManager;