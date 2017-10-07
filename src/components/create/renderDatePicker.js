import React from 'react'
import { DatePicker } from 'antd';
//import moment from 'moment'

const renderDateTimePicker = ({ label, input: { onChange, value }, meta: { touched, error }, showTime }) =>

 <div>
 <label>
   {label}
 </label>
 <div>
 <DatePicker
  onChange={onChange}
  format="DD MMM YYYY"
  time={showTime}
  value={!value ? null : new Date(value)}
  label="Set Up Date"
/>
  {/* <input {...input} placeholder={label} type={type} /> */}
   {touched &&
     error &&
     <span>
       {error}
     </span>}
 </div>
</div>

export default renderDateTimePicker