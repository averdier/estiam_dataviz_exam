<template>
  <v-app>

    <!--Drawer-->
    <v-navigation-drawer v-model="drawer" temporary app>

      <!--Logo-->
      <div class="text-xs-center pt-3 drawer-logo">
        <v-avatar class="elevation-4" size="96">
          <img src="https://enigma-school.com/wp-content/uploads/2019/01/logo-enigma-school-slider1.png" alt="avatar">
        </v-avatar>
      </div>
      <!--./Logo-->

      <!--Description-->
      <v-subheader>Description</v-subheader>
      <div class="drawer-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id faucibus dolor. Sed imperdiet nulla sit
          amet volutpat consequat. Ut pulvinar, mauris quis malesuada aliquet, sem mauris aliquet turpis, sit amet
          malesuada tortor enim vel felis.
        </p>
      </div>
      <!--./Description-->

      <!--Authors-->
      <v-subheader>Authors</v-subheader>
      <v-list class="pa-0">
        <v-list-tile avatar v-for="author in authors" :key="author.name" :href="author.github">
          <v-list-tile-avatar>
            <img :src="author.img" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ author.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <!--./Authors-->

    </v-navigation-drawer>
    <!--./Drawer-->

    <!--Toolbar-->
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>DataViz</span>
        <span class="font-weight-light">EXAM</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/averdier/estiam_dataviz_exam" target="_blank">
        <span class="mr-2">Github</span>
      </v-btn>
    </v-toolbar>
    <!--./Toolbar-->

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      authors: [
        {
          name: 'averdier',
          img: 'https://avatars3.githubusercontent.com/u/4647487?s=460&v=4',
          github: 'https://github.com/averdier'
        },
        {
          name: 'romoliere',
          img: 'https://avatars0.githubusercontent.com/u/17572145?s=460&v=4',
          github: 'https://github.com/romoliere'
        },
        {
          name: 'remi0411',
          img: 'https://avatars0.githubusercontent.com/u/9786969?s=460&v=4',
          github: 'https://github.com/remi0411'
        }
      ]
    }
  }
}
</script>

<style scoped>
.drawer-logo {
  margin-bottom: .25em;
}

.drawer-content {
  padding: 0 16px;
}
</style>
