import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { NotVisibleIcon, VisibleIcon } from '../Icons';
import InputStyled, { TInputStyledcommonProps } from '../InputStyled';
import './InputPasword.scss';
import { TInputTextCommonProps } from '../../../component-library/InputText';

type TInputPaswordProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> &
  TInputTextCommonProps &
  TInputStyledcommonProps & {
    defaultPasswordShow?: boolean;
  };
const InputPasword = forwardRef<HTMLInputElement, TInputPaswordProps>(
  ({ defaultPasswordShow = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(defaultPasswordShow);

    return (
      <InputStyled
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        buttonContent={showPassword ? <VisibleIcon /> : <NotVisibleIcon />}
        buttonProps={{
          bgColor: 'white',
          color: 'dark-gray',
          onClick: () => setShowPassword(!showPassword),
        }}
        placeBorder="wrap"
        isTextarea={false}
      />
    );
  }
);

export default InputPasword;
