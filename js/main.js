// Main.js
var data = [];

var data2 = [];

$(function() {
    // Instantiate your chart with given settings
    var myChart = DonutChart()
        .radius(150)
        .height(300)
        .width(300);
    

    // Build chart
    var chart = d3.select('#vis')
        .datum(data)
        .call(myChart);

    var myChart2= DonutChart()
        .radius(150)
        .height(300)
        .width(300)
        .movement(500);
    var chart2 = d3.select('#vis2')
        .datum(data2)
        .call(myChart2);

    var update = function(index) {
        switch (index) {
            case 0:
                data = [];

                data2 = [];

                myChart.label("");
                myChart2.label("");
                break;
            case 1:
                data = [{
                    id: 'Rejected',
                    count: 56
                }, {
                    id: 'Accepted',
                    count: 44
                }];

                data2 = [{
                    id: 'Rejected',
                    count: 65
                }, {
                    id: 'Accepeted',
                    count: 35
                }];
                myChart.label("Men Applicants");
                myChart2.label("Women Applicants");
                // myChart.xAxisLabel('Men students for Department A');
                // myChart2.xAxisLabel('Women students for Department A');
                // var fillColor = 'red';
                break;
            case 2:
                data = [{
                    id: 'Rejected',
                    count: 38
                }, {
                    id: 'Accepted',
                    count: 62
                }];

                data2 = [{
                    id: 'Rejected',
                    count: 18
                }, {
                    id: 'Accepeted',
                    count: 82
                }];
                myChart.label("Men Applicants");
                myChart2.label("Women Applicants");
                // var fillColor = 'orange';
                break;
            case 3:
                data = [{
                    id: 'Rejected',
                    count: 37
                }, {
                    id: 'Accepted',
                    count: 63
                }];

                data2 = [{
                    id: 'Rejected',
                    count: 33
                }, {
                    id: 'Accepeted',
                    count: 67
                }];
                myChart.label("Men Applicants");
                myChart2.label("Women Applicants");
                break;
            case 4:
                data = [];

                data2 = [];
                myChart.label("");
                myChart2.label("");
                break;
            default:
                // var fillColor = 'black';
                break;
        }
        // myChart.fillColor(fillColor);
        // myChart2.fillColor(fillColor);
        chart.datum(data).call(myChart);
        chart2.datum(data2).call(myChart2);
    };
    // Define a new scroller, and use the `.container` method to specify the desired container
    var scroll = scroller()
        .container(d3.select('#graphic'));

    // Pass in a selection of all elements that you wish to fire a step event:
    scroll(d3.selectAll('.step')); // each section with class `step` is a new step

    // Specify the function you wish to activate when a section becomes active
    scroll.on('active', function(index) {
        console.log(index)
        update(index);
    })
});
