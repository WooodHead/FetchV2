import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import 'react-widgets/dist/css/react-widgets.css'
import '../../containers/Create/NewAccount/css/skeleton.css'
import '../../containers/Create/NewAccount/css/prog-tracker.css'
import '../../containers/Create/NewAccount/css/custom.css'
import '../../containers/Create/NewAccount/css/normalize.css'


const CustomerForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
      <Field
        name="firstname"
        type="text"
        component={renderField}
        label="First Name"
      />
      </div>
      <div>
      <Field
        name="lastname"
        type="text"
        component={renderField}
        label="Last Name"
      />
      </div>
      <div>
      <Field
        name="phone"
        type="tel"
        component={renderField}
        label="Phone"
      />
      </div>
      <div>
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
      />
      </div>
      <div>
      <Field
        name="role"
        type="text"
        component={renderField}
        label="Role"
      />
      </div>
      <div>
        <label>Customer Note</label>
      <div>
      <Field
        name="customerNoteContent"
        type="textarea"
        component="textarea"
        placeholder="Optional..."
      />
      </div>
      </div>
      <div>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(CustomerForm)
