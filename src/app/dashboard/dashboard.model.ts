export interface ITableData {
    country: string;
    new_cases: number;
    new_deaths: number;
    total_cases: number;
    total_deaths: number;
    date: string;
    code?: string;
}
export interface ICountry {
    countryCode: string;
    countryName: string;
    continent: string;
}