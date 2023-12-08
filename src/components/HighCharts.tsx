import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { memo } from 'react'



const HighChartDetails = memo((props: any) => {


    const options2 = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },

        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'June',
                'July'
            ],
            crosshair: true
        },
        yAxis: {
            visible: false,
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            series: {
                pointWidth: 12,
                borderRadius: 3
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            symbolPadding: 0,
            symbolWidth: 0.1,
            symbolHeight: 0.1,
            symbolRadius: 0,
            useHTML: true,
            labelFormatter: function (this) {

                let color1: any = this

                if (color1 && color1?.color == "#E70033") {
                    return '<div style="width:12rem;display:flex;align-items: center;justify-content: space-between;padding-bottom:2rem"><span style="float: left;font-size:16px">' + 'Actual<br/><span style="font-size:12px">Global</span>' + '</span > <span style="float: right; color:#E70033">' + color1?.yData[0] + '</span></div > '
                }
                if (color1 && color1?.color == "#545454") {
                    return '<div style="width:12rem;display:flex;align-items: center;justify-content: space-between"><span style="float: left;font-size:16px">' + 'Forecast<br/><span style="font-size:12px">Commercial</span>' + '</span><span style="float: right;color:#545454 ">' + color1?.yData[0] + '%</span></div>';
                }

            },
            itemStyle: {
                color: '#545454',
                fontSize: '14px'
            }
        },
        series: [{
            color: "#6D00C2",
            name: '<b>Actual</b><br/>Global',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]

        }, {
            color: "#FFBE0B",
            name: '<b>Forecast</b> <br/>Commercial',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]

        }]
    }
    const options1 = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            crosshair: true
        },
        yAxis: {
            labels: {
                format: '{text} k'
            },
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointWidth: 12,
                pointPadding: 0.2,
                borderWidth: 0
            },
            series: {
                borderRadius: 3
            }
        },
        series: [{
            color: "#6D00C2",
            name: 'Online Sales',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]

        }, {
            color: "#FFBE0B",
            name: 'Offline Sales',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]

        }]
    }
    const options3 = {
        chart: {
            type: 'pie',

        },
        credits: {
            enabled: false
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        title: {
            verticalAlign: 'middle',
            floating: true,
            text: "22%",
            x: -55,
            useHTML: true,
            style: {
                "fontSize": "56px",
                "whiteSpace": "normal",
                "textAlign": "center",
                "color": "#2ED47A"
            },
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '{point.name}: {y} %'
                },
                useHTML: true,
                style: {
                    "fontSize": "30px",
                    "whiteSpace": "normal",
                    "textAlign": "center",
                    "color": "#black"
                },
                showInLegend: true
            }
        },

        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical',
            x: 15,
            itemStyle: {
                color: '#545454',
                fontSize: '14px'
            }
        },
        series: [{
            name: 'Food Details',
            colorByPoint: true,
            innerSize: '90%',

            data: [{
                color: "#9F11C8",
                name: 'In Progress',
                y: 68.1
            }, {
                color: "#FFBE0B",
                name: 'Sold',
                y: 11.0
            }, {
                color: "#6D00C2",
                name: 'Inactive',
                y: 11.2
            }]
        }]
    }
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={props.chart == 1 ? options1 : props.chart == 2 ? options2 : options3}
        />
    );
})
export default HighChartDetails;