import { ITableData, ICountry } from '../dashboard/dashboard.model';

export class CommonUtils {
    public static tableData: ITableData[] = [];
    public static dates: string[] = [];
    public static getCountriesData(covidData): ICountry[] {
        const countries = [];
        for(let code in covidData) {
            countries.push({
                countryCode: code,
                countryName: covidData[code].location,
                continent: covidData[code].continent
            })
            CommonUtils.setTableData(covidData[code], code);
        }
        return countries;
    }
    public static getTableData(covidData, date: string) {
        CommonUtils.tableData = [];
        for(let code in covidData) {
            CommonUtils.setTableData(covidData[code], code, date);
        }
    }
    public static getGraphData(covidData) {
        const total_cases = [];
        const total_deaths = [];
        const new_cases = [];
        const new_deaths = [];
        const dates = [];
        // covidData.forEach(element => {
        //     total_cases.push(element.total_cases);
        //     total_deaths.push(element.total_deaths);
        //     new_cases.push(element.new_cases);
        //     new_deaths.push(element.new_deaths);
        //     dates.push(element.date);
        // });
        const index = covidData.length -31;
        for(let i = index; i < covidData.length; i++) {
            const element = covidData[i];
            total_cases.push(element.total_cases);
            total_deaths.push(element.total_deaths);
            new_cases.push(element.new_cases);
            new_deaths.push(element.new_deaths);
            dates.push(element.date);
            CommonUtils.dates.push(element.date);
        }
        return {
            total_cases,
            total_deaths,
            new_cases,
            new_deaths,
            dates
        }
    }
    private static setTableData(countryData, code: string, date?: string) {
        let lastIndex: number;
        if (date) {
            lastIndex = countryData.data.findIndex(ele => ele.date == date);
        }
        lastIndex = lastIndex >= 0 ? lastIndex : countryData.data.length - 1;
        CommonUtils.tableData.push({
            country: countryData.location,
            code: code,
            new_cases: countryData.data[lastIndex].new_cases,
            new_deaths: countryData.data[lastIndex].new_deaths,
            total_cases: countryData.data[lastIndex].total_cases,
            total_deaths: countryData.data[lastIndex].total_deaths,
            date: countryData.data[lastIndex].date
        })
    }
}
