import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { DashboardData } from '../store/Dashboard/dashboardSlice';



const HighChartDetails = memo((props: any) => {

        const dispatch = useDispatch<AppDispatch>();
        const { dashboardList, loading } = useSelector((state: any) => state?.dashboardDataShow);
    // console.log(dashboardList?.data[0]?.today_menu_items,"dashboardListdashboardListdashboardList")
        useEffect(() => {
            dispatch(DashboardData({}))
        }, [])
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
                floating: false,
                text: dashboardList?.data?.map((x: any) => x?.today_menu_items).join(', '), 
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

    const options2 = {
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
            floating: false,
            text: dashboardList?.data?.map((x: any) => x?.total_orders).join(', '), 
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
    const options4 = {
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
            floating: false,
            text: dashboardList?.data?.map((x: any) => x?.pendingOrder).join(', '), 
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
    const options1 = {
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
            floating: false,
            text: dashboardList?.data?.map((x: any) => x?.total_users).join(', '), 
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
            options={props.chart == 1 ? options1 : props.chart == 2 ? options2 :props.chart == 2? options3:options4}
        />
    );
})
export default HighChartDetails;