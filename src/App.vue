<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <navigation-component></navigation-component>

    </v-navigation-drawer>

    <v-toolbar
      app
      color="teal darken-4" 
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title" style="width: 150px"></v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon 
             @click.stop="rightDrawer = !rightDrawer"
             v-if='title=="Mapa"'>
        <v-icon>fas fa-sliders-h</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>

    <v-navigation-drawer
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
     <filters-component></filters-component>   
    </v-navigation-drawer>

  </v-app>
</template>

<script>
import store from './store';
import NavigationComponent from './components/NavigationComponent.vue';
import FiltersComponent from './components/FiltersComponent.vue';

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'bubble_chart',
          title: 'Inspire'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Mapa'
    };
  },

  name: 'App',
  methods: {
    redirectPage: function(pageName, pageTitle) {
      this.$router.push({ name: pageName });
      this.title = pageTitle;
    }
  },
  components: {
    FiltersComponent,
    NavigationComponent
  }
};
</script>

<style>
.map-info-window {
  padding: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
