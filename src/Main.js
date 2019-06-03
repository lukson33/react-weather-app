import React, { Component } from "react";
import City from "./City";
import axios from "axios";
import "./Main.css";
import uuid from "uuid/v4";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cities: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  async getData(e) {
    e.preventDefault();
    const API_KEY = "4f17ef4b19ebd1d2a6f2439b3a19f534";
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${
          this.state.city
        }&APPID=${API_KEY}`
      );
      //Extract data to object
      const city = {
        id: uuid(),
        name: response.data.name,
        weather: response.data.weather[0].main,
        temp: Math.floor(response.data.main.temp - 273.15)
      };
      //Add city to cities array
      this.setState(prevState => ({
        cities: [...prevState.cities, city],
        city: ""
      }));
      console.log(this.state.cities);
    } catch (error) {
      alert("Please enter a valid city");
    }
  }
  render() {
    return (
      <div>
        <h1>Please Enter Your City</h1>
        <form onSubmit={this.getData}>
          <input
            onChange={this.handleChange}
            type="text"
            name="city"
            value={this.state.city}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="container">
          {this.state.cities.map(c => (
            <City key={c.id} name={c.name} weather={c.weather} temp={c.temp} />
          ))}
        </div>
      </div>
    );
  }
}

export default Main;
