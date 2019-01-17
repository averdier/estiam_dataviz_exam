<template>
    <v-container>
        <v-layout text-xs-center wrap>

            <!--Logo-->
            <v-flex xs12>
                <v-avatar class="elevation-4" size="200">
                    <img src="https://enigma-school.com/wp-content/uploads/2019/01/logo-enigma-school-slider1.png" alt="avatar">
                </v-avatar>
            </v-flex>
            <!--./Logo-->

            <!--Description-->
            <v-flex mb-4 pt-4>
                <h1 class="display-2 font-weight-bold mb-3">
                    Data visualisation
                </h1>

                <p class="subheading font-weight-regular">
                    Rendu de l'examen de data visualisation réalisé à l'école Enigma,
                    pour toutes informations sur l'école,
                    <br>visitez le site
                    <a href="https://enigma-school.com/" target="_blank">Engima School</a>
                </p>
            </v-flex>
            <!--./Description-->

            <!--Graphiques-->
            <v-flex xs12 mb-5>
                <h2 class="headline font-weight-bold mb-3">Graphiques</h2>

                <v-layout justify-center>
                    <router-link v-for="(chart, i) in charts" :key="i" :to="chart.href" class="subheading mx-3">
                        {{ chart.text }}
                    </router-link>
                </v-layout>
            </v-flex>
            <!--./Graphiques-->

            <!--Libraries-->
            <v-flex xs12 mb-5>
                <h2 class="headline font-weight-bold mb-3">Bibliothèques</h2>

                <v-layout justify-center>
                    <a v-for="(lib, i) in libraries" :key="i" :href="lib.href" class="subheading mx-3" target="_blank">
                        {{ lib.text }}
                    </a>
                </v-layout>
            </v-flex>
            <!--./Libraries-->

        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        charts: [
            {
                text: 'graph 01',
                href: '/graph01'
            },
            {
                text: 'graph02',
                href: '/graph02'
            },
            {
                text: 'Map pollution',
                href: '/mappollution'
            },
            {
                text: 'Map événements',
                href: '/mapevents'
            },
            {
                text: 'Periode des manifestations',
                href: '/period-manifestations'
            }
        ],
        libraries: [
            {
                text: 'vuejs',
                href: 'https://vuejs.org/'
            },
            {
                text: 'vuetify',
                href: 'https://vuetifyjs.com'
            },
            {
                text: 'vue router',
                href: 'https://router.vuejs.org/'
            },
            {
                text: 'chart.js',
                href: 'https://www.chartjs.org/'
            },
            {
                text: 'vue-chart.js',
                href: 'https://vue-chartjs.org/'
            }
        ]
    })
}
</script>

