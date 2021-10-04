const api = "https://coronavirus-19-api.herokuapp.com/countries";
var result = document.getElementById("result-data");
var error = document.getElementById("error");
var load = document.getElementById("loader");
var safe = document.getElementById("safe");
result.style.display = "none";
error.textContent = "";
load.style.display = "none";
safe.style.display = "none";

const form = document.getElementById("form-data");
const country = document.getElementById("country-name");

const searchForCountry = async (countryname) => {
    safe.style.display = "none";
    result.style.display = "none";
    load.style.display = "block";
    error.textContent = "";
    const res = await fetch(api);
    const data = await res.json();
    console.log(data);

    for (let i = 0; i < data.length; i++){
        const val = data[i];
        var c = val.country;
        if (c.toUpperCase() === countryname.toUpperCase()) {
            load.style.display = "none";
            document.getElementById("newCases").textContent = val.todayCases;
            document.getElementById("newDeaths").innerHTML = val.todayDeaths;
            document.getElementById("TotalCases").innerHTML = val.cases;
            document.getElementById("Totalrecovered").innerHTML = val.recovered;
            document.getElementById("TotalDeaths").innerHTML = val.deaths;
            document.getElementById("TotalTests").innerHTML = val.totalTests;
            result.style.display = "block";
            safe.style.display = "block";
        }
    }
    if (result.style.display === "none") {
        load.style.display = "none";
        error.textContent = "No data for the country you have requested !";
    }
}

const handleSubmit = async e => {
    e.preventDefault();
    searchForCountry(country.value);
    console.log(country.value);
};

form.addEventListener("submit", e => handleSubmit(e));