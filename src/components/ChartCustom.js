import React, { Component } from 'react';
import Chart from "react-apexcharts";

// X labels silenecek.
export default class ChartCustom extends Component {
constructor(props) {
    super(props);

    const { id, name, series, dates, type } = props;
    this.state = {
      id,
      name,
      series,
      dates,
      type: type || 'line',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { id, name, series, dates, type } = props;

    if (state.series !== series && Array.isArray(series) && Array.isArray(dates)) {
      return { 
        id,
        name,
        series,
        dates,
        type: type || 'line',
      }
    }
    return state;
  }

  getOptions() {
    const { id, name: text, dates } = this.state;
    return {
        colors: ['#'+(Math.random()*0xFFFFFF<<0).toString(16)],
        title: {
          text,
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '16px',
            color:  '#263238'
          },
      },
      chart: {
        id: `custom-chart-${id}`,
      },
      xaxis: {
        categories: dates, // Okunaklı tarih, 5 dakika önce vb.
      }
    };
  }

  getSeries() {
    const { name, series: data } = this.state;
    return [
        {
          name,
          data
        }
      ];
  }

  render () {
    return (
        <Chart
            options={this.getOptions()}
            series={this.getSeries()}
            type={this.state.type}
        />
    );
  }
}