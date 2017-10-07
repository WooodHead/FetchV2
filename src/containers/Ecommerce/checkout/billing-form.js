import React from 'react';
import Input from '../../../components/uielements/input';
import Select from '../../../components/uielements/select';
import Checkbox from '../../../components/uielements/checkbox';
import InputBox from './input-box';
import IntlMessages from '../../../components/utility/intlMessages';

const Option = Select.Option;

class BillingForm extends React.Component {
  handleOnChange = checkedValues => {
    console.log('checked = ', checkedValues);
  };

  render() {
    return (
      <div className="isoBillingForm">
        <div className="isoInputFieldset">
          <InputBox
            label={<IntlMessages id="checkout.billingform.firstname" />}
            important
          />
          <InputBox
            label={<IntlMessages id="checkout.billingform.lastname" />}
            important
          />
        </div>

        <div className="isoInputFieldset">
          <InputBox
            label={<IntlMessages id="checkout.billingform.company" />}
          />
        </div>

        <div className="isoInputFieldset">
          <InputBox
            label={<IntlMessages id="checkout.billingform.email" />}
            important
          />
          <InputBox label={<IntlMessages id="checkout.billingform.mobile" />} />
        </div>

        <div className="isoInputFieldset">
          <div className="isoInputBox">
            <label>
              {<IntlMessages id="checkout.billingform.country" />}
            </label>
            <Select size="large" defaultValue="unitedstate">
              <Option value="argentina">Argentina</Option>
              <Option value="australia">Australia</Option>
              <Option value="brazil">Brazil</Option>
              <Option value="france">France</Option>
              <Option value="germany">Germany</Option>
              <Option value="southafrica">South Africa</Option>
              <Option value="spain">Spain</Option>
              <Option value="unitedstate">United State</Option>
              <Option value="unitedkingdom">United Kingdom</Option>
            </Select>
          </div>

          <InputBox label={<IntlMessages id="checkout.billingform.city" />} />
        </div>

        <div className="isoInputFieldset vertical">
          <InputBox
            label={<IntlMessages id="checkout.billingform.address" />}
            placeholder="Address"
          />
          <Input
            size="large"
            placeholder="Apartment, suite, unit etc. (optional)"
            style={{ marginTop: '35px' }}
          />
        </div>

        <Checkbox onChange={this.handleOnChange}>
          <IntlMessages id="checkout.billingform.checkbox" />
        </Checkbox>
      </div>
    );
  }
}
export default BillingForm;
