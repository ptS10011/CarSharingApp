class ZoneElement {
    constructor() {
        this.zones = [];
    }

    createZones(zone, map) {
        for (let i = 0; i < zone.length; i++) {
            let allowedAreasForZone = zone[i].allowedAreas;
            for (let j = 0; j < allowedAreasForZone.length; j++) {
                this.createZonePath(allowedAreasForZone[j].points, map);
            }
        }
    }

    createZonePath(points, map) {
        let myPoints = points;
        let pointsForPath = [];
        for (let i = 0; i < myPoints.length; i++) {
            let newPoint = {
                lat: myPoints[i].latitude,
                lng: myPoints[i].longitude
            };

            pointsForPath.push(newPoint);
        }

        let path = new google.maps.Polyline({
            path: pointsForPath,
            geodesic: true,
            strokeColor: '#D84315',
            strokeOpacity: 0.9,
            strokeWeight: 1.7
        });

        path.setMap(map);

        this.zones.push(path);
    }

    showZones(map) {
        this.zones.forEach(zone => {
            zone.setMap(map);
        });
    }

    hideZones() {
        this.zones.forEach(zone => {
            zone.setMap(null);
        });
    }


}
export default ZoneElement;