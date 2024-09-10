import { useState } from 'react';
import './LoginOrRegister.scss';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import TabsBlock from '../TabsBlock';
import { TabPanel } from '../../component-library/Tabs';
import { FormLogin, FormRegistration } from '../FormAuth';

const TABS = [
  {
    title: 'Вход',
    Component: FormLogin,
  },
  {
    title: 'Регистрация',
    Component: FormRegistration,
  },
];

type TLoginOrRegisterProps = {
  className?: string;
};
function LoginOrRegister({ className }: TLoginOrRegisterProps): JSX.Element {
  const { isLessMobile } = useScreenWidth();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={['login-or-register', className].filter(Boolean).join(' ')}>
      {!isLessMobile && (
        <div className="login-or-register__forms">
          {TABS.map(({ Component, title }) => (
            <Component
              key={title}
              className="login-or-register__form"
              withTitle
            />
          ))}
        </div>
      )}
      {isLessMobile && (
        <div className="login-or-register__tabs-forms">
          <TabsBlock
            className="login-or-register__tabs"
            value={activeTab}
            onChange={setActiveTab}
            variant="second"
          >
            {TABS.map(({ title }) => (
              <TabsBlock.Tab key={title} label={title} />
            ))}
          </TabsBlock>
          {TABS.map(({ title, Component }, index) => (
            <TabPanel key={title} index={index} value={activeTab}>
              <Component key={title} className="login-or-register__tabs-form" />
            </TabPanel>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoginOrRegister;
