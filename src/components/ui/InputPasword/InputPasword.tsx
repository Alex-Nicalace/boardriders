import { InputHTMLAttributes, useState } from 'react';
import { NotVisibleIcon, VisibleIcon } from '../Icons';
import InputStyled from '../InputStyled';
import './InputPasword.scss';

type TInputPaswordProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;
function InputPasword({ ...props }: TInputPaswordProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

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
