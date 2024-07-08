import { InputHTMLAttributes, useState } from 'react';
import { NotVisibleIcon, VisibleIcon } from '../Icons';
import InputStyled, { TInputStyledcommonProps } from '../InputStyled';
import './InputPasword.scss';
import { TInputTextCommonProps } from '../../../component-library/InputText';

type TInputPaswordProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> &
  TInputTextCommonProps &
  TInputStyledcommonProps & {
    defaultPasswordShow?: boolean;
  };
function InputPasword({
  defaultPasswordShow = false,
  ...props
}: TInputPaswordProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(defaultPasswordShow);

  return (
    <InputStyled
      {...props}
      type={showPassword ? 'text' : 'password'}
      buttonContent={showPassword ? <VisibleIcon /> : <NotVisibleIcon />}
      buttonProps={{
        bgColor: 'transparent',
        color: 'gray',
        onClick: () => setShowPassword(!showPassword),
      }}
      placeBorder="wrap"
      isTextarea={false}
    />
  );
}

export default InputPasword;
