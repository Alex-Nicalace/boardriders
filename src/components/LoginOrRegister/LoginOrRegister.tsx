import { useState } from 'react';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import FormAuth from '../FormAuth';
import TabsBlock from '../TabsBlock';
import './LoginOrRegister.scss';
import { TabPanel } from '../../component-library/Tabs';

const TABS = ['Вход', 'Регистрация'];

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
          {TABS.map((title) => (
            <FormAuth
              key={title}
              className="login-or-register__form"
              mode={title === 'Вход' ? 'login' : 'registration'}
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
            {TABS.map((title) => (
              <TabsBlock.Tab key={title} label={title} />
            ))}
          </TabsBlock>
          {TABS.map((title, index) => (
            <TabPanel key={title} index={index} value={activeTab}>
              <FormAuth
                key={title}
                className="login-or-register__tabs-form"
                mode={title === 'Вход' ? 'login' : 'registration'}
              />
            </TabPanel>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoginOrRegister;
