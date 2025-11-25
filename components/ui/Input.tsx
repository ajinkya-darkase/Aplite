import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

type InputProps = {
  label?: string;
  description?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  wrapperClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, error, leftIcon, rightIcon, className, wrapperClassName, type, ...rest }, ref) => {
    const hasError = Boolean(error);
    const isFileInput = type === 'file';
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFileName(e.target.files?.[0]?.name || '');
      if (rest.onChange) rest.onChange(e);
    };

    return (
      <label className={cn('block text-sm font-medium text-slate-700', wrapperClassName)}>
        {label && (
          <span className="mb-1 block text-sm font-semibold capitalize tracking-wide text-slate-500">{label}</span>
        )}

        <div
          className={cn(
            'relative flex items-center rounded-lg border bg-white transition-shadow focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent',
            hasError ? 'border-red-300 focus-within:ring-red-500' : 'border-slate-200'
          )}
        >
          {leftIcon && (
            <span className={cn('pointer-events-none pl-3 text-slate-400', rest.disabled && 'opacity-60')}>
              {leftIcon}
            </span>
          )}

          {isFileInput ? (
            <>
              {/* Visible custom file button */}
              <div className="w-full px-3 py-2 bg-[#FAFAFA] rounded-lg text-slate-700 cursor-pointer">
                {fileName || 'Choose File'}
              </div>
              {/* Hidden native file input */}
              <input
                ref={ref}
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                {...rest}
              />
            </>
          ) : (
            <input
              ref={ref}
              type={type}
              className={cn(
                'w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none',
                leftIcon ? 'pl-2' : undefined,
                rightIcon ? 'pr-10' : undefined,
                className
              )}
              {...rest}
            />
          )}

          {/* Right icon only for non-file inputs */}
          {rightIcon && !isFileInput && (
            <span className="absolute right-3 text-slate-400">{rightIcon}</span>
          )}
        </div>

        {description && !hasError && <span className="mt-1 block text-xs text-slate-500">{description}</span>}
        {hasError && <span className="mt-1 block text-xs text-red-600">{error}</span>}
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;