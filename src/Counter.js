import React, {Component} from 'react';
import Chart from "react-apexcharts";

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

            ssdiLost: 0,
            ssdiRemaining: 0,
            ssiLost: 0,
            ssiRemaining: 0,

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

    updateIncomeFromInputForm(){
        let val = document.querySelector("." + "income").valueAsNumber;
        if (isNaN(val)) {
            val = 0;
        }

        this.setState({
            "income": val
        }, function () {
            this.ssdiLosses();
        })
    }


    updateValueFromInputForms(name, caseValue) {
        let val = document.querySelector("." + name).valueAsNumber;
        if (typeof caseValue === 'undefined') {
            let caseValue = "nothing";
        }

        if (isNaN(val)) {
            val = 0;
        }

        this.setState({
            [name]: val
        }, function () {
            switch (caseValue) {
                case "ssdi":
                    this.ssdiLosses();
                    break;
                case "ssi":
                    this.ssiLosses();
                    break;
            }
        })
    }

    ssdiLosses() {
        let maxLoss = (this.state.income - 20) / 2; // 490
        if (this.state.income > 20) {
            if (maxLoss <= this.state.ssdiAssistanceValue) {
                this.setState({
                    "ssdiLost": maxLoss,
                    "ssdiRemaining": this.state.ssdiRemaining,
                })
            } else if (maxLoss > this.state.ssdiAssistanceValue) {
                this.setState({
                    "ssdiLost": this.state.ssdiAssistanceValue,
                    "ssdiRemaining": 0,
                })
            }
        }
    }

    ssiLosses() {
        let ssiCutOff = 1180;
        if (this.state.income >= ssiCutOff) {
            this.setState({
                "ssiLost": this.state.ssiAssistanceValue,
                "ssiRemaining": 0,
            })
        } else {
            this.setState({
                "ssiLost": 0,
                "ssiRemaining": this.state.ssiAssistanceValue,
            })
        }
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
        //placeholder = [this.state.ssdiLost]




        return (
            <div>
                <Chart
                    type="donut"
                    width={600}
                    height={600}
                    series={[
                        this.state.income,
                        this.state.ssiAssistanceValue,
                        this.state.ssdiRemaining,
                        this.state.snapAssistanceValue,
                        this.state.housingAssistanceValue,
                        this.state.energyAssistanceValue,
                        this.state.pellAssistanceValue,
                        this.state.medicareAssistanceValue,
                        this.state.medicaidAssistanceValue,
                        this.state.federalTaxes,
                        /*State Tax,*/
                        this.state.medicareTax,
                        this.state.ssTax,
                        this.state.ssdiLost]}
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
                            "SS Tax",
                            "ssdiLost",
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
                        this.updateIncomeFromInputForm()}
                           defaultValue={this.state.income}/>  Income {`${this.state.income}`} <br/>

                    SSI Income<br />
                    <input type="number" className={`${ssiAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(ssiAssistanceValue, "ssi")}
                           defaultValue={this.state.ssiAssistanceValue}/> Lost: {`${this.state.ssiLost}`}<br />

                    SSDI Income<br />
                    <input type="number" className={`${ssdiAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(ssdiAssistanceValue, "ssdi")}
                       defaultValue={this.state.ssdiAssistanceValue}/> Lost: {`${this.state.ssdiLost}`}<br />

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
                    <input type="number" className={`${medicareAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(medicareAssistanceValue)}
                           defaultValue={this.state.medicareAssistanceValue}/> Lost:<br />

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
            </div>
        );
    }
}


export default Counter;