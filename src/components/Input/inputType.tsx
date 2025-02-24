import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'border-gray-border flex w-full rounded-lg border bg-[#ffff] px-[12px] py-[8px]',
  {
    variants: {
      variant: {
        default: '',
      },
      inputSize: {
        lg: 'min-h-[52px] text-lg font-normal leading-[20px]',
        md: 'min-h-[44px] text-base font-normal',
        sm: 'min-h-[36px] text-sm font-normal leading-[20px]',
        xs: 'min-h-[30px] text-xs font-normal leading-[14px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  },
);
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default';
  inputSize?: 'md' | 'sm' | 'lg' | 'xs';
  passwordWithIcon?: boolean; //to show the toggle icon if the type is password
  leftIcon?: string;
  rightIcon?: string;
  label?: string;
  labelStyles?: string;
  min?: number;
  ref?: React.Ref<HTMLInputElement>;
  isError?: boolean;
  leftIconStyles?: string;
  rightIconStyles?: string;
  errorMessage?: string;
}

export const labelSize = {
  lg: 'text-2xl leading-[26px] font-medium',
  sm: 'text-sm font-medium  leading-[20px]',
  md: 'text-sm font-medium  leading-[20px]',
  xs: 'text-xs font-medium leading-[14px]',
};

export type Option = {
  label: string;
  value: string;
};

export const textAreaInvariant = cva(
  'border-gray-border flex w-full rounded-lg border bg-[#ffff] px-[12px] py-[8px]',
  {
    variants: {
      variant: {
        default: '',
      },
      inputSize: {
        lg: 'text-[22px] leading-[24px]',
        md: 'text-base font-normal',
        sm: 'min-h-[36px] text-sm font-normal leading-[20px]',
        xs: 'min-h-[30px] text-xs font-normal leading-[14px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  },
);

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  labelStyles?: string;
  inputSize: 'xs' | 'md' | 'sm' | 'lg';
  variant?: 'default' | null;
}
