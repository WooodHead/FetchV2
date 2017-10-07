import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { DateTimePicker } from 'react-widgets'
import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'
import validate from './validate'
import 'react-widgets/dist/css/react-widgets.css'
const pickUpTypes = [ 'Automatic', 'On Call']
const cycles = [
  { name: 'Weekly', days: 7},
  { name: 'Bi-Weekly', days: 14},
  { name: 'Every Three Weeks', days: 21},
  { name: 'Monthly', days: 28}
]

moment.locale('en')
momentLocaliser()

const renderPickUpTypeSelector = ({ input, meta: { touched, error } }) =>
<div>
  <select {...input}>
    <option value="">Type of Pick Up Service...</option>
    {pickUpTypes.map(val =>
      <option value={val} key={val}>
        {val}
      </option>
    )}
  </select>
  {touched &&
    error &&
    <span>
      {error}
    </span>}
</div>

const renderCycleSelector = ({ input, meta: { touched, error } }) =>
<div>
<select {...input}>
  <option value="">Pick Up Cycle...</option>
  {cycles.map(({name, days}) => {
   return (
    <option value={days} key={name}>
      {name}
    </option>
   ) 
  }
    
  )}
</select>
{touched &&
  error &&
  <span>
    {error}
  </span>}
</div>


const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
<DateTimePicker
  onChange={onChange}
  format="MMMM Do YYYY"
  value={!value ? null : new Date(value)}
/>

const ServiceForm = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Service Start Date</label>
        <Field name="startDate" component={renderDateTimePicker} />
      </div>
      <div>
        <label>Pick Up Type</label>
        <Field name="pickUpType" component={renderPickUpTypeSelector} />
      </div>
      <div>
        <label>Pick Up Cycle</label>
        <Field name="cycle" component={renderCycleSelector} />
      </div>
      <div>
      <label>Oil Service Note</label>
      <div>
        <Field name="oilServiceNoteContent" component="textarea" placeholder="Optional..." />
      </div>
      </div>
    <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  )
}
export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ServiceForm)
