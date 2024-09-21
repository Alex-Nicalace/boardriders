import { useState } from 'react';
import './LoginOrRegister.scss';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import TabsBlock from '../TabsBlock';
import { TabPanel } from '../../component-library/Tabs';
import FormLoginContainer from '../../features/authentication/FormLoginContainer';
import FormRegistrationContainer from '../../features/authentication/FormRegistrationContainer';

type TLoginOrRegisterProps = {
  className?: string;
  onSuccess?: () => void;
  initialTab?: 0 | 1;
};
function LoginOrRegister({
  className,
  onSuccess,
  initialTab = 0,
}: TLoginOrRegisterProps): JSX.Element {
  const { isLessTablet } = useScreenWidth();
  const [activeTab, setActiveTab] = useState(initialTab);

  const panels = [
    <FormLoginContainer
      key={0}
      className="login-or-register__form"
      withTitle
      onSuccessLogin={onSuccess}
    />,
    <FormRegistrationContainer
      key={1}
      className="login-or-register__form"
      withTitle
      onSuccessRegister={onSuccess}
    />,
  ];

  const tabs = [
    {
      title: 'Вход',
      element: (
        <FormLoginContainer
          key={0}
          className="login-or-register__form"
          onSuccessLogin={onSuccess}
        />
      ),
    },
    {
      title: 'Регистрация',
      element: (
        <FormRegistrationContainer
          key={1}
          className="login-or-register__form"
          onSuccessRegister={onSuccess}
        />
      ),
    },
  ];

  return (
    <div className={['login-or-register', className].filter(Boolean).join(' ')}>
      {!isLessTablet && (
        <div className="login-or-register__forms">
          {panels.map((element) => element)}
        </div>
      )}
      {isLessTablet && (
        <div className="login-or-register__tabs-forms">
          <TabsBlock
            className="login-or-register__tabs"
            value={activeTab}
            onChange={setActiveTab}
            variant="second"
          >
            {tabs.map(({ title }) => (
              <TabsBlock.Tab key={title} label={title} />
            ))}
          </TabsBlock>
          {tabs.map(({ element, title }, index) => (
            <TabPanel key={title} index={index} value={activeTab}>
              {element}
            </TabPanel>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoginOrRegister;
