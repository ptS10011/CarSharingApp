import ParkingIcon from '../../assets/icons/parking_icon.png';
import ParkingIconCluster from '../../assets/icons/parking_icon_cluster.png';

class ParkingElement {
    constructor() {
        this.markers = [];
        this.markerCluster = null;
        this.parkingIcon = ParkingIcon;
        this.parkingIconCluster = ParkingIconCluster;
    }

    createMarkers(parkings, map) {
        this.markers = [];
        parkings.forEach(parking => {
            this.createMarker(parking, map);
        });
    }

    createMarker(parking, map) {
        const position = new google.maps.LatLng(
            parking.location.latitude,
            parking.location.longitude
        );
        const options = {
            position: position,
            animation: google.maps.Animation.BOUNCE,
            icon: this.parkingIcon,
        }

        const marker = new google.maps.Marker(options);

        setTimeout(function () { marker.setAnimation(null); }, 650);

        this.createInfoWindow(map, marker, parking)

        this.markers.push(marker)
    }

    createInfoWindow(map, marker, parking) {

        var contentString = `
            <div class="map-info-window">
                <h2>${parking.name}</h2>
                <p>${parking.description}</p>
                <p>
                Liczba miejsc:  <b>${parking.spacesCount}</b>
                </p>
                <p>
                Liczba wolnych miejsc:  <b>${parking.availableSpacesCount}</b>
                </p>
                
            </div>
        `

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

    }

    createMarkerClusters(map) {
        let clusterStyles = [
            {
                textColor: 'white',
                url: this.parkingIconCluster,
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

    showParkings(map) {
        this.markers.forEach(marker => {
            marker.setMap(map);
        });
        this.createMarkerClusters(map)
    }


    hideParkings() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
        this.markerCluster.clearMarkers();
    }

}
export default ParkingElement;