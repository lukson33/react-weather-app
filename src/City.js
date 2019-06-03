import React, { Component } from "react";
import "./Main.css";

export class City extends Component {
  render() {
    return (
      <div class="City">
        <p>{this.props.name}</p>
        <p>{this.props.weather}</p>
        <p>{this.props.temp}</p>
      </div>
    );
  }
}

export default City;
