import PoiIcon from '../../assets/icons/poi_icon.png';
import PoiIconCluster from '../../assets/icons/poi_icon_cluster.png';

class VehicleElement {
    constructor() {
        this.markers = [];
        this.markerCluster = null;
        this.PoiIcon = PoiIcon;
        this.PoiIconCluster = PoiIconCluster;
    }

    createMarkers(poiElements, map) {
        this.markers = [];
        poiElements.forEach(poiElement => {
            this.createMarker(poiElement, map);
        });
    }

    createMarker(poiElement, map) {
        const position = new google.maps.LatLng(
            poiElement.location.latitude,
            poiElement.location.longitude
        );
        const options = {
            position: position,
            animation: google.maps.Animation.BOUNCE,
            icon: this.PoiIcon,
        }

        const marker = new google.maps.Marker(options);

        setTimeout(function () { marker.setAnimation(null); }, 650);

        this.createInfoWindow(map, marker, poiElement)        

        this.markers.push(marker)
    }

    createInfoWindow(map, marker, poiElement) {

        var contentString = `
            <div class="map-info-window">
                <h2>${poiElement.name}</h2>
                <br>
                <p>${poiElement.description}</p>
               
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
                url: this.PoiIconCluster,
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

    showPoi(map) {
        this.markers.forEach(marker => {
            marker.setMap(map);
        });
        this.createMarkerClusters(map)
    }


    hidePoi() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
        this.markerCluster.clearMarkers();
    }

}
export default VehicleElement;