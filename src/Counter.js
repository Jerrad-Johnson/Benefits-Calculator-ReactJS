import React, {Component} from 'react';
import Chart from "react-apexcharts";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.ssdiCutoff = 1180;
        this.ssTaxCutoff = 10700;
        this.ssTaxPercentage = 6.2;
        this.medicareTaxPercentage = 1.45;
        this.federalAfterFica = 92.35;
        this.handleLoad = this.handleLoad.bind(this);

        this.fedBracket = [0, 793.75, 3225, 6875, 13125, 16666, 41666.67];
        this.fedPercent = [10, 12, 22, 24, 32, 35, 37];
        this.bracketSpread = [];
        this.trueBracketSpread = []; // For finding distance between brackets
        this.fedOwedFromPreviousBracket = [];
        this.fedOwedFromPreviousBrackets = [];

        this.state = {
            income: 1185,
            ssiAssistanceValue: 146,
            ssdiAssistanceValue: 624,
            snapAssistanceValue: 170,
            housingAssistanceValue: 407,
            energyAssistanceValue: 40,
            medicareAssistanceValue: 0,
            medicaidAssistanceValue: 0,

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
            stateTaxLost: 0,
            pellLost: 0,
            medicareLost: 0,
            medicaidLost: 0,
            federalTaxLost: 0,
            medicareTaxLost: 0,
            ssTaxLost: 0,
            stateTaxPercentage: 0,
            combinedLosses: 0,
            differenceIncomeVsLosses: 0,
            deductedEarning: 118,
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
            this.fedTaxBracketArray();
            this.calculateTotalLosses();
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
                        [name]: val,
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
                case "medicaid":
                    this.medicaidLosses();
                    break;
                case "medicare":
                    this.medicareLosses();
                    break;
                default:
                    break;
            }
            this.calculateTotalLosses();
        })
    }

    ssiLosses() {
        let maxLoss = (this.state.income - 20) / 2;
        let remainder = (this.state.ssiAssistanceValue - maxLoss);
        if (this.state.income > 20) {
            if (maxLoss < this.state.ssiAssistanceValue) {
                this.setState({
                    "ssiLost": maxLoss,
                    "ssiRemaining": remainder,
                }, function () {
                    this.medicaidLosses();
                })
            } else if (maxLoss >= this.state.ssiAssistanceValue) {
                this.setState({
                    "ssiLost": this.state.ssiAssistanceValue,
                    "ssiRemaining": 0,
                }, function () {
                    this.medicaidLosses();
                })
            }
        } else {
            this.setState({
                "ssiLost": 0,
                "ssiRemaining": this.state.ssiAssistanceValue,
            }, function () {
                this.medicaidLosses();
            })
        }
    }


    ssdiLosses() {
        if (this.state.income >= this.ssdiCutoff) {
            this.setState({
                "ssdiLost": this.state.ssdiAssistanceValue,
                "ssdiRemaining": 0,
            })
        } else {
            this.setState({
                "ssdiLost": 0,
                "ssdiRemaining": this.state.ssdiAssistanceValue,
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

        if (this.state.stateTaxPercentage !== 0) {
            let loss = this.state.income * (this.state.stateTaxPercentage / 100);
            this.setState({
                "stateTaxLost": loss,
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

// Federal Income Tax ... change Earning to Deducted Earning
    fedTaxBracketArray() {
        if (this.fedOwedFromPreviousBrackets.length === 0) {
            for (let i = 0; i < 6; i++) {
                this.bracketSpread = this.trueBracketSpread[i] = this.fedBracket[i + 1] - this.fedBracket[i];
                this.bracketSpread = (this.bracketSpread / 100) * this.fedPercent[i];
                this.fedOwedFromPreviousBracket.push(this.bracketSpread);
                this.fedOwedFromPreviousBrackets[i] = this.fedOwedFromPreviousBracket.reduce((acc, val) => {
                    return acc + val;
                });
            }
        }

        this.setState({
            "deductedEarning": (this.state.income - 1000) * (this.federalAfterFica / 100),
        }, function () {
            this.federalTaxScale();
        })
    }

    federalTaxScale() {
        let totalExpense,
            remainderFromPreviousTaxBrackets;

        if (this.state.deductedEarning <= this.fedBracket[1]) {
            totalExpense = (this.state.deductedEarning / 100) * this.fedPercent[0];
        } else if (this.state.deductedEarning <= this.fedBracket[2]) {
            remainderFromPreviousTaxBrackets = this.state.deductedEarning - this.fedBracket[1];
            totalExpense = (remainderFromPreviousTaxBrackets * this.fedPercent[1] / 100) + this.fedOwedFromPreviousBrackets[0];
        } else if (this.state.deductedEarning <= this.fedBracket[3]) {
            remainderFromPreviousTaxBrackets = this.state.deductedEarning - this.fedBracket[2];
            totalExpense = (remainderFromPreviousTaxBrackets * this.fedPercent[2] / 100) + this.fedOwedFromPreviousBrackets[1];
        } else if (this.state.deductedEarning <= this.fedBracket[4]) {
            remainderFromPreviousTaxBrackets = this.state.deductedEarning - this.fedBracket[3];
            totalExpense = (remainderFromPreviousTaxBrackets * this.fedPercent[3] / 100) + this.fedOwedFromPreviousBrackets[2];
        } else if (this.state.deductedEarning <= this.fedBracket[5]) {
            remainderFromPreviousTaxBrackets = this.state.deductedEarning - this.fedBracket[4];
            totalExpense = (remainderFromPreviousTaxBrackets * this.fedPercent[4] / 100) + this.fedOwedFromPreviousBrackets[3];
        } else if (this.state.deductedEarning <= this.fedBracket[6]) {
            remainderFromPreviousTaxBrackets = this.state.deductedEarning - this.fedBracket[5];
            totalExpense = (remainderFromPreviousTaxBrackets * this.fedPercent[5] / 100) + this.fedOwedFromPreviousBrackets[4];
        } else if (this.state.deductedEarning > this.fedBracket[6]) {
            remainderFromPreviousTaxBrackets = this.state.deductedEarning - this.fedBracket[6];
            totalExpense = (remainderFromPreviousTaxBrackets * this.fedPercent[6] / 100) + this.fedOwedFromPreviousBrackets[5];
        } else {
            totalExpense = 0;
        }

        if (0 < totalExpense) {
            this.setState({
                "federalTaxLost": totalExpense,
            }, function() {
                this.medicareTaxScale()
                this.ssTaxScale()
            });
        } else {
            this.setState({
                "federalTaxLost": 0,
            }, function() {
                this.medicareTaxScale();
                this.ssTaxScale();
            });
        }
    }

    medicareTaxScale(){
        if (this.state.income > 0){
            this.setState({
                "medicareTaxLost": this.state.income * (this.medicareTaxPercentage / 100),
            });
        } else {
            this.setState({
                "medicareTaxLost": 0,
            });
        }
    }

    ssTaxScale() {
        if (this.state.income >= this.ssTaxCutoff) {
            this.setState({
                "ssTaxLost": this.ssTaxCutoff * (this.ssTaxPercentage / 100),
            }, function() {
                this.calculateTotalLosses();
            });
        } else {
            this.setState({
                "ssTaxLost": this.state.income * (this.ssTaxPercentage / 100),
            }, function() {
                this.calculateTotalLosses();
            });
        }
    }

    calculateTotalLosses(){
        let combinedLosses = (this.state.ssdiLost + this.state.ssiLost + this.state.snapLost + this.state.housingLost +
            this.state.energyLost + this.state.stateTaxLost + this.state.pellLost + this.state.medicareLost +
            this.state.medicaidLost + this.state.federalTaxLost + this.state.medicareTaxLost +
            this.state.ssTaxLost);

         this.setState({
            "combinedLosses": combinedLosses,
            "differenceIncomeVsLosses": (this.state.income - combinedLosses),
        });
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

        return (
            <div>
                <Chart
                    type="donut"
                    width={700}
                    height={800}

                    series={[
                        this.state.income,
                        this.state.ssiLost,
                        this.state.ssdiLost,
                        this.state.snapLost,
                        this.state.housingLost,
                        this.state.energyLost,
                        this.state.pellLost,
                        this.state.medicareLost,
                        this.state.medicaidLost,
                        this.state.federalTaxLost,
                        this.state.stateTaxLost,
                        this.state.medicareTaxLost,
                        this.state.ssTaxLost,
                    ]}
                    options = {{
                        colors: [
                            '#00aa00', '#880000', '#880000', '#AA0000', '#AA0000', '#AA0000', '#AA0000',
                            '#AA0000', '#AA0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000',

                        ],
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
                            "State Tax",
                            "Medicare Tax",
                            "SS Tax",
                        ],
                        dataLabels: {
                            enabled: true,
                            formatter: function(val, opts) {
                                return "$ " + opts.w.globals.series[opts.seriesIndex].toFixed(2);
                            }
                        },
                        plotOptions: {
                            pie: {
                                startAngle: 0,
                                endAngle: 360,
                            }
                        },
                        fill: {
                            type: 'gradient',
                        },
                        legend: {
                            formatter: function (val, opts) {
                                return val + " - $" + opts.w.globals.series[opts.seriesIndex].toFixed(2)
                            }
                        },
                        title: {
                            text: 'Income vs. Losses associated with your income.'
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

                <br />
                <form>
                    Income<br />
                    <input type="number" className={`${income}`} onChange={() =>
                        this.updateIncomeFromInputForm()}
                           defaultValue={this.state.income}/><br/>

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
                           defaultValue={this.state.stateTaxPercentage}/> Lost: {`${this.state.stateTaxLost.toFixed(2)}`} <br /><br />

                    <span className={"mainBody"}>We do not know how much medical assistance or the pell grant
                        (if you have it) is worth <i>to you</i>, so you may either leave these blank or enter a number
                        that you feel appropriate.
                        <br /><br />For medicare and the pell, the calculator will assume you're entering
                        an amount you will lose.
                        <br /><br />For medicaid, it determines loss by whether or not you're still
                        receiving any SSI income.
                        <br />
                    </span> <br/><br/>

                    Medicaid est. Value<br />
                    <input type="number" className={`${medicaidAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(medicaidAssistanceValue, "medicaid")}
                           defaultValue={this.state.medicaidAssistanceValue}/> Lost: {`${this.state.medicaidLost.toFixed(2)}`}<br />

                    Medicare est. Loss<br />
                    <input type="number" className={`${medicareAssistanceValue}`} onChange={() =>
                        this.updateValueFromInputForms(medicareAssistanceValue, "medicare")}
                           defaultValue={this.state.medicareAssistanceValue}/> Lost: {`${this.state.medicareLost.toFixed(2)}`}<br />

                    Pell Grant est. Loss<br />
                    <input type="number" className={`${pellLost}`} onChange={() =>
                        this.updateValueFromInputForms(pellLost, "pell")}
                           defaultValue={this.state.pellLost}/> Lost: {`${this.state.pellLost.toFixed(2)}`}<br />

                    <br /><br />
                    Lost to federal income tax: {`${this.state.federalTaxLost.toFixed(2)}`} <br />
                    Lost to medicare tax: {`${this.state.medicareTaxLost.toFixed(2)}`} <br />
                    Lost to social security tax: {`${this.state.ssTaxLost.toFixed(2)}`}<br /><br />
                    Earned: {`${this.state.income.toFixed(2)}`}<br />
                    Combined losses: {`${this.state.combinedLosses.toFixed(2)}`}<br />
                    Difference: {`${this.state.differenceIncomeVsLosses.toFixed(2)}`}
                </form>
            </div>
        );
    }
}

export default Counter;

//TODO Note that this calc assumes you're a W2 and is made for year X.