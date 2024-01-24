import axios from 'axios'

export const getCountries = async () => {
    try {
        const res = await axios.get("https://restcountries.com/v3.1/all")
        const countries = (res.data).map((item: any) => item.name.official)
        // console.log("data", countries)
        return countries
    } catch (error: any) {
        console.log(error.message)
        return []
    }
}