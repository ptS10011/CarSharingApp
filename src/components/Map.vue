<template>
  <div class="google-map" :id="mapName">
  </div>
</template>

<script>
export default {
  name: 'google-map',
  props: ['name'],
  data: function() {
    return {
      wroclawCords: {
        latitude: 51.1078852,
        longitude: 17.0385376
      },
      mapName: this.name + '-map',
      markerCoordinates: [
        {
          latitude: 51.501527,
          longitude: -0.1921837
        },
        {
          latitude: 51.505874,
          longitude: -0.1838486
        },
        {
          latitude: 51.4998973,
          longitude: -0.202432
        }
      ]
    };
  },
  mounted: function() {
    const element = document.getElementById(this.mapName);
    const options = {
      zoom: 10,
      center: new google.maps.LatLng(
        this.wroclawCords.latitude,
        this.wroclawCords.longitude
      )
    };
    const map = new google.maps.Map(element, options);

    this.markerCoordinates.forEach(coord => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({
        position,
        map
      });
    });
  },
  methods:
};
</script>

<style scoped>
.google-map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: gray;
}
</style>