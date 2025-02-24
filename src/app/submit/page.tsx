'use client';

import FormLayout from '@/templates/FormLayout/FormLayout';
import PageLayout from '@/templates/PageLayout/PageLayout';
import SubmitForm from '@/templates/SubmitForm/SubmitForm';
import React from 'react';

const Submit = () => {
  return (
    <div>
      <PageLayout>
        <FormLayout>
          <SubmitForm />
        </FormLayout>
      </PageLayout>
    </div>
  );
};

export default Submit;
