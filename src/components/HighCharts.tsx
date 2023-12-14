import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useCallback, useMemo, memo } from 'react'

const HighChartDetails = memo((props: any) => {
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
            color: "rgb(255,193,7)",
            name: 'Online Sales',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]

        }, {
            color: "#6D00C2",
            name: 'Offline Sales',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]

        }]
    }
    return (

        <HighchartsReact
            highcharts={Highcharts}
            options={ options1}
        />

    );
})
export default HighChartDetails;