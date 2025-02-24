'use client';

import { PreferencesForm } from '@/templates';
import FormLayout from '@/templates/FormLayout/FormLayout';
import PageLayout from '@/templates/PageLayout/PageLayout';
import React from 'react';

const Preferences = () => {
  return (
    <PageLayout>
      <FormLayout>
        <PreferencesForm />
      </FormLayout>
    </PageLayout>
  );
};

export default Preferences;
