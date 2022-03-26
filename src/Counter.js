import React, {Component} from 'react';
import Chart from "react-apexcharts";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 20
        }
    }

    increment() {
        this.setState({
            count: this.state.count + 1
        })
    }


    render() {
        return (
            <div>
                Count - {this.state.count}
                <button onClick={() => this.increment()}>Increment</button>


                <Chart
                    type="bar"
                    width={600}
                    height={600}
                    series={[
                        {
                            name: 'Stuff',
                            data: [`${this.state.count}`, 200],
                            //color: '#ffffff',
                        }, {
                            name: 'Stuff2',
                            data: [100, 200],
                            //color: '#ffff00',
                        }
                    ]}
                    options={{
                        colors: ["#ffffff", "#ffff00"],
                        // theme: {
                        //     mode: 'dark'
                        // },
                        // chart:{
                        //     stacked:true
                        // },
                        dataLabels: {
                            formatter: (val) => {
                                return `$${val}`;
                            },
                            style: {
                                colors: ['#000', '#000',],
                                fontSize: 16
                            }
                        },
                        yaxis: {
                            labels: {
                                formatter: (val) => {
                                    return `$${val}`;
                                },
                                style: {
                                    colors: ['#fff'],
                                }
                            }
                        },
                        xaxis: {
                            categories: ['Range 1', 'Range2'],
                            title: {
                                text: 'Groups',
                            },
                        },
                        legend: {
                            show: true,
                            position: 'right',
                        },
                        title: {
                            text: 'Title for Graph',
                            style: {
                                fontSize: 20,
                            }
                        },
                        subtitle: {
                            text: 'Subtitle for graph... Blah.'
                        }
                    }}
                >
                </Chart>

                <Chart
                    type="donut"
                    width={600}
                    height={600}
                    series={[50, 50, 20, 20.12, 5, 5, 5, 5, 5, 5]}
                    options = {{
                        labels: ["Income", "SSI", "SSDI", "SNAP", "Sec. 8", "LIEAP", "Federal Tax",
                            "State Tax", "Medicare Tax", "SS Tax"],
                        dataLabels: {
                            enabled: true,
                            formatter: function(val, opts) {
                                return "$" + opts.w.globals.series[opts.seriesIndex];
                            }
                        },
                        plotOptions: {
                            pie: {
                                startAngle: -90,
                                endAngle: 270
                            }
                        },
                        fill: {
                            type: 'gradient',
                        },
                        legend: {
                            formatter: function (val, opts) {
                                return val + " - $" + opts.w.globals.series[opts.seriesIndex]
                            }
                        },
                        // theme: {
                        //     mode: 'dark'
                        // },
                        title: {
                            text: 'Gradient Donut with custom Start-angle'
                        },
                        responsive: [{
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200
                                },
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }]
                    }}
                > </Chart>

                <Chart
                    width={600}
                    height={400}
                    series={[
                        {
                            name: 'Income',
                            type: 'column',
                            data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
                        }, {
                            name: 'Cashflow',
                            type: 'column',
                            data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
                        }, {
                            name: 'Revenue',
                            type: 'line',
                            data: [20, 29, 37, 36, 44, 45, 50, 58]
                        }
                        ]}
                    options={{

                        chart: {
                            height: 350,
                            type: 'line',
                            stacked: false
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            width: [1, 1, 4]
                        },
                        title: {
                            text: 'XYZ - Stock Analysis (2009 - 2016)',
                            align: 'left',
                            offsetX: 110
                        },
                        xaxis: {
                            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
                        },
                        yaxis: [
                            {
                                seriesName: 'Expenses',
                                axisTicks: {
                                    show: true,
                                },
                                axisBorder: {
                                    show: true,
                                    color: '#008FFB'
                                },
                                labels: {
                                    style: {
                                        colors: '#008FFB',
                                    }
                                },
                                title: {
                                    text: "Expenses",
                                    style: {
                                        color: '#008FFB',
                                    }
                                },
                                tooltip: {
                                    enabled: true
                                }
                            },
                            {
                                seriesName: 'Income',
                                opposite: true,
                                axisTicks: {
                                    show: true,
                                },
                                axisBorder: {
                                    show: true,
                                    color: '#00E396'
                                },
                                labels: {
                                    style: {
                                        colors: '#00E396',
                                    }
                                },
                                title: {
                                    text: "Income",
                                    style: {
                                        color: '#00E396',
                                    }
                                },
                            },
                            {
                                seriesName: 'Difference',
                                opposite: true,
                                axisTicks: {
                                    show: true,
                                },
                                axisBorder: {
                                    show: true,
                                    color: '#FEB019'
                                },
                                labels: {
                                    style: {
                                        colors: '#FEB019',
                                    },
                                },
                                title: {
                                    text: "Difference (compared to not working)",
                                    style: {
                                        color: '#FEB019',
                                    }
                                }
                            },
                        ],
                        tooltip: {
                            fixed: {
                                enabled: true,
                                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                                offsetY: 30,
                                offsetX: 60
                            },
                        },
                        legend: {
                            horizontalAlign: 'left',
                            offsetX: 40
                        }
                    }}

                />

            </div>
        );
    }
}


export default Counter;