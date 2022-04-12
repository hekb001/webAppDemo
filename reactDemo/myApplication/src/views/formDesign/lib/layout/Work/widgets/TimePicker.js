/*
 * @Author: kevin.he 
 * @Date: 2021-11-18 14:36:32 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-18 16:20:15
 * 时间选择器
 */
import React from 'react';
import { TimePicker } from '@alifd/next';
import moment from 'moment'
const format = 'HH:mm:ss';
export default class DatePickerControl extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { value, onChange, ...other } = this.props;
        return (
            <TimePicker
                placeholder='请选择时间'
                value={value ? moment(value, format) : null}
                onChange={(val) => onChange(moment(val).format('HH:mm:ss'))}
                {...other}
            />
        )
    }
}