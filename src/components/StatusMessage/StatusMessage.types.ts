export interface IStatusMessageStyles extends React.CSSProperties {
  '--status-message-color'?: string;
  '--status-message__message-font-size'?: string;
  '--status-message__description-font-size'?: string;
}

export type TStatusMessageProps = {
  className?: string;
  messageBubble?: string;
  description?: string;
  color?: 'black' | 'red';
  messageFontSize?: string;
  descriptionFontSize?: string;
  isUseFairing?: boolean;
};
