import { classNames } from '~/utils/classNames';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  width?: number;
  height?: number;
}

export const Logo = ({ 
  className, 
  variant = 'light',
  width = 32,
  height = 32 
}: LogoProps) => {
  return (
    <img
      src={`/logo/logo-${variant}.svg`}
      alt="Aethermind"
      width={width}
      height={height}
      className={classNames(
        'h-auto w-auto transition-all duration-200',
        className
      )}
    />
  );
};
