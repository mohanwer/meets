import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikProps, withFormik, FormikErrors } from 'formik';
import { Requests } from "../../services/requests";

interface EventValues {
  eventName: string,
  shortDescription: string,
  longDescription: string
}

const innerForm = (props: FormikProps<EventValues>) => {
  const {touched, errors, isSubmitting} = props;
  return (
    <div className="w-full p-8 mt-6 lg:mt-0 rounded shadow bg-white">
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
        <button type="submit" className='btn' disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    </div>
  )
};

const CreateForm = withFormik<{}, EventValues>({
  handleSubmit: values => {
    console.log(values);
  },
  validate: (values) => {
    let errors: FormikErrors<EventValues> = {};
    if (!values.eventName)
      errors.eventName = 'Required';
    if (!values.longDescription)
      errors.longDescription = 'Required';
    if (!values.shortDescription)
      errors.shortDescription = 'Required';
    return errors;
  },
  mapPropsToValues: props => {
    return {
      eventName: '',
      shortDescription: '',
      longDescription: ''
    }
  }
})(innerForm);

export default CreateForm;