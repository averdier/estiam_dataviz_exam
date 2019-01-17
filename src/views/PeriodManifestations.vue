<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
          <div class="text-center" id="svgbody">
            <v-menu offset-y>
              <v-btn slot="activator" color="primary" dark>
                Choisir l'année
              </v-btn>
              <v-list>
                <v-list-tile v-for="(item, index) in items" :key="index" @click="show(item.title)">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

            <svg></svg>
          </div>
      </v-flex>
    </v-layout>

</v-container>
</template>

<script>
import Period from '@/assets/json/cdt62_manifestations.json';

const d3 = require('d3');
var years = [];
var res = {}
var currentYear;
const margin = 50;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

export default {
  beforeCreate: function() {
    const sample = Period;
    var result = [
      {
        'month': 'Janvier',
        'count': 0,
      },
      {
        'month': 'Février',
        'count': 0,
      },
      {
        'month': 'Mars',
        'count': 0,
      },
      {
        'month': 'Avril',
        'count': 0,
      },
      {
        'month': 'Mai',
        'count': 0,
      },
      {
        'month': 'Juin',
        'count': 0,
      },
      {
        'month': 'Juillet',
        'count': 0,
      },
      {
        'month': 'Août',
        'count': 0,
      },
      {
        'month': 'Septembre',
        'count': 0,
      },
      {
        'month': 'Octobre',
        'count': 0,
      },
      {
        'month': 'Novembre',
        'count': 0,
      },
      {
        'month': 'Décembre',
        'count': 0,
      }
    ];    

    sample.forEach((element) => {
      var date = element.fields.periode_date_debut_1
      
      if (date) {
        var month = date.split('-')[1]
        var year = date.split('-')[0]

        if (!res[year]) {
          years.push({'title':year})
          res[year] =
            [
              {
                'month': 'Janvier',
                'count': 0,
              },
              {
                'month': 'Février',
                'count': 0,
              },
              {
                'month': 'Mars',
                'count': 0,
              },
              {
                'month': 'Avril',
                'count': 0,
              },
              {
                'month': 'Mai',
                'count': 0,
              },
              {
                'month': 'Juin',
                'count': 0,
              },
              {
                'month': 'Juillet',
                'count': 0,
              },
              {
                'month': 'Août',
                'count': 0,
              },
              {
                'month': 'Septembre',
                'count': 0,
              },
              {
                'month': 'Octobre',
                'count': 0,
              },
              {
                'month': 'Novembre',
                'count': 0,
              },
              {
                'month': 'Décembre',
                'count': 0,
              }
            ]
        }
        res[year][month-1].count++
      }
    });

      currentYear = new Date().getFullYear();
      var result = res[currentYear];
      // console.log(res[i])
      
    },
    data: () => ({
      items: years.sort(),
      show: show
    }),
    mounted: function() {
      show(currentYear)
      console.log('year : ' + currentYear)
    }
  }

  function show(year) {
      d3.selectAll("svg > *").remove();
      var result = res[year]
      console.log(year)
      console.log(result)
      var svg = d3.select('svg');
      const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

      var max = 0;
      result.forEach(element => {
        if (element.count > max) {
          max = element.count;
        }
      })

      // Scaling Function and draw axis
      const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, max+50]);

      chart.append('g')
        .call(d3.axisLeft(yScale));

      const xScale = d3.scaleBand()
        .range([0, width])
        .domain(result.map((s) => s.month))
        .padding(0.2)

      chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

      // LABELS
      svg
        .append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .attr('fill', '#000')
        .text('Nombre de manifestations')

      svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .attr('fill', '#000')
        .text('Mois')

      svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .attr('fill', '#000')
        .text('Nombre de manifestations par mois')


      // Interractivity and chart construction

      const barGroups = chart.selectAll()
        .data(result)
        .enter()
        .append('g')

      barGroups
        .append('rect')
        .attr('class', 'bar')
        .transition()
        .duration(200)
        .delay(function (d, i) {
          return i * 200;
        })
        .attr("fill", function (d, i) {
          console.log(d);
          return `rgb(50, ${(d.count + 120 )}, 50)`
        })
        .attr('x', (g) => xScale(g.month))
        .attr('y', (g) => yScale(g.count))
        .attr('height', (g) => height - yScale(g.count))
        .attr('width', xScale.bandwidth())
        

      barGroups.on('mouseenter', function (actual, i) {
      
        const y = yScale(actual.count)
        const x = xScale(actual.month);

        d3.select(this)
          .transition()
          .duration(100)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.month) - 5)
          .attr('width', xScale.bandwidth() + 10)

        chart.append('text')
          .attr('id', 'info')
          .attr('fill', 'white')
          .attr('opacity', 0.8)
          .attr('font-size', '14px')
          .attr('color', '#000')
          .attr('text-anchor', 'middle')
          .attr('x', x + xScale.bandwidth() / 2)
          .attr('y', y + 25)
          .text(`${actual.count}`);
      })

      barGroups.on("mouseleave", function (actual, i) {
        d3.select(this).attr("opacity", 1)
        chart.selectAll('#info').remove()

        d3.select(this)
          .transition()
          .duration(500)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.month))
          .attr('width', xScale.bandwidth())
      })
  }
</script>

<style scoped>
body {

  font-family: 'Open Sans', sans-serif;

  background-color: #011627;

}

 #svgbody {
   height: 800px;
   width: 100%;
 }

div#layout {

  text-align: center;

}

 

div#container {



  margin: auto;
  
  background-color: #2F4A6D;

}

 

svg {

  width: 100%;
  height: 100%;
  display: block;
}

 

/* line {

  stroke: #3FA7D6;

  opacity: 1;

} */

 

#limit line {

  stroke-width: 3;

  stroke-dasharray: 3 6;

}

 

text {

  color: #3FA7D6;

}

 

/* .bar {

  fill: #6610F2;

  border-radius: 300px;

} */

 

.domain {

  stroke: #3FA7D6;

}


</style>
