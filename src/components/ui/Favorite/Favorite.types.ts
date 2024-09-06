export type TFavoriteProps = (
  | {
      checked?: boolean;
      defaultChecked?: never;
    }
  | { checked?: never; defaultChecked?: boolean }
) & {
  className?: string;
  isFramed?: boolean;
  bgColor?: 'light-gray' | 'white';
  adaptiveSize?: 'window' | 'container';
  onChange?: (value: boolean) => void;
};
