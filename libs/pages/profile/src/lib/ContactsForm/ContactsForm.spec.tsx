import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ContactsForm } from './ContactsForm';

const values = {
  firstName: '',
  lastName: '',
  company: '',
  email: 'test@test.com',
  phone: ''
};

const handleChange = jest.fn();

describe('[Profile] ContactsForm', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render contacts form', () => {
    const { baseElement } = render(
      <ContactsForm
        values={values}
        handleChange={handleChange}
        errors={{}}
        touched={{}}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
