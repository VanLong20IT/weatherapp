import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import SearchCity from "./components/SearchCity";
import Result from "./components/Result";
import NotFound from "./components/NotFound";
import "animate.css/animate.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListCountry from "./components/ListCountry";
import ListCity from "./components/ListCity";
// import FakeData from "./components/FakeData";

const list_city = ListCity;

// style
const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

// main
const APIkey = "d5f06af8af8115773a03baf9a20d99fc";

const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const days = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];
export default class App extends React.Component {
  state = {
    value: "",
    weatherInfo: null,
    error: false,
    arr: [],
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // test
  componentDidMount() {
    list_city.forEach((item) => {
      // get api without languege
      const weather = `https://api.openweathermap.org/data/2.5/weather?q=${item.name}&APPID=${APIkey}`;
      // get api with language
      // const weather = `https://api.openweathermap.org/data/2.5/weather?q=${item.name}&APPID=${APIkey}&lang=vi`;
      Promise.all([fetch(weather)])
        .then(([res1]) => {
          if (res1.ok) {
            return Promise.all([res1.json()]);
          }
          throw Error(res1.statusText);
        })
        .then(([data1]) => {
          const currentDate = new Date();
          const date = `${
            days[currentDate.getDay()]
          }, Ngày ${currentDate.getDate()}, ${
            months[currentDate.getMonth()]
          }, Năm ${currentDate.getFullYear()}`;
          const sunset = new Date(data1.sys.sunset * 1000)
            .toLocaleTimeString()
            .slice(0, 4);
          const sunrise = new Date(data1.sys.sunrise * 1000)
            .toLocaleTimeString()
            .slice(0, 4);

          const weatherInfo = {
            city: data1.name,
            country: data1.sys.country,
            date,
            description: data1.weather[0].description,
            main: data1.weather[0].main,
            temp: data1.main.temp,
            highestTemp: data1.main.temp_max,
            lowestTemp: data1.main.temp_min,
            sunrise,
            sunset,
            clouds: data1.clouds.all,
            humidity: data1.main.humidity,
            wind: data1.wind.speed,
          };
          this.setState({
            weatherInfo,
            error: false,
          });

          this.setState((prevState) => ({
            arr: [...prevState.arr, weatherInfo],
          }));
        })
        .catch((error) => {
          this.setState({
            weatherInfo: null,
          });
        });
    });
  }

  handleSearchCity = (e) => {
    if (e) e.preventDefault();
    const { value } = this.state;

    const APIkey = "4ab4acb103ca20bdcb9c98bb8cc7daa9";

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}`;

    Promise.all([fetch(weather)])
      .then(([res1]) => {
        if (res1.ok) {
          return Promise.all([res1.json()]);
        }
        throw Error(res1.statusText);
      })
      .then(([data1]) => {
        const months = [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ];
        const days = [
          "Chủ nhật",
          "Thứ hai",
          "Thứ ba",
          "Thứ tư",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
        ];
        const currentDate = new Date();
        const date = `${
          days[currentDate.getDay()]
        }, Ngày ${currentDate.getDate()}, ${
          months[currentDate.getMonth()]
        }, Năm ${currentDate.getFullYear()}`;
        const sunset = new Date(data1.sys.sunset * 1000)
          .toLocaleTimeString()
          .slice(0, 4);
        const sunrise = new Date(data1.sys.sunrise * 1000)
          .toLocaleTimeString()
          .slice(0, 4);

        const weatherInfo = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
        };
        const cityExist = this.state.arr.find(element=>element.city===weatherInfo.city);
        if (cityExist===undefined){
          this.setState((prevState) => ({
            arr: [...prevState.arr, weatherInfo],
          }));
        }
        
        this.setState({
          weatherInfo,
          error: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
  };

  getLocalData = (city, array) => {
    const data = array.find((dt) => dt.city === city);
    this.setState({
      weatherInfo:data,
      error:false,
    });
  };

  onCityChange = (city) => {
    this.setState({ ...this.state, value: city }, () => {
      this.handleSearchCity();
    });
  };

  render() {
    const { value, weatherInfo, error } = this.state;
    return (
      <>
        <WeatherWrapper>
          <div className="container">
            <Header />
            <SearchCity
              value={value}
              showResult={(weatherInfo || error) && true}
              change={this.handleInputChange}
              submit={this.handleSearchCity}
            />
            <div className="row">
              <div className="col-md-4">
                <ListCountry
                  list={this.state.arr}
                  getLocalData = {this.getLocalData}
                />
              </div>
              <div className="col-md-8">
                {weatherInfo && <Result weather={weatherInfo} />}
                {console.log(this.state.arr[0])}
                {error && <NotFound error={error} />}
              </div>
            </div>
            <Footer />
          </div>
        </WeatherWrapper>
      </>
    );
  }
}
