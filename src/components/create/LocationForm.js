import React from 'react'
import { Field, reduxForm } from 'redux-form'
import 'react-widgets/dist/css/react-widgets.css'
import validate from './validate'
import renderField from './renderField'

const LocationForm = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
      <Field
      name="locationName"
      type="text"
      component={renderField}
      label="Location Name"
      />
      </div>
      <div>
      <Field
        name="street"
        type="text"
        component={renderField}
        label="Street"
      />
      </div>
      <div>
      <Field
        name="city"
        type="text"
        component={renderField}
        label="City"
      /> 
      </div>
      <div>
      <Field
        name="state"
        type="text"
        component={renderField}
        label="State"
      /> 
      </div>
      <div>
      <Field
        name="zip"
        type="text"
        component={renderField}
        label="Zip Code"
      /> 
      </div>
      <div>
        <div>
          <label>Location Note</label>
        </div>
        <Field
        name="locationNoteContent"
        type="textarea"
        component="textarea"
        placeholder="Optional..."
      />
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
})(LocationForm)