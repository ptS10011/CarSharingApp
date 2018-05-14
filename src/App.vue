<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content class="title"></v-list-tile-content>
          <v-list-tile-action @click.stop="drawer = !drawer">
            <v-btn flat icon>
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile class="mt-3" @click='redirectPage("MapPage", "Mapa")'>
          <v-list-tile-action>
            <v-icon>map</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mapa</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click='redirectPage("CustomPage", "Custom Page")'>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Custom Page</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      :clipped-left="clipped"
      color="indigo" 
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title" ></v-toolbar-title>
      <v-spacer></v-spacer>
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
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
     <filter-list-component></filter-list-component>   
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import store from './store';
import FilterListComponent from './components/FilterListComponent.vue';

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
    FilterListComponent
  }
};
</script>

<style>
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
