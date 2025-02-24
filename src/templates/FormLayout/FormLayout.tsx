import Stepper from '@/components/Stepper/Stepper';
import { ReactNode } from 'react';

interface FormLayoutProps {
  children: ReactNode;
}

const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <div className="flex flex-col items-center p-6">
      <Stepper />
      <div className="mt-6 w-full max-w-2xl">{children}</div>
    </div>
  );
};

export default FormLayout;
