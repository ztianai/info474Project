// StackedBarChart.js

var StackedBarChart = function() {
	var width = 960,
		height = 500,
		margin = {
			top: 20,
			bottom: 100,
			left: 120,
			right: 20,
		},
		inputHeight = 20,
		drawWidth = width - margin.left - margin.right,
		drawHeight = height - margin.top - margin.bottom;

	var caseType = 'Case';
	var xAxisTitle = 'Treatment';

	var chart = function(selection) {
		selection.each(function(data) {
			var element = d3.select(this);
			var svg = element.selectAll('svg').data([data]);

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
				.attr('height', drawHeight)
				.attr('class', 'graphLayer');

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
				.text(xAxisTitle);

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
			console.log(caseType);
			var cases = data.map(function(d) { return d[caseType]; });
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

			// graphLayer.append('text');
				
			// title.text('Child Mortality Rate Caused by Prematurity in ' + region);

			yAxisText.attr('x', 2)
				.attr('y', yScale(yScale.ticks().pop()) + 0.5)
				.attr('dy', '0.32em')
				.attr('fill', '#000')
				.attr('font-size', 9)
				.attr('font-weight', 'bold')
				.attr('text-anchor', 'start')
				.text('Number of Patients');

			var stack = element.selectAll('.graphLayer').append('g').selectAll('g').data(d3.stack().keys(keys)(data));
			console.log(d3.stack().keys(keys)(data));

			stack.enter().append('g').attr('class', 'stack')
				.attr('fill', function(d) { console.log(d); return color(d.key); })
			.selectAll('rect')
			// .data(function(d) { return d; })
			.data(function(d) { console.log(d); return d; })
			.enter().append('rect')
				.attr('x', function(d) { return xScale(d.data[caseType]); })
				.attr('y', function(d) { return drawHeight; })
				.attr('height', 0)
				.merge(stack)
				.on("mouseover", function() { tooltip.style("display", null); })
			    .on("mouseout", function() { tooltip.style("display", "none"); })
			    .on("mousemove", function(d) {
			    	tooltip.style('display', 'block');
				    var xPosition = d3.mouse(this)[0];
				    var yPosition = d3.mouse(this)[1];
				    console.log(d.data);
				    tooltip.attr("transform", "translate(" + (xPosition + 120) + "," + (yPosition-50) + ")");
				    tooltip.select("text").text("Fail Cases: " + d.data.Fail)
				    	.append('tspan').text("Success Cases: " + d.data.Success)
				    	.attr('y', 20)
				    	.attr('x', 19)
				    	.append('tspan').text("Success Rate: " + d.data.Rate + "%")
				    	.attr('y', 40)
				    	.attr('x', 17);
				    // console.log(d);
				})
				.transition()
				.duration(1500)
				.attr('y', function(d) { console.log(d); return yScale(d[1]); })
				.attr('height', function(d) { return yScale(d[0]) - yScale(d[1]); })
				.attr('width', xScale.bandwidth());
			
			// stack.exit().remove();
			// read in JSON file: http://bl.ocks.org/Jverma/887877fc5c2c2d99be10
			// StackedBarChart: https://bl.ocks.org/mbostock/3886208
			// d3 and JSON: https://www.dashingd3js.com/lessons/d3-and-json
		
			// Prep the tooltip bits, initial display is hidden
			var tooltip = //d3.select(this)
			  svgEnter.append("g")
			  .attr("class", "tooltips")
			  .style("display", "none");
			    
			// tooltip.append("rect")
			//   .attr("width", 30)
			//   .attr("height", 20)
			//   .style("background", "#000")
			//   .style("opacity", 0.5);

			tooltip.append("text")
			  // .style("left", "500px")
			  // .style("top", "1")
			  .style("text-anchor", "middle")
			  .attr("font-size", "14px")
			  //.attr("font-weight", "bold")
			  .style('fill', "#fff");


			console.log(data);
			var yTextPadding = 40;
			var bartext = svgEnter.selectAll('.bartext').data(data);

			bartext.enter()
				.append("text")
				.attr("class", "bartext")
				.attr("text-anchor", "middle")
				.attr("fill", "white")
				.attr("x", function(d, i) {
				    console.log(xScale.bandwidth());
				    return xScale.bandwidth() * i + xScale.bandwidth();
				})
				.attr("y", function(d) {
					console.log(d.Success);
				    return yScale(d.Success)+yTextPadding;
				})
				.text(function(d){
				     return d.Success;
				});
			bartext.exit().remove();



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

	chart.caseType = function(val) {

		if(!arguments.length) return caseType;
		caseType = val;
		return chart;	
	};

	chart.xAxisTitle = function(val) {
		if(!arguments.length) return xAxisTitle;
		xAxisTitle = val;
		return chart;
	};



	return chart;
}