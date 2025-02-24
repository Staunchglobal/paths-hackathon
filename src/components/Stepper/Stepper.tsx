import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const steps = [
  { label: 'Name', path: '/name' },
  { label: 'Preferences', path: '/preferences' },
  { label: 'Organization', path: '/organization' },
  { label: 'Education', path: '/education' },
  { label: 'Submit', path: '/submit' },
];

const Stepper = () => {
  const pathname = usePathname();
  const currentStep = steps.findIndex(step => step.path === pathname);

  return (
    <div className="mx-auto w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div
              className={cn(
                'relative flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white',
                index <= currentStep ? 'bg-black' : 'bg-primary-200',
                index < steps.length - 1
                  ? `after:absolute after:left-full after:top-1/2 after:h-1 after:w-[calc(100%+80px)] after:-translate-y-1/2 ${
                      index === 0 ? 'after:bg-black' : 'after:bg-primary-100'
                    }`
                  : 'after:hidden',
              )}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm font-medium">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
