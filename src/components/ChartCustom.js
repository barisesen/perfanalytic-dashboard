import React, { Component } from 'react';
import Chart from "react-apexcharts";

export default class ChartCustom extends Component {
constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      name: props.name,
      series: props.series,
      dates: props.dates,
      type: props.type || 'line'
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.series !== props.series) {
      return { 
        id: props.id,
        name: props.name,
        series: props.series,
        dates: props.dates,
        type: props.type
      }
    }
    return state;
  }

  getOptions() {
    return {
        colors: ['#'+(Math.random()*0xFFFFFF<<0).toString(16)],
        title: {
          text: this.state.name,
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
        id: `custom-chart-${this.state.id}`,
      },
      xaxis: {
        categories: this.state.dates,
      }
    };
  }

  getSeries() {
    return  [
        {
          name: this.state.name,
          data: this.state.series
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