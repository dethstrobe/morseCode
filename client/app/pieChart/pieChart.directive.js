'use strict';

angular.module('morseCodeApp')
  .directive('pieChart', function () {
    return {
      restrict: 'E',
      scope: {
      	chartData: '='
      },
      link: function (scope, element, attrs) {
        //element.text('this is the pieChart directive');

        element.on('click', function() {
        	console.log(dataset);
	        scope.chartData.forEach(function(current, i) {
	        	dataset[i] = {
	        		label: current.name,
	        		count: current.name.length
	        	}
	        });
        });
        

        var dataset = [
          { label: 'Abulia', count: 10 }, 
          { label: 'Betelgeuse', count: 20 },
          { label: 'Cantaloupe', count: 30 },
          { label: 'Dijkstra', count: 40 }
        ];


        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;

        var color = d3.scale.category20b();

        var svg = d3.select(element.context)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
          .outerRadius(radius);

        var pie = d3.layout.pie()
          .value(function(d) { return d.count; })
          .sort(null);

        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(d.data.label);
          });
      }
    };
  });