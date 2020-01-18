import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import ChartCustom from "./ChartCustom";
import DatetimeRangePicker from 'react-datetime-range-picker';
import dayjs from 'dayjs';

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        metrics: [],
        startDate: dayjs().subtract(30, 'minute').toString(),
        endDate: dayjs().toString(),
    };

    this.dateRangeOnChange = this.dateRangeOnChange.bind(this)
  }

  async componentDidMount() {
    const metrics = await fetch(`http://localhost:3000/metrics`).then(res => res.json());
    this.setState({ metrics })          
  }

  dateRangeOnChange = async (data) => {
    console.log(data)
    try {
      const metrics = await fetch(`http://localhost:3000/metrics?start_date=${dayjs(data.start).valueOf()}&end_date=${dayjs(data.end).valueOf()}`).then(res => res.json());
      this.setState({ metrics })  
    } catch(err) {
      console.log(err)
    }
  }

  render () {
    if (this.state.metrics.length > 0) {
      return (
      <div>
        <Row style={{display: 'flex',justifyContent: 'flex-end', padding: '15px'}}>
          <DatetimeRangePicker
            onChange={this.dateRangeOnChange}
            startDate={dayjs().subtract(30, 'minute').toString()}
            inline={true}
            className="date-time-picker-inputs"
            dateFormat="YYYY-MM-DD"
            timeFormat="HH:mm:ss"
             />
        </Row> 
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
      </div>
      );   
    } else {
      return (
        <span>Loading...</span>
      );
    }
  }
  
}
