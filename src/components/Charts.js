import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap'
import ChartCustom from "./ChartCustom"

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        metrics: null
    };
  }
  
  componentDidMount() {
    // Url .env ye taşınmalı!
    fetch('http://localhost:3000/metrics')
      .then(response => response.json())
      .then(data => {
        this.setState({ metrics: data })
      });
  }
  render () {
    if (this.state.metrics !== null) {
     return (
      <Row>
        <Col lg={6} md={12}>
          <ChartCustom
            name="TTFB"
            series={this.state.metrics.map(metric => metric.ttfb)}
            dates={this.state.metrics.map(metric => metric.created_at)}
            type="line"
            id="ttfb"
          />
        </Col>
        <Col lg={6} md={12}>
          <ChartCustom
            name="FCP"
            series={this.state.metrics.map(metric => metric.fcp)}
            dates={this.state.metrics.map(metric => metric.created_at)}
            type="line"
            id="fcp"
          />
        </Col>
        <Col lg={6} md={12}>
          <ChartCustom
            name="Dom Load"
            series={this.state.metrics.map(metric => metric.dom_load)}
            dates={this.state.metrics.map(metric => metric.created_at)}
            type="line"
            id="dom_load"
          />
        </Col>
        <Col lg={6} md={12}>
          <ChartCustom
            name="Window Load"
            series={this.state.metrics.map(metric => metric.window_load)}
            dates={this.state.metrics.map(metric => metric.created_at)}
            type="line"
            id="window_load"
          />
        </Col>
      </Row>
      );   
    } else {
      return (
        <span>Loading...</span>
      );
    }
  }
  
}
