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
                        theme: {
                            mode: 'dark'
                        },
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
                    series={[50, 50, 20, 20.12]}
                    options = {{
                        labels: ["Stuff", "Stuff2", "Stuff3", "Stuff4"],
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
                                return val + " - " + opts.w.globals.series[opts.seriesIndex]
                            }
                        },
                        theme: {
                            mode: 'dark'
                        },
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

            </div>
        );
    }
}


export default Counter;