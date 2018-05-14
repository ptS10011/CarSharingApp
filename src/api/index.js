import axios from 'axios';

const url = 'https://test.vozilla.pl/api-client-portal/';

let api = {
    getVehicles: function (cb, model) {
        if (model !== '') {
            axios
                .get(url + "map?objectType=VEHICLE&vehicleModel=" + model)
                .then(response => cb(response.data.objects))
                .catch(e => {
                    console.log('axios error');
                });

        } else {
            axios
                .get(url + "map?objectType=VEHICLE")
                .then(response => cb(response.data.objects))
                .catch(e => {
                    console.log('axios error');
                });
        }
    },
    getParkings: function (cb) {
        axios
            .get(url + "map?objectType=PARKING")
            .then(response => cb(response.data.objects))
            .catch(e => {
                console.log('axios error');
            });
    },
    getZones: function (cb) {
        axios
            .get(`https://test.vozilla.pl/api-client-portal/map?objectType=ZONE`)
            .then(response => cb(response.data.objects))
            .catch(e => {
                console.log('axios error');
            });
    }
}

export default api; 