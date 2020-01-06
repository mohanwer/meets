import React from 'react'
import { Form, Field, FormikProps, withFormik, FormikErrors } from 'formik';
import { Requests } from "../../services/requests";
import {Address, GoogleAddress, GoogleGeoCode} from "../common/Address"

interface EventValues {
  eventName: string,
  shortDescription: string,
  longDescription: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  postal: string,
  geoLocation?: GoogleGeoCode,
}

const innerForm = (props: FormikProps<EventValues>) => {
  const {touched, errors, isSubmitting} = props;

  const setAddress = (address: GoogleAddress) => {
    props.setFieldValue('address1', address.address)
    props.setFieldValue('city', address.city)
    props.setFieldValue('state', address.state)
    props.setFieldValue('postal', address.postal)
    props.setFieldValue('geoLocation', address.geoCode)
  }

  return (
    <div className="w-full p-6 lg:mt-0 rounded shadow bg-white">
      <Form>
        <div className="border-b p3 mb-4">
          <h5 className='fold-bold uppercase text-gray-600'>Create an event</h5>
        </div>
        <div className='md:flex mb-6'>
          <div className="md:w-1/3">
            <label className='form-label'>Name of your event</label>
          </div>
          <div className="md:w-2/3">
            <Field type='text' name='eventName' className='form-text-input border'/>
            {touched.eventName && errors.eventName && <div className='form-error'>{errors.eventName}</div>}
          </div>
        </div>
        <div className='md:flex mb-6'>
          <div className="md:w-1/3">
            <label className='form-label'>Brief description to display</label>
          </div>
          <div className="md:w-2/3">
            <Field type='text' name='shortDescription' className='form-text-input border'/>
            {touched.shortDescription && errors.shortDescription && <div className='form-error'>{errors.shortDescription}</div>}
          </div>
        </div>

        <div className='md:flex mb-6'>
          <div className="md:w-1/3">
            <label className='form-label'>Details about your event</label>
          </div>
          <div className="md:w-2/3">
            <Field type='text' as='textarea' name='longDescription' className='form-text-input border'/>
            {touched.longDescription && errors.longDescription && <div className='form-error'>{errors.longDescription}</div>}
          </div>
        </div>
        <div className='md:flex mb-6'>
          <div className="md:w-1/4">
            <label className='form-label'>Street Address</label>
          </div>
          <div className="md:w-1/4">
            <Address
              className='form-text-input border'
              addressChange={(place) => setAddress(place)}
            />
            {touched.address1 && errors.address1 && <div className='form-error'>{errors.address1}</div>}
          </div>
          <div className="md:w-1/4">
            <label className='form-label'>Apt / Suite / Other</label>
          </div>
          <div className="md:w-1/4">
            <Field type='text' name='address2' className='form-text-input border'/>
          </div>
        </div>
        <div className='md:flex mb-6'>
          <div className="md:w-1/4">
            <label className='form-label'>City</label>
          </div>
          <div className="md:w-1/4">
            <Field type='text' name='city' className='form-text-input border'/>
            {touched.city && errors.city && <div className='form-error'>{errors.city}</div>}
          </div>
          <div className="md:w-1/4">
            <label className='form-label'>State</label>
          </div>
          <div className="md:w-1/4">
            <Field type='text' name='state' className='form-text-input border'/>
            {touched.state && errors.state && <div className='form-error'>{errors.state}</div>}
          </div>
        </div>
        <div className='md:flex mb-6'>
          <div className="md:w-1/4">
            <label className='form-label'>Zip</label>
          </div>
          <div className="md:w-1/4">
            <Field type='text' name='postal' className='form-text-input border'/>
            {touched.postal && errors.postal && <div className='form-error'>{errors.postal}</div>}
          </div>
        </div>
        <button type="submit" className='btn' disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    </div>
  )
};

const CreateForm = withFormik<{}, EventValues>({
  handleSubmit: async values => {
    await Requests.post<any>('/events', values)
  },
  validate: (values) => {
    let errors: FormikErrors<EventValues> = {};
    if (!values.eventName)
      errors.eventName = 'Required';
    if (!values.longDescription)
      errors.longDescription = 'Required';
    if (!values.shortDescription)
      errors.shortDescription = 'Required';
    if (!values.address1)
      errors.address1 = 'Required'
    return errors;
  },
  mapPropsToValues: props => {
    return {
      eventName: '',
      shortDescription: '',
      longDescription: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postal: '',
    }
  }
})(innerForm);

export default CreateForm;