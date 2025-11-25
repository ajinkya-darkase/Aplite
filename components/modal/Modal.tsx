'use client'
import { ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

type ModalProps = {
  isOpen: boolean;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  size?: ModalSize;
  overlayClassName?: string;
  contentClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  headerClassName?: string;
};

const sizeClassMap: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export default function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
  footer,
  size = 'md',
  overlayClassName,
  contentClassName,
  bodyClassName,
  footerClassName='bg-slate-100',
  headerClassName='',
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={cn('fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-8', overlayClassName)}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn('relative w-full rounded-xl bg-white shadow-xl', sizeClassMap[size], contentClassName)}
      >
        <header className={cn('border-b border-slate-200 px-6 py-4', title ? 'flex flex-col gap-2' : 'hidden' ,headerClassName)}>
          {typeof title === 'string' ? <h2 className="text-lg font-semibold text-slate-900">{title}</h2> : title}
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </header>
        <div className={cn('px-6 py-5 text-sm text-slate-700', bodyClassName)}>{children}</div>
        {footer && <footer className={cn('border-t border-slate-200 px-6 py-4', footerClassName)}>{footer}</footer>}
        <button
          type="button"
          className="absolute right-6 top-6 text-slate-400 transition-colors hover:text-slate-600"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
