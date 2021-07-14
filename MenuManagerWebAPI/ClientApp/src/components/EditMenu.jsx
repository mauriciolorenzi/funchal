import React from 'react';
import { useParams } from 'react-router';

export const EditMenu = () => {

    let { id } = useParams();

  //  const constructor = (props) => {
  //  super(props);
  //  this.state = { forecasts: [], loading: true };
  //}

  //const componentDidMount = () => {
  //  this.populateWeatherData();
  //}

  //const renderForecastsTable = (forecasts) => {
  //  return (
  //    <table className='table table-striped' aria-labelledby="tabelLabel">
  //      <thead>
  //        <tr>
  //          <th>Date</th>
  //          <th>Temp. (C)</th>
  //          <th>Temp. (F)</th>
  //          <th>Summary</th>
  //        </tr>
  //      </thead>
  //      <tbody>
  //        {forecasts.map(forecast =>
  //          <tr key={forecast.date}>
  //            <td>{forecast.date}</td>
  //            <td>{forecast.temperatureC}</td>
  //            <td>{forecast.temperatureF}</td>
  //            <td>{forecast.summary}</td>
  //          </tr>
  //        )}
  //      </tbody>
  //    </table>
  //  );
  //}

    //let contents = this.state.loading
    //    ? <p><em>Loading...</em></p>
    //    : EditMenu.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <p>ID = {id}</p>
      </div>
    );

  //async const populateWeatherData = () => {
  //  const response = await fetch('weatherforecast');
  //  const data = await response.json();
  //  this.setState({ forecasts: data, loading: false });
  //}
}
