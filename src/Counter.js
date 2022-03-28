import React, {Component} from 'react';
import Chart from "react-apexcharts";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.ssiCutoff = 1180;
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

            ssdiLost: 0,
            ssdiRemaining: 0,
            ssiLost: 0,
            ssiRemaining: 0,
            snapLost: 0,
            snapRemaining: 0,
            housingLost: 0,
            housingRemaining: 0,
            energyLost: 0,
            energyRemaining: 0,
            taxLost: 0,
            pellLost: 0,
            medicareLost: 0,
            medicaidLost: 0,

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
        this.updateIncomeFromInputForm();
    }

    updateIncomeFromInputForm(){
        let val = document.querySelector(".income").valueAsNumber;
        if (isNaN(val)) {
            val = 0;
        }

        this.setState({
            "income": val
        }, function () {
            this.ssdiLosses();
            this.ssiLosses();
            this.snapLosses();
            this.housingLosses();
            this.energyLosses();
            this.taxLosses();
            this.medicareLosses();
            this.medicaidLosses();
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
                case "snap":
                    this.snapLosses();
                    break;
                case "housing":
                    this.housingLosses();
                    break;
                case "energy":
                    this.energyLosses();
                    break;
                case "tax":
                    this.taxLosses();
                    break;
                case "medicare":
                    this.medicareLosses();
                    break;
                default:
                    break;
            }
        })
    }

    ssdiLosses() {
        let maxLoss = (this.state.income - 20) / 2;
        if (this.state.income > 20) {
            if (maxLoss < this.state.ssdiAssistanceValue) {
                let remainder = (this.state.ssdiAssistanceValue - maxLoss);
                this.setState({
                    "ssdiLost": maxLoss,
                    "ssdiRemaining": remainder, //TODO Check this
                }, function () {
                    this.medicaidLosses();
                })
            } else if (maxLoss >= this.state.ssdiAssistanceValue) {
                this.setState({
                    "ssdiLost": this.state.ssdiAssistanceValue,
                    "ssdiRemaining": 0,
                }, function () {
                    this.medicaidLosses();
                })
            }
        }
    }

    ssiLosses() {
        if (this.state.income >= this.ssiCutoff) {
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

    snapLosses() {
        let maxLoss = this.state.income / 3;
        let remaining = (this.state.snapAssistanceValue - maxLoss);

        if (this.state.snapAssistanceValue >= maxLoss ){
            this.setState({
                "snapLost": maxLoss,
                "snapRemaining": remaining,
            })
        } else if (this.state.snapAssistanceValue < maxLoss) {
            this.setState({
                "snapLost": this.state.snapAssistanceValue,
                "snapRemaining": 0,
            })
        }
    }

    housingLosses() {
        let maxLoss = this.state.income / 3;
        let remaining = (this.state.housingAssistanceValue - maxLoss);

        if (this.state.housingAssistanceValue >= maxLoss ){
            this.setState({
                "housingLost": maxLoss,
                "housingRemaining": remaining,
            })
        } else if (this.state.housingAssistanceValue < maxLoss) {
            this.setState({
                "housingLost": this.state.housingAssistanceValue,
                "housingRemaining": 0,
            })
        }
    }

    energyLosses() {
        if (this.state.income >= 1485) {
            this.setState({
                "energyLost": this.state.energyAssistanceValue,
                "energyRemaining": 0,
            })
        } else {
            this.setState({
                "energyLost": 0,
                "energyRemaining": this.state.energyAssistanceValue,
            })
        }
    }

    taxLosses(){
        if (this.state.stateTaxPercentage != 0) {
            let loss = this.state.income * (this.state.stateTaxPercentage / 100);
            this.setState({
                "taxLost": loss,
            })
        }
    }

    medicareLosses(){
        if (this.state.income >= this.ssiCutoff){
            this.setState({
                "medicareLost": this.state.medicareAssistanceValue,
            })
        } else {
            this.setState({
                "medicareLost": 0,
            })
        }
    }

    medicaidLosses(){
        console.log(this.state.ssdiRemaining);
        if (this.state.ssdiRemaining === 0){
            this.setState({
                "medicaidLost": this.state.medicaidAssistanceValue,
            })
        } else {
            this.setState({
                "medicaidLost": 0,
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
        pellLost = "pellLost";
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
                        this.state.pellLost,
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
                           defaultValue={this.state.income}/>  Income {`${this.state.income.toFixed(2)}`} <br/>

                    SSI Income<br />
                    <input type="number" className={`${ssiAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(ssiAssistanceValue, "ssi")}
                           defaultValue={this.state.ssiAssistanceValue}/> Lost: {`${this.state.ssiLost.toFixed(2)}`}<br />

                    SSDI Income<br />
                    <input type="number" className={`${ssdiAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(ssdiAssistanceValue, "ssdi")}
                       defaultValue={this.state.ssdiAssistanceValue}/> Lost: {`${this.state.ssdiLost.toFixed(2)}`}<br />

                    SNAP Credit<br />
                    <input type="number" className={`${snapAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(snapAssistanceValue, "snap")}
                           defaultValue={this.state.snapAssistanceValue}/> Lost: {`${this.state.snapLost.toFixed(2)}`}<br />

                    Section 8 Credit<br />
                    <input type="number" className={`${housingAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(housingAssistanceValue, "housing")}
                           defaultValue={this.state.housingAssistanceValue}/> Lost: {`${this.state.housingLost.toFixed(2)}`}<br />

                    LIEAP Credit<br />
                    <input type="number" className={`${energyAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(energyAssistanceValue, "energy")}
                           defaultValue={this.state.energyAssistanceValue}/> Lost: {`${this.state.energyLost.toFixed(2)}`}<br />

                    State Tax Percentage<br />
                    <input type="number" className={`${stateTaxPercentage}`} onChange={() =>
                        this.updateValueFromInputForms(stateTaxPercentage, "tax")}
                           defaultValue={this.state.stateTaxPercentage}/> Lost: {`${this.state.taxLost.toFixed(2)}`} <br /><br />

                    Pell Grant Credit<br />
                    <input type="number" className={`${pellLost}`} onChange={() =>
                        this.updateValueFromInputForms(pellLost, "pell")}
                           defaultValue={this.state.pellLost}/> Lost: {`${this.state.pellLost.toFixed(2)}`}<br />

                    Medicare est. Value<br />
                    <input type="number" className={`${medicareAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(medicareAssistanceValue, "medicare")}
                           defaultValue={this.state.medicareAssistanceValue}/> Lost: {`${this.state.medicareLost.toFixed(2)}`}<br />

                    Medicaid est. Value<br />
                    <input type="number" className={`${medicaidAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(medicaidAssistanceValue)}
                           defaultValue={this.state.medicaidAssistanceValue}/> Lost: {`${this.state.medicaidLost.toFixed(2)}`}<br />

                    <br /><br />
                    Lost to federal income tax: <br />
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