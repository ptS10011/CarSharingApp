<template>
  <v-list dense>
        <div class="logo-item">
        </div>

        <v-layout row wrap>
          <v-flex
            xs12
            text-xs-center
            align-center
            justify-center
          >
            <v-avatar class="mb-3 mt-4" color="grey lighten-1">
               <v-icon dark>account_circle</v-icon>
            </v-avatar>

          </v-flex>

           <v-flex
            xs12
            text-xs-center
            align-center
            justify-center
            class="mb-4"
          >
           <v-btn flat outline>Zaloguj</v-btn>
           <v-btn color="light-blue darken-4" dark>Rejestruj</v-btn>
          </v-flex>
        </v-layout>

        <v-divider class="mb-3"></v-divider>

        <v-list-tile v-for="item in items" :key="item.text" @click="console.log()">
            <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>
                    {{ item.text }}
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-divider class="mt-3 mb-3"></v-divider>

        <v-list-tile @click="console.log()">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Ustawienia</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="console.log()">
          <v-list-tile-action>
            <v-icon color="grey darken-1">chat_bubble</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Wyślij opinie</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="console.log()">
          <v-list-tile-action>
            <v-icon color="grey darken-1">contact_support</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Pomoc</v-list-tile-title>
        </v-list-tile>
      </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { icon: 'markunread_mailbox', text: 'Aktualności' },
        { icon: 'map', text: 'Mapa' },
        { icon: 'email', text: 'Kontakt' }
      ]
    };
  }
};
</script>

<style scoped>
.logo-img {
  max-width: 100%;
  max-height: 100%;
}

.logo-item {
  background-image: url('https://www.vozilla.pl/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
  min-height: 50px;
  background-position: center;
  margin: 10px 0 10px 0;
  cursor: pointer;
}
</style>
