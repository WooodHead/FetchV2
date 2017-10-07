import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { DateTimePicker } from 'react-widgets'
import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'
import validate from './validate'
import 'react-widgets/dist/css/react-widgets.css'
const type = [ 'Drum', 'Container' ]
const quantity = [ 1, 2, 3, 4 ]
const size = [ 55, 150 ]

moment.locale('en')
momentLocaliser()

const renderContainerSelector = ({ input, meta: { touched, error } }) =>
  <div>
    <select {...input}>
      <option value="">Select a container type...</option>
      {type.map(val =>
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

const renderQuantitySelector = ({ input, meta: { touched, error } }) =>
<div>
  <select {...input}>
    <option value="">How many containers are needed...</option>
    {quantity.map(val =>
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

const renderSizeSelector = ({ input, meta: { touched, error } }) =>
<div>
  <select {...input}>
    <option value="">What size container is needed...</option>
    {size.map(val =>
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

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
<DateTimePicker
  onChange={onChange}
  format="MMMM Do YYYY"
  value={!value ? null : new Date(value)}
/>

const SetUpForm = props => {
  const { handleSubmit, previousPage  } = props
  return (
    <form onSubmit={handleSubmit}>
       <div>
        <label>Set Up Date</label>
        <Field name="setUpDate" component={renderDateTimePicker} />
      </div>
      <div>
        <label>Container Type</label>
        <Field name="type" component={renderContainerSelector} />
      </div>
      <div>
        <label>Size of Container</label>
        <Field name="size" component={renderSizeSelector} />
      </div>
      <div>
        <label>Quantity</label>
        <Field name="quantity" component={renderQuantitySelector} />
      </div>
      <div>
        <label>Set Up Note</label>
        <div>
          <Field name="setUpNoteContent" component="textarea" placeholder="Optional..." />
        </div>
      </div>
      <div>
      <button type="button" className="previous" onClick={previousPage}>
      Previous
    </button>
    <button type="submit" className="next">
      Next
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
})(SetUpForm)
