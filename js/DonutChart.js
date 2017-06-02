var DonutChart = function() {
	var width = 500,
		height = 500,
		padAngle,
		cornerRadius,
	margin = {
		left: 70,
		bottom: 50,
		top: 30,
		right: 10,
	};

	var tooltipFont = 20,
		tooltipLeft = 580,
		tooltipTop = 100,
		tooltipPadding = 10,
		tooltipWidth = 150;

	var movement = 0;

	var label = "";

	var radius = width / 2;

	var color = d3.scaleOrdinal(d3.schemeCategory10);

	var chart = function(selection){

		selection.each(function(data) {
			var arc = d3.arc()
				.outerRadius(radius - 10)
				.innerRadius(radius - 70)
				.cornerRadius(cornerRadius)
				.padAngle(padAngle);

			var pie = d3.pie()
				.sort(null)
				.value(function(d) {
					return d.count;
				});

			var labelArc = d3.arc()
				.outerRadius(radius - 40)
				.innerRadius(radius - 40);

			var ele = d3.select(this);
			var svg = ele.selectAll('svg').data([data]);

			var svgEnter = svg.enter()
				.append('svg')
				.attr('width', width)
				.attr('height', height + 50)
				.attr('transform', 'translate(' + movement + ", 0)");


			svgEnter.append('g')
				.attr('transform', 'translate(' + width/2 + "," + height/2 + ")")
				.attr('class', 'arc');

			console.log(label);

			svgEnter.append('g').append('text')
				.attr('class', 'titleLabel');

			svg.select('.titleLabel')
				.attr('transform', 'translate(' + (width/2 - 50) + "," + (height + 15) + ")")
				.text(label);



			var path = ele.select('.arc').selectAll('path').data(pie(data));
		
			path.exit().remove();
			// 
			path.enter().append('path')
				.attr('d', arc)
				.style('fill', function(d) {
					return color(d.data.id);
				})
				.on('mouseover', function(d){
					var total = d3.sum(data.map(function(d){
						return d.count;
					}))

					var percent = Math.round(1000 * d.data.count / total) / 10;
					tooltip.select('.labels').html(d.data.id);
					tooltip.select('.count').html(d.data.count);
					tooltip.select('.percent').html(percent + '%');
					tooltip.style('display', 'block');
				})
				.on('mouseout', function(d){
					tooltip.style('display', 'none');
				})
				.transition()
				.ease(d3.easeLinear)
				.duration(1000)
				.attrTween('d', pieTween);
				
			// path.exit().remove();

			var texts = ele.select('.arc').selectAll('text').data(pie(data));
				texts.enter()
				.append('text')
				.merge(texts)
				.transition()
				.ease(d3.easeLinear)
				.duration(1200)
				.attr('transform', function(d) {
					return 'translate(' + labelArc.centroid(d) + ')';
				})
				.attr('dy', '.35em')
				.text(function(d) {return d.data.id;});

			function pieTween(b){
				b.innerRadius = 0;
				var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
				return function(t){
					return arc(i(t));
				};
			}

			var tooltip = d3.select(this)
				.append('div')
				.attr('class', 'tooltips')
				.style('background', '#eee')
				.style('box-shadow', '0 0 5px #999999')
				.style('color', '#333')
				.style('display', 'none')
				.style('font-size', tooltipFont + 'px')
				.style('left', tooltipLeft + 'px')
				.style('padding', tooltipPadding + 'px')
				.style('text-align', 'center')
				.style('top', tooltipTop + 'px')
				.style('width', tooltipWidth + 'px')
				.style('position', 'absolute');

			tooltip.append('div')
				.attr('class', 'labels');

			tooltip.append('div')
				.attr('class', 'count');

			tooltip.append('div')
				.attr('class', 'percent');


			path.transition()
				.ease(d3.easeLinear)
				.duration(1000)
				.attrTween('d', pieTween);

			texts.exit().remove();
		})

	}

	chart.label = function(l) {
		if (!arguments.length) return label;
		label = l;
		return chart;
	};

	chart.height = function(h) {
		if (!arguments.length) return height;
		height = h;
		return chart;
	};

	chart.movement = function(m) {
		if (!arguments.length) return movement;
		movement = m;
		return chart;
	};

	chart.width = function(w) {
		if (!arguments.length) return width;
		width = w;
		return chart;
	};

	chart.radius = function(r) {
		if(!arguments.length) return radius;
		radius = r;
		return chart;
	};

	chart.padAngle = function(a) {
		if(!arguments.length) return padAngle;
		padAngle = a;
		return chart;
	};

	chart.cornerRadius = function(c){
		if(!arguments.length) return cornerRadius;
		cornerRadius = c;
		return chart;
	};

	chart.tooltipWidth = function(tw){
		if(!arguments.length) return tooltipWidth;
		tooltipWidth = tw;
		return chart;
	};

	chart.tooltipTop = function(top){
		if(!arguments.length) return tooltipTop;
		tooltipTop = top;
		return chart;
	};

	chart.tooltipPadding = function(p){
		if(!arguments.length) return tooltipPadding;
		tooltipPadding = p;
		return chart;
	};

	chart.tooltipLeft = function(l){
		if(!arguments.length) return tooltipLeft;
		tooltipLeft = l;
		return chart;
	};

	chart.tooltipFont = function(f){
		if(!arguments.length) return tooltipFont;
		tooltipFont = f;
		return chart;
	};

	

	return chart;
}

