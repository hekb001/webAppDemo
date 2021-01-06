import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function CompanyInfo (props) {
  const asyncPayload = useSelector(state => state.home.asyncPayload) || [];
  console.log(asyncPayload,'asyncPayload...')
  return (
    <div className='ml-5'>
     公司详情页
    </div>
  );
}
