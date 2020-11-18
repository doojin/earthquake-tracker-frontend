import {render} from '@testing-library/react';
import {Form, Formik} from 'formik';
import React from 'react';

export const renderForm = initialValues => ui => {
  const { container } = render(ui, {
    wrapper: ({children}) => (
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {formik => <Form>{children(formik)}</Form>}
      </Formik>
    )
  });

  return container;
};
