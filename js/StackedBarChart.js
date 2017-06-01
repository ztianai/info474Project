// StackedBarChart.js

var StackedBarChart = function() {
	var width = 960,
		height = 500,
		margin = {
			top: 10,
			bottom: 50,
			left: 50,
			right: 10,
		},
		inputHeight = 20,
		drawWidth = width - margin.left - margin.right,
		drawHeight = height - margin.top - margin.bottom;

	var chart = function(selection) {
		selection.each(function(data) {
			var element = d3.select(this);
			var svg = element.selectAll('svg').data(data);

			console.log(data);
			// var nestedData = d3.nest()
			// 	.key(function(d) {
			// 		return d.treatment;
			// 	})
			// 	.entries(data);



			var svgEnter = svg.enter()
				.append('svg')
				.attr('width', width)
				.attr('height', height);

			var graphLayer = svgEnter.append('g')
				.attr('transform','translate(' + margin.left + ',' + margin.top + ')')
				.attr('width', drawWidth)
				.attr('height', drawHeight);

			var xScale = d3.scaleBand();

			var yScale = d3.scaleLinear();

			var xAxisLabel = svgEnter.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + (height - margin.top) + ')')
				.attr('class', 'axis');

			var yAxisLabel = svgEnter.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
				.attr('class', 'axis');

			var xAxis = d3.axisBottom();

			var yAxis = d3.axisLeft()
				.tickFormat(d3.format('.2s'));

			var xAxisText = svgEnter.append('text')
				.attr('transform', 'translate(' + (margin.left + drawWidth / 2) + ',' + (drawHeight + margin.top + 40) + ')')
				.attr('font-weight', 'bold')
				.attr('font-size', 11)
				.text('Year');

			var yAxisText = svgEnter.append('text')
				.attr('transform', 'translate(' + margin.left + ',' + (margin.top - 10) + ')')
				.attr('class', 'title');

			// var xAxisTextLeft = graphLayer.append('text')
			// 	.attr('transform', 'translate(' + drawWidth/4  + ',' + (drawHeight - 10) + ')')
			// 	.attr('class', 'title')
			// 	.attr('font-size', 18)
			// 	.attr('font-weight', 'bold');
			
			// var xAxisTextRight = graphLayer.append('text')
			// 	.attr('transform', 'translate(' + (3*drawWidth)/4  + ',' + (drawHeight - 10) + ')')
			// 	.attr('class', 'title')
			// 	.attr('font-size', 18)
			// 	.attr('font-weight', 'bold');

			// var keyTitle = svg.append('text')
			// 	.attr('transform', 'translate(' + (width - 97) + ',' + (margin.top + 10) + ')')
			// 	.attr('font-size', 11)
			// 	.attr('font-weight', 'bold')
			// 	.attr('class', 'title')
			// 	.text('Age Groups');

			var color = d3.scaleOrdinal()
				.range(['#861BB8', '#b7b7b7']);

			var cases = data.map(function(d) { return d.Case; });
			 console.log(cases);

			xScale.domain(cases) // small_stone, large_stone
				.rangeRound([0, drawWidth])
				.paddingInner(0.05)
				.align(0.1);
			
			var keys = d3.keys(data[0]).slice(2,4); // success and fail
			console.log(keys);
				
			//data.sort(function(a,b) { return b.total - a.total; });
			svg.selectAll('.stack').remove();
			
			yScale.domain([0, d3.max(data, function(d) {console.log(d.total); return d.total; })]).nice()
				.rangeRound([drawHeight, 0]);
			color.domain(keys);

			xAxis.scale(xScale);
			yAxis.scale(yScale);

			xAxisLabel.transition().duration(1000).call(xAxis);
			yAxisLabel.transition().duration(1000).call(yAxis);

			graphLayer.append('text');
				
			// title.text('Child Mortality Rate Caused by Prematurity in ' + region);

			yAxisText.attr('x', 2)
				.attr('y', yScale(yScale.ticks().pop()) + 0.5)
				.attr('dy', '0.32em')
				.attr('fill', '#000')
				.attr('font-size', 11)
				.attr('font-weight', 'bold')
				.attr('text-anchor', 'start')
				.text('Deaths per 1 000 live births');

			var stack = graphLayer.append('g').selectAll('g').data(d3.stack().keys(keys)(data));
			console.log(d3.stack().keys(keys)(data));

			stack.enter().append('g').attr('class', 'stack')
				.attr('fill', function(d) { console.log(d); return color(d.key); })
			.selectAll('rect')
			// .data(function(d) { return d; })
			.data(function(d) { console.log(d); return d; })
			.enter().append('rect')
				.attr('x', function(d) { return xScale(d.data.Case); })
				.attr('y', function(d) { return drawHeight; })
				.attr('height', 0)
				.merge(stack)
				.transition()
				.duration(1500)
				.attr('y', function(d) { console.log(d); return yScale(d[1]); })
				.attr('height', function(d) { return yScale(d[0]) - yScale(d[1]); })
				.attr('width', xScale.bandwidth());
			

			// read in JSON file: http://bl.ocks.org/Jverma/887877fc5c2c2d99be10
			// StackedBarChart: https://bl.ocks.org/mbostock/3886208
			// d3 and JSON: https://www.dashingd3js.com/lessons/d3-and-json
		

		})
	}

	chart.height = function(val) {
		if (!arguments.length) return height;
		height = val;
		return chart;
	};

	chart.width = function(val) {
		if (!arguments.length) return width;
		width = val;
		return chart;
	};



	return chart;
}