/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc:日期选择器
 */
import React from 'react';
import { DatePicker } from '@alifd/next';
import moment from 'moment';
const format = 'YYYY-MM-DD';
export default class DatePickerControl extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { value, onChange, ...other } = this.props;
    return (
      <DatePicker
        placeholder='请选择日期'
        value={value ? moment(value, format) : null}
        onChange={(val) => onChange(moment(val).format(format))}
        {...other}
      />
    )
  }
}
