<template>
    <v-container grid-list-md>
        <v-layout row wrap>

            <!--Title-->
            <v-flex xs12>
                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Manifestations</h3>
                    <div>Manifestations dans le Pas de Calais</div>
                </div>
                </v-card-title>
            </v-flex>
            <!--./Title-->

            <!--Map-->
            <v-flex xs12>
                <v-card class="elevation-4">
                    <div id="map" class="map"></div>
                </v-card>
            </v-flex>
            <!--./Map-->

        </v-layout>
    </v-container>
</template>

<script>
import api from '@/api'
import MarkerClusterer from '@google/markerclusterer'
import GoogleMapsApiLoader from "google-maps-api-loader"

export default {
    data() {
        return {
            google: null,
            cluster: null,
            heatMap: null,
            records: [],
            mapConfig: {
                zoom: 9,
                center: {
                    lat: 50.4821801,
                    lng: 2.1787828
                }
            }
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
    methods: {
        initializeMap() {
            const mapContainer = this.$el.querySelector("#map")
            const {
                Map
            } = this.google.maps;
            this.map = new Map(mapContainer, this.mapConfig)

            api.get62Events().then((response) => {
                this.records = response.data.records
                this.initMarkers()
            }).catch(err => {
                console.log(err)
            })
        },

        initMarkers() {
            var markers = []
            this.records.forEach(element => {
                if (element.fields.geo_point_2d !== undefined) {
                    markers.push(new google.maps.Marker({
                        position: {
                            lat: element.fields.geo_point_2d[0],
                            lng: element.fields.geo_point_2d[1]
                        },
                        label: element.fields.titre
                    }))
                }
            })
            this.cluster = new MarkerClusterer(
                this.map,
                markers, {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });
        }
    }
}
</script>

<style scoped>

</style>
