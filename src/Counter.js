import React, {Component} from 'react';
import Chart from "react-apexcharts";
//import Calculations from './Calculations.js';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.handleLoad = this.handleLoad.bind(this);

        this.state = {
            income:                 1185,
            ssiAssistanceValue:     146,
            ssdiAssistanceValue:    624,
            snapAssistanceValue:    170,
            housingAssistanceValue: 407,
            energyAssistanceValue:  40,
            medicareAssistanceValue:0,
            medicaidAssistanceValue:0,
            pellAssistanceValue:    50,
            snapCutOff:             1300,
            stateTaxPercentage:     0,
            federalTaxes:           0,
            medicareTax:            0,
            ssTax:                  0,
            deductedEarning:        118,
            steps:                  [100, 250, 500, 1000, 1170, 1190, 1500, 2000, 3000,
                                    4000],
        }
    }


        updateValueFromInputForms(name) {

            let val = document.querySelector("." + name).valueAsNumber;
            console.log(val);
            if (isNaN(val)){
                val = 0;
            }

            this.setState({
                [name]: val
            }/*, () => {
                console.log(5)
            }*/)
        }

        updateLossesPerSource(name, val) {
            if (isNaN(val)){
                val = 0;
            }

            this.setState({
                [name]: val
            }/*, () => {
                console.log(5)
            }*/)
        }


        increment() {
            this.setState({
                income: this.state.income + 1
            })
        }


         //   let propertyName = Object.keys({nameAndVal})[0];
         //   console.log(propertyName);


        ssiScale() {
            if (this.state.income > 20) {
                let ssiLost = (this.state.income - 20) / 2;
                    if (this.state.ssiAmount >= ssiLost) {
                        this.updateLossesPerSource("ssiLost", ssiLost);
                    } else {
                        return this.ssiAmount; // The loss is equal to the total assistance
                    }
                return ssiLost;
            } else {
                return 0;
            }
        }
        componentDidMount() {
            window.addEventListener('load', this.handleLoad);
        }

        componentWillUnmount() {
            window.removeEventListener('load', this.handleLoad)
        }

        handleLoad() {
            console.log("test");
            //this.updateLossesPerSource('ssiAssistanceValue', 500);
        }


    render() {

        const
        income = "income",
        ssiAssistanceValue = "ssiAssistanceValue",
        ssdiAssistanceValue = "ssdiAssistanceValue",
        snapAssistanceValue = "snapAssistanceValue",
        housingAssistanceValue = "housingAssistanceValue",
        energyAssistanceValue = "energyAssistanceValue",
        stateTaxPercentage = "stateTaxPercentage",
        medicaidAssistanceValue = "medicaidAssistanceValue",
        medicareAssistanceValue = "medicareAssistanceValue",
        pellAssistanceValue = "pellAssistanceValue";




        return (
            <div>

                Count - {this.state.income}
                <button onClick={() => this.updateLossesPerSource("ssiLost", 500)}>Increment</button>

                <Chart
                    type="donut"
                    width={600}
                    height={600}
                    series={[
                        this.state.income,
                        this.state.ssiAssistanceValue,
                        this.state.ssdiAssistanceValue,
                        this.state.snapAssistanceValue,
                        this.state.housingAssistanceValue,
                        this.state.energyAssistanceValue,
                        this.state.pellAssistanceValue,
                        this.state.medicareAssistanceValue,
                        this.state.medicaidAssistanceValue,
                        this.state.federalTaxes,
                        /*State Tax,*/
                        this.state.medicareTax,
                        this.state.ssTax]}
                    options = {{
                        labels: [
                            "Income",
                            "SSI",
                            "SSDI",
                            "SNAP",
                            "Sec. 8",
                            "LIEAP",
                            "Pell Grant",
                            "Medicare",
                            "Medicaid",
                            "Federal Tax",
                            /*"State Tax",*/
                            "Medicare Tax",
                            "SS Tax"
                        ],
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
                <br />
                <form>

                    Income<br />
                    <input type="number" className={`${income}`} onChange={() =>
                        this.updateValueFromInputForms(income)}
                           defaultValue={this.state.income}/> <br/>

                    SSI Income<br />
                    <input type="number" className={`${ssiAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(ssiAssistanceValue)}
                           defaultValue={this.state.ssiAssistanceValue}/> Lost: <br />

                    SSDI Income<br />
                    <input type="number" className={`${ssdiAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(ssdiAssistanceValue)}
                           defaultValue={this.state.ssdiAssistanceValue}/> Lost:<br />

                    SNAP Credit<br />
                    <input type="number" className={`${snapAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(snapAssistanceValue)}
                           defaultValue={this.state.snapAssistanceValue}/> Lost:<br />

                    Section 8 Credit<br />
                    <input type="number" className={`${housingAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(housingAssistanceValue)}
                           defaultValue={this.state.housingAssistanceValue}/> Lost:<br />

                    LIEAP Credit<br />
                    <input type="number" className={`${energyAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(energyAssistanceValue)}
                           defaultValue={this.state.energyAssistanceValue}/> Lost:<br />

                    Pell Grant Credit<br />
                    <input type="number" className={`${pellAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(pellAssistanceValue)}
                           defaultValue={this.state.pellAssistanceValue}/> Lost:<br />

                    Medicare est. Value<br />
                    <input type="number" className={`${medicaidAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(medicaidAssistanceValue)}
                           defaultValue={this.state.medicaidAssistanceValue}/> Lost:<br />

                    Medicaid est. Value<br />
                    <input type="number" className={`${medicaidAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(medicaidAssistanceValue)}
                           defaultValue={this.state.medicaidAssistanceValue}/> Lost:<br />

                    State Tax Percentage<br />
                    <input type="number" className={`${stateTaxPercentage}`} onChange={() =>
                        this.updateValueFromInputForms(stateTaxPercentage)}
                           defaultValue={this.state.stateTaxPercentage}/> Lost: <br />

                    <br /><br />
                    Lost to medicare tax:  <br />
                    Lost to social security tax: <br />
                    Earned:{/*
                        <font color="green">{ earning.toFixed(2) }</font> --- Lost:
                        <font color="red"> { this.state.combinedLoss }</font>*/}
                </form>


                {/*
                <Chart
                    type="bar"
                    width={600}
                    height={600}
                    series={[
                        {
                            name: 'Stuff',
                            data: [`${this.state.earning}`, 200],
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
                </Chart>*/}
            </div>
        );
    }
}


export default Counter;