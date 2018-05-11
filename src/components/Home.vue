<template>
  <v-container id="mycontainer" fluid :class="{'px-0': $vuetify.breakpoint.xsOnly }">  
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <my-map name="example"></my-map>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import MyMap from './Map.vue';

export default {
  components: {
    MyMap
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.container {
  position: relative;
  height: 100%;
}
</style>
