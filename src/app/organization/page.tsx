'use client';

import FormLayout from '@/templates/FormLayout/FormLayout';
import OrganizationForm from '@/templates/OrganizationForm/OrganizationForm';
import PageLayout from '@/templates/PageLayout/PageLayout';
import React from 'react';

const Organization = () => {
  return (
    <div>
      <PageLayout>
        <FormLayout>
          <OrganizationForm />
        </FormLayout>
      </PageLayout>
    </div>
  );
};

export default Organization;
