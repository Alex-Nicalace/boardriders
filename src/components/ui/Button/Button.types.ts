import { ButtonHTMLAttributes } from 'react';
import { LinkProps } from 'react-router-dom';

type TCustomProps = (
  | {
      color?: 'primary';

      nameColor?: never;
    }
  | {
      color: 'secondary';
      nameColor?: 'green';
    }
) & {
  variant?: 'contained' | 'outlined' | 'reverse';
  fullWidth?: boolean;
};

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: never;
  navigateDelta?: number;
}

// type CustomTo = string | Partial<Path> | number;

// interface CustomLinkProps extends Omit<LinkProps, 'to'> {
//   to: CustomTo;
// }

type TButtonOrLink = IButton | LinkProps;

export type TButtonProps = TButtonOrLink & TCustomProps;
