import React, { Component } from 'react';
import { Form, Button, Icon, Input, Checkbox ,Radio} from 'antd';


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const RadioSData = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false }
]
class Forms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            letter: 1,
            fruitsValue:'Pear'
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.props.form.validateFields();
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    //单选框
    onChange(type, e) { 
        let curVal = e.target.value;
        let obj = {}
        obj[type] = curVal;
        this.setState(obj)
    }
    render() {
        const { letter, fruitsValue } = this.state;
        console.log(letter, fruitsValue, 'letter,fruitsValue');
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const usernameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (<div className="Forms">
            <Form name="horizontal_login" onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {
                        getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'please input your name!' }]
                        })(<Input
                            prefix={<Icon type="user" />}
                            placeholder="UserName"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                        />)
                    }
                </Form.Item>
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {
                        getFieldDecorator('password', {
                            rules: [{ required: true, message: 'please input your pasword!' }]
                        })(<Input
                            prefix={<Icon type="lock" />}
                            placeholder="password"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                        />)
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('remenber', {
                            valuePropName: 'checked',
                            initialValue:true
                        })(<Checkbox>remenber me</Checkbox>)
                    }
                </Form.Item>
                <Form.Item>
                    <Radio.Group onChange={this.onChange.bind(this,'letter')} value={letter}>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                        <Radio value={4}>D</Radio>
                    </Radio.Group>
                    <br/>
                    <Radio.Group value={fruitsValue} options={RadioSData} onChange={this.onChange.bind(this,'fruitsValue')}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        login in
                    </Button>
                </Form.Item>
            </Form>
        </div>)
    }

}
export default Form.create({ name: 'horizontal_login' })(Forms)