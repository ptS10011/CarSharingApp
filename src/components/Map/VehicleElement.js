import VehicleAvailableIcon from '../../assets/icons/car_green_icon6.png';
import VehicleClusterIcon from '../../assets/icons/car_icon_cluster2.png';

class VehicleElement {
    constructor() {
        this.markers = [];
        this.markerCluster = null;
        this.VehicleAvailableIcon = VehicleAvailableIcon;
        this.VehicleClusterIcon = VehicleClusterIcon
    }

    createMarkers(vehicles, onClickCb) {
        this.markers = [];
        vehicles.forEach(vehicle => {
            this.createMarker(vehicle, onClickCb);
        });
    }

    createMarker(vehicle, onClickCb) {
        const position = new google.maps.LatLng(
            vehicle.location.latitude,
            vehicle.location.longitude
        );
        const options = {
            position: position,
            animation: google.maps.Animation.BOUNCE,
            icon: this.VehicleAvailableIcon,
        }

        const marker = new google.maps.Marker(options);

        setTimeout(function () { marker.setAnimation(null); }, 650);

        marker.addListener('click', () => {
            onClickCb(marker, vehicle)
            
        });

        this.markers.push(marker)
    }

    createMarkerClusters(map) {
        let clusterStyles = [
            {
                textColor: 'white',
                url: this.VehicleClusterIcon,
                height: 64,
                width: 64,
                textSize: 13
            },
        ];

        let mcOptions = {
            gridSize: 64,
            styles: clusterStyles,
            maxZoom: 15,
        };

        this.markerCluster = new MarkerClusterer(
            map,
            this.markers,
            mcOptions
        );
    }

    showVehicles(map) {
        this.markers.forEach(marker => {
            marker.setMap(map);
        });
        this.createMarkerClusters(map)
    }


    hideVehicles() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
        this.markerCluster.clearMarkers();
    }

}
export default VehicleElement;