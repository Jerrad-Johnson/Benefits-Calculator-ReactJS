import React from 'react';

function About (){
        return (
            <div className={"container bg-gray-300 border-solid border-2 border-gray-400 text-gray-700 p-5 " +
                "md:flex md:justify-around mx-auto md:w-140 leading-5 drop-shadow-md " +
                "rounded-lg md:max-w-5xl"}>
                <div className={"about md:pr-10"}>
                    <h2 className={"text-center mb-2 font-bold font-serif text-xl drop-shadow-sm"}>About</h2>
                    <span className={"about"}>This calculator was made disabled persons to see how much they'd come out
                        ahead or behind if they started working. Unfortunately, it is often the case that working actually
                        means losing more in assistance than the amount earned by working
                        -- and disabled persons are often barely scraping by to begin with.
                    </span>
                    <br /><br />
                    <h2 className={"text-center mb-2 font-bold font-serif text-xl drop-shadow-sm"}>Notes</h2>
                    <span className={"about"}>The calculations assume that you're working as a W2 (regular employee position),
                        not as a 1099 (contractor) or business owner. In the latter cases your medicare and SS taxes
                        will double, and at lesat with owning a business, SSDI may average your income over the year
                        to determine your  benefits for the next year.
                        <br /><br />
                        As well, this calculator was made for the year 2018. Rules will change; for example, the federal
                        income tax standard deduction regularly changes. In 2018, it was $12,000.
                    </span>
                    <br /><br />
                </div>

                <div className={"calculations md:pl-10"}>
                    <h2 className={""}>Calculations</h2>
                    <span className={"about"}>All calculations are based on monthly values. If your salary is $24,000,
                        divide by 12 (number months in a year) and enter $2,000 as your income.
                        <br /><br />
                        The SSI calculation loss is based on half your income, minus $20 (the first $20 is not counted).
                        <br /><br />
                        The SSDI calculation is based on whether your income is $1,180 or higher. If it is, then you lose
                        all of your SSDI. If it is not, then you lose none of it.
                        <br /><br />
                        The SNAP and Section 8 calculations are based on 1/3 of your income.
                        <br /><br />
                        The LIEAP (energy assistance) calculation is based on whether your income exceeds $1,485. Like
                        the SSDI calculation, it is all-or-nothing.
                        <br /><br />
                        The federal income tax calculation is based on the progressive bracketing system, and assumes a
                        standard FY deduction of $12,000.
                        <br /><br />
                        The medicare income tax calculation is 1.45% of your income.
                        <br /><br />
                        The social security tax calculation is 6.2% of your income, up to a monthly earning of $10,700.
                        <br /><br />

                    </span>
                </div>

            </div>
        );
}



export default About;

