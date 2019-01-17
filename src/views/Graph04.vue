<template>
  <v-chart :options="options" />
</template>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
  import ECharts from 'vue-echarts/components/ECharts'
  import axios from 'axios';
  import 'echarts/lib/chart/line';
  import 'echarts/lib/component/polar';
  import 'echarts/lib/chart/bar'

  export default {
      components: {
          'v-chart': ECharts
      },
      data() {
          return {
              options: {}
          }
      },
      created: function () {
          var self = this;
          var builderJson = {
              "all": 400000,
              "charts": {}
          };

          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = canvas.height = 100;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.globalAlpha = 0.08;
          ctx.font = '20px Microsoft Yahei';
          ctx.translate(50, 50);
          ctx.rotate(-Math.PI / 4);

          var colors = ['#5793f3', '#FFF', '#d14a61', '#675bba', '#000'];

          axios.get('https://data.opendatasoft.com/api/records/1.0/search/?dataset=objets-trouves-gares%40datasncf&rows=400&sort=date&facet=date&facet=gc_obo_type_c&facet=gc_obo_gare_origine_r_name')
              .then(function (response) {

                  var categories = response.data.records.map(item => item.fields.gc_obo_type_c);

                  var result = [],
                      data = [],
                      xAxis = [],
                      yAxis = [];

                  categories.forEach(function (category) {
                      result[category] = (result[category] || 0) + 1;
                  });

                  builderJson.charts = {};

                  Object.keys(result).forEach(function (key) {
                      builderJson.charts[key] = result[key];
                  });

                  let arr = Object.values(builderJson.charts);
                  let max = Math.max(...arr);

                  self.options = {
                      backgroundColor: {
                          type: 'pattern',
                          image: canvas,
                          repeat: 'repeat'
                      },
                      tooltip: {},
                      title: [{
                          text: "Type d'objets perdus",
                          subtext: "Selon les déclarations de pertes",
                          x: '25%',
                          textAlign: 'center'
                      }],
                      grid: [{
                          top: 50,
                          width: '50%',
                          bottom: '45%',
                          left: 55,
                          containLabel: true
                      }],
                      xAxis: [{
                          type: 'value',
                          max: max + (max / 2),
                          splitLine: {
                              show: false
                          }
                      }],
                      yAxis: [{
                          type: 'category',
                          data: Object.keys(builderJson.charts),
                          axisLabel: {
                              interval: 0,
                              rotate: 30
                          },
                          splitLine: {
                              show: false
                          }
                      }],
                      series: [{
                          type: 'bar',
                          stack: 'chart',
                          z: 3,
                          label: {
                              normal: {
                                  position: 'right',
                                  show: true
                              }
                          },
                          data: Object.keys(builderJson.charts).map(function (key) {
                              return builderJson.charts[key];
                          }).sort(function (a, b) {
                              return a.value - b.value
                          })
                      }]
                  };

              })
              .catch(function (error) {
                  console.log("Error while creating graphic");
                  console.log(error);
              })
              .then(function () {
                  console.log("Exo 2 initialized");

              });
      }
  }
</script>