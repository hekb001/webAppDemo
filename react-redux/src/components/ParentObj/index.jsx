

import React, { Component, useState, useEffect } from 'react';
import { Row, Col } from 'antd';
const ParentObj = (props) => {
    const { gutter, span } = props;
    console.log('%c' + gutter, 'color:red');
    console.log('%c' + span, 'color:green');
    return (<Row gutter={gutter}>
        {
            React.Children.map(props.children, (child) =>
                <Col span={span}>{child}</Col>
            )
        }
    </Row>)
}
export default ParentObj