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
  data () {
    return {
      options: {}
    }
  },
  created: function () {
    let options = {};
    
    var self = this;
    axios.get('https://data.opendatasoft.com/api/records/1.0/search/?dataset=qualite-de-lair-mesuree-dans-la-station-chatelet%40dataratp&rows=500&sort=-dateheure&facet=dateheure&apikey=ef7a96984f6c7516cb0f30e9d112e1714940989da255714be51c6d27')
      .then(function (response) {
        let totalc2cha4 = 0,totaltcha4 = 0,totalhycha4 = 0,total10cha4 = 0,totaln2cha4 = 0,totalnocha4 = 0,countc2cha4 = 0,counttcha4 = 0,counthycha4 = 0,count10cha4 = 0,countn2cha4 = 0,countnocha4 = 0;
        let tempDatas = [], data = [], axisDates = [], datasetNO = [], datasetNO2 = [], datasetPM10 = [], datasetC02 = [];

        response.data.records.forEach(function (item) {
          let dateFormated = new Date(item.fields.dateheure).getHours();
          if (!tempDatas[dateFormated]) {
            tempDatas[dateFormated] = {};
          }

          Object.keys(item.fields).forEach(key => {
            if (key !== 'dateheure') {
              tempDatas[dateFormated]['total' + key] = (tempDatas[dateFormated]['total' + key] || 0) + item.fields[key];
              tempDatas[dateFormated]['count' + key] = (tempDatas[dateFormated]['count' + key] || 0) + 1;
            }
          });
        });

        Object.keys(tempDatas).forEach(function (key) {
          axisDates.push(key);
          datasetNO.push(tempDatas[key].totalnocha4 / tempDatas[key].countnocha4);
          datasetNO2.push(tempDatas[key].totaln2cha4 / tempDatas[key].countn2cha4);
          datasetPM10.push(tempDatas[key].total10cha4 / tempDatas[key].count10cha4);
          datasetC02.push(tempDatas[key].totalc2cha4 / tempDatas[key].countc2cha4);
        });

        data.push({
          data: datasetNO2,
          name: 'NO2',
          type: 'bar'
        });

        data.push({
          data: datasetC02,
          name: 'CO2',
          type: 'line',
          yAxisIndex: 1
        });

        data.push({
          data: datasetNO,
          name: 'NO',
          type: 'bar'
        });

        data.push({
          data: datasetPM10,
          name: 'PM10',
          type: 'bar'
        });

        // var myChart = echarts.init(document.getElementById('main'));
        var colors = ['#5793f3', '#000', '#d14a61', '#675bba', '#000'];
        self.options = {
          // options: {
            color: colors,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            title: {
              left: 'left',
              text: 'Répartition de la pollution sur la journée',
              textStyle: {
                color: '#fff'
              }
            },
            legend: {
              data: ['PM10', 'NO', 'CO2', 'NO2'],
              textStyle: {
                color: '#fff'
              }
            },
            grid: {
              right: '10%'
            },
            xAxis: [{
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: axisDates,
              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              },
            }],
            yAxis: [{
                type: 'value',
                name: 'Concentration de particules',
                min: 15,
                max: 250,
                position: 'left',
                axisLine: {
                  lineStyle: {
                    color: colors[0]
                  },
                },
                axisLabel: {
                  formatter: '{value} µg/m3'
                }
              },
              {
                type: 'value',
                name: 'Présence de CO2',
                min: 400,
                max: 1000,
                position: 'right',
                offset: 80,
                axisLine: {
                  lineStyle: {
                    color: colors[3]
                  },
                  onZero: false
                },
                axisLabel: {
                  formatter: '{value} ppm'
                }
              }
            ],
            series: data
          // }
        }; 
    });
  }
} 
</script>