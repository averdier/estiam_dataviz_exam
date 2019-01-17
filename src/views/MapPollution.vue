<template>
    <v-container grid-list-md>
        <v-layout row wrap>

            <!--Title-->
            <v-flex xs12>
                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Poitiers</h3>
                    <div>Concentrations de polluants dans l'air ambiant</div>
                </div>
                </v-card-title>
            </v-flex>
            <!--./Title-->

            <!--Map-->
            <v-flex xs12>

                <v-card class="elevation-4">

                    <v-card-title>
                        <v-tabs v-model="tabs">
                            <v-tab key="0">Dioxyde d'azote</v-tab>
                            <v-tab key="1">Ozone</v-tab>
                            <v-tab key="2">Particules PM10</v-tab>
                            <v-tab key="3">Particules PM2</v-tab>
                        </v-tabs>
                    </v-card-title>

                    <div id="map" class="map"></div>
                </v-card>
                
            </v-flex>
            <!--./Map-->

        </v-layout>
    </v-container>

</template>

<script>
import api from '@/api'
import GoogleMapsApiLoader from "google-maps-api-loader"

export default {
    data() {
        return {
            tabs: null,
            google: null,
            heatMap: null,
            records: [],
            mapConfig: {
                zoom: 14,
                center: {
                    lat: 46.5846287,
                    lng: 0.3364501
                }
            },
        }
    },
    mounted() {
        GoogleMapsApiLoader({
            apiKey: 'AIzaSyDnq_8n2kMw5U_r64qATrSfqJIFloV5a_4',
            libraries: ['places', 'visualization']
        }).then(google => {
            this.google = google;
            this.initializeMap();
        }).catch(err => {
            console.log(err)
        })
    },
    watch: {
        tabs: function (value) {
            if (this.heatMap !== null) {
                if (value === 0) {
                    this.heatMap.set('data', new google.maps.MVCArray(this.dioxydeData))
                }
                if (value === 1) {
                    this.heatMap.set('data', new google.maps.MVCArray(this.ozoneData))
                }
                if (value === 2) {
                    this.heatMap.set('data', new google.maps.MVCArray(this.pm10Data))
                }
                if (value === 3) {
                    this.heatMap.set('data', new google.maps.MVCArray(this.pm2Data))
                }
            }

        }
    },
    computed: {
        dioxydeData: function () {
            var data = []
            this.records.forEach(element => {
                if (element.fields.id_pll === "8") {
                    data.push({
                        location: new google.maps.LatLng(
                            element.fields.geo_shape.coordinates[1],
                            element.fields.geo_shape.coordinates[0]
                        ),
                        weight: element.fields.valeur
                    })
                }
            })

            return data
        },

        ozoneData: function () {
            var data = []
            this.records.forEach(element => {
                if (element.fields.id_pll === "7") {
                    data.push({
                        location: new google.maps.LatLng(
                            element.fields.geo_shape.coordinates[1],
                            element.fields.geo_shape.coordinates[0]
                        ),
                        weight: element.fields.valeur
                    })
                }
            })

            return data
        },

        pm10Data: function () {
            var data = []
            this.records.forEach(element => {
                if (element.fields.id_pll === "5") {
                    data.push({
                        location: new google.maps.LatLng(
                            element.fields.geo_shape.coordinates[1],
                            element.fields.geo_shape.coordinates[0]
                        ),
                        weight: element.fields.valeur
                    })
                }
            })

            return data
        },

        pm2Data: function () {
            var data = []
            this.records.forEach(element => {
                if (element.fields.id_pll === "6001") {
                    data.push({
                        location: new google.maps.LatLng(
                            element.fields.geo_shape.coordinates[1],
                            element.fields.geo_shape.coordinates[0]
                        ),
                        weight: element.fields.valeur
                    })
                }
            })

            return data
        }

    },
    methods: {
        initializeMap() {
            const mapContainer = this.$el.querySelector("#map")
            const {
                Map
            } = this.google.maps;
            this.map = new Map(mapContainer, this.mapConfig)
            this.heatMap = new google.maps.visualization.HeatmapLayer({
                map: this.map,
                radius: 50
            });

            api.getPoitiersPollution().then((response) => {
                this.records = response.data.records
                this.initializeHeatMaps()
            }).catch(err => {
                console.log(err)
            })
        },

        initializeHeatMaps(data) {
            this.heatMap.set('data', new google.maps.MVCArray(this.dioxydeData))
        }
    }
}
</script>

<style>
.map {
    height: 45em;
    width: 100%;
}
</style>
