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
import 'echarts/lib/chart/pie';
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
          var self = this
          var downloadJson = {};

          var waterMarkText = 'ENIGMA';

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

          axios.get('https://data.opendatasoft.com/api/records/1.0/search/?dataset=objets-trouves-gares%40datasncf&rows=400&sort=date&facet=date&facet=gc_obo_type_c&facet=gc_obo_gare_origine_r_name&refine.gc_obo_type_c=Appareils+%C3%A9lectroniques%2C+informatiques%2C+appareils+photo')
              .then(function (response) {

                  var itemTypes = response.data.records.map(item => item.fields.gc_obo_nature_c);

                  var result = [],
                      data = [],
                      xAxis = [],
                      yAxis = [];

                  itemTypes.forEach(function (itemType) {
                      result[itemType] = (result[itemType] || 0) + 1;
                  });
                  downloadJson = {};
                  var data = [];
                  Object.keys(result).forEach(function (key) {
                      downloadJson[key] = result[key];
                  });

                  Object.keys(downloadJson).forEach(function (item) {
                      data.push({
                          name: item,
                          value: downloadJson[item]
                      });
                  });

                  data.sort(function (a, b) {
                      return a.value - b.value;
                  });
                  data.reverse();
                  data = data.splice(0, 8);

                  downloadJson = {};

                  data.forEach(function (item) {
                      downloadJson[item.name] = item.value;
                  });

                  self.options = {
                      backgroundColor: {
                          type: 'pattern',
                          image: canvas,
                          repeat: 'repeat'
                      },
                      tooltip: {},
                      title: [{
                          text: "Type d'objets perdus",
                          subtext: "Dans la catégorie 'Informatique",
                          x: '75%',
                          textAlign: 'center'
                      }],
                      grid: [{
                          top: '0%',
                          width: '100%',
                          bottom: 0,
                          left: 0,
                          containLabel: true
                      }],
                      xAxis: [],
                      yAxis: [],
                      series: [{
                          type: 'pie',
                          radius: [0, '30%'],
                          center: ['75%', '25%'],
                          data: Object.keys(downloadJson).map(function (key) {
                              return {
                                  name: key.replace('.js', ''),
                                  value: downloadJson[key]
                              }
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