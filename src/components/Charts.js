import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import ChartCustom from "./ChartCustom";
import DatetimeRangePicker from 'react-datetime-range-picker';
import dayjs from 'dayjs';

const BASE_API_URL = 'https://perfanalytic-dashboard.herokuapp.com';

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        metrics: null,
        startDate: dayjs().subtract(30, 'minute').toString(),
        endDate: dayjs().toString(),
    };

    this.dateRangeOnChange = this.dateRangeOnChange.bind(this)
  }

  async componentDidMount() {
    const metrics = await fetch(`${BASE_API_URL}/metrics`).then(res => res.json());
    
    const data = {};
    metrics.map(metric => {
      Object.keys(metric).map(key => {
        data[key] = [...(data[key] || []), metric[key]]
      })
    })
    this.setState({ metrics: data })       
  }

  dateRangeOnChange = async ({start, end}) => {
    try {
      const metrics = await fetch(`${BASE_API_URL}/metrics?start_date=${dayjs(start).valueOf()}&end_date=${dayjs(end).valueOf()}`).then(res => res.json());
      const data = {};
      metrics.map(metric => {
        Object.keys(metric).map(key => {
          data[key] = [...(data[key] || []), metric[key]]
        })
      })
      this.setState({ metrics: data })   
    } catch(err) {
      console.log(err)
    }
  }

  // fetc data.
  // url ler env ye taşınacak.

  render () {
    if (this.state.metrics !== null) {
      const {ttfb, fcp, dom_load, window_load, created_at} = this.state.metrics;

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
              series={ttfb || []}
              dates={created_at}
              type="line"
              id="ttfb"
            />
          </Col>
          <Col lg={6} md={12}>
            <ChartCustom
              name="FCP"
              series={fcp}
              dates={created_at}
              type="line"
              id="fcp"
            />
          </Col>
          <Col lg={6} md={12}>
            <ChartCustom
              name="Dom Load"
              series={dom_load}
              dates={created_at}
              type="line"
              id="dom_load"
            />
          </Col>
          <Col lg={6} md={12}>
            <ChartCustom
              name="Window Load"
              series={window_load}
              dates={created_at}
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
