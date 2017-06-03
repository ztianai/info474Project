// Main.js
var data1 = [];

var data2 = [];

$(function() {
    // Instantiate your chart with given settings
    var myChart = DonutChart()
        .radius(150)
        .height(300)
        .width(300);
    

    // Build chart
    var chart = d3.select('#vis')
        .datum([data1])
        .call(myChart);

    var myChart2= DonutChart()
        .radius(150)
        .height(300)
        .width(300)
        .movement(500);
    var chart2 = d3.select('#vis2')
        .datum([data2])
        .call(myChart2);

    var myChart4 = StackedBarChart();

    var chart4 = d3.select('#vis4');
        

    
    var update = function(index) {
        switch (index) {
            case 0:
                data1 = [];

                data2 = [];


                myChart.label("");
                myChart2.label("");
                document.getElementById('vis4').style.display = "none";


                break;
            case 1:
                data1 = [{
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
                document.getElementById('vis4').style.display = "none";


                break;
            case 2:
                data1 = [{
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
                document.getElementById('vis4').style.display = "none";

                break;
            case 3:
                data1 = [{
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
                document.getElementById('vis4').style.display = "none";

                break;

            case 6:
               
                data1 = [];

                data2 = [];
                d3.csv('data/kidney_stone_data.csv', function(d, i, columns) {
                     for (i = 2, t = 0; i < columns.length - 1; ++i) t += d[columns[i]] = +d[columns[i]];
                         d.total = t;
                     return d;
                 }, function(error, data) {
                    console.log("hi");
                     console.log(data);
             
                     var filteredData1 = data.filter(function(d) { 
                         
                        return d.Case =='Combined';

                     });
             
                     console.log(filteredData1);
                      

                      myChart4 = StackedBarChart();
                       myChart4.caseType('Treatment').label('Combined Success Rate');
                         chart4.datum(filteredData1)
                         .call(myChart4);
                 });

                document.getElementById('vis4').style.display = "inline-block";
                document.getElementById('vis3').style.display = "none";

                break;
            case 7:
               
                data1 = [];

                data2 = [];
                d3.csv('data/kidney_stone_data.csv', function(d, i, columns) {
                     for (i = 2, t = 0; i < columns.length - 1; ++i) t += d[columns[i]] = +d[columns[i]];
                         d.total = t;
                     return d;
                 }, function(error, data) {
                    console.log("hi");
                     console.log(data);
             
                     var filteredData1 = data.filter(function(d) { 
                         return d.Case == 'Small Stones';
                     });
             
                     console.log(filteredData1);
                        myChart4 = StackedBarChart();
                         myChart4.caseType('Treatment').label('Success Rate for Small Stones');
                         chart4.datum(filteredData1)
                         .call(myChart4);
                 });

                document.getElementById('vis4').style.display = "inline-block";


                break;
            case 8:
               
                data1 = [];

                data2 = [];
                d3.csv('data/kidney_stone_data.csv', function(d, i, columns) {
                     for (i = 2, t = 0; i < columns.length - 1; ++i) t += d[columns[i]] = +d[columns[i]];
                         d.total = t;
                     return d;
                 }, function(error, data) {
                    console.log("hi");
                     console.log(data);
             
                     var filteredData1 = data.filter(function(d) { 
                         return d.Case == 'Large Stones';
                     });
             
                     console.log(filteredData1);
             
                        myChart4 = StackedBarChart();
                         myChart4.caseType('Treatment').label('Success Rate for Large Stones');
                         chart4.datum(filteredData1)
                         .call(myChart4);
                 });

                document.getElementById('vis4').style.display = "inline-block";


                break;
            case 9:
               
                data1 = [];

                data2 = [];
                d3.csv('data/kidney_stone_data.csv', function(d, i, columns) {
                     for (i = 2, t = 0; i < columns.length - 1; ++i) t += d[columns[i]] = +d[columns[i]];
                         d.total = t;
                     return d;
                 }, function(error, data) {
                    console.log("hi");
                     console.log(data);
             
                     var filteredData1 = data.filter(function(d) { 
                         return (d.Treatment == 'B') && (d.Case != 'Combined'); 
                     });
             
                     console.log(filteredData1);
                        myChart4 = StackedBarChart();
                         myChart4.caseType('Case').label('Success Rate for Treatment B');
                         chart4.datum(filteredData1)
                         .call(myChart4);
                 });

                document.getElementById('vis4').style.display = "inline-block";


                break;
            case 10:
               
                data1 = [];

                data2 = [];
                d3.csv('data/kidney_stone_data.csv', function(d, i, columns) {
                     for (i = 2, t = 0; i < columns.length - 1; ++i) t += d[columns[i]] = +d[columns[i]];
                         d.total = t;
                     return d;
                 }, function(error, data) {
                    console.log("hi");
                     console.log(data);
             
                     var filteredData1 = data.filter(function(d) { 
                         return (d.Treatment == 'A') && (d.Case != 'Combined'); 
                     });
             
                     console.log(filteredData1);
                    myChart4 = StackedBarChart();
                         myChart4.caseType('Case').label('Success Rate for Treatment A');
                         chart4.datum(filteredData1)
                         .call(myChart4);
                 });

                document.getElementById('vis4').style.display = "inline-block";


                break;
            case 11:
               
                data1 = [];

                data2 = [];
                d3.csv('data/kidney_stone_data_modified.csv', function(d, i, columns) {
                     for (i = 2, t = 0; i < columns.length - 1; ++i) t += d[columns[i]] = +d[columns[i]];
                         d.total = t;
                     return d;
                 }, function(error, data) {
                    console.log("hi");
                     console.log(data);
             
                     var filteredData1 = data.filter(function(d) { 
                         return d.Case == 'Combined'; 
                     });
             
                     console.log(filteredData1);
                    myChart4 = StackedBarChart();
                         myChart4.caseType('Treatment').label('Combined Success Rate');
                         chart4.datum(filteredData1)
                         .call(myChart4);
                 });

                document.getElementById('vis4').style.display = "inline-block";


                break;
            default:
                data1 = [];

                data2 = [];
                myChart.label("");
                myChart2.label("");
                document.getElementById('vis4').style.display = "none";
                break;
        }

        chart.datum(data1).call(myChart);
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
