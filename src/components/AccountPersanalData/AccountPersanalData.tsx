import { useState } from 'react';
import Tabs, { TabPanel } from '../../component-library/Tabs';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Title from '../ui/Title';
import './AccountPersanalData.scss';
import ToggleablePersonaData from '../ToggleablePersonaData';

type TAccountPersanalDataProps = {
  className?: string;
};
function AccountPersanalData({
  className,
}: TAccountPersanalDataProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditPersonalData, setIsEditPersonalData] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const { isLessMobile } = useScreenWidth();
  const tabs = [
    {
      label: 'Личные данные',
      content: (
        <ToggleablePersonaData
          mode="personal-data"
          isEdit={isEditPersonalData}
          onToggle={setIsEditPersonalData}
        />
      ),
    },
    {
      label: 'Пароль',
      content: (
        <ToggleablePersonaData
          mode="change-password"
          isEdit={isEditPassword}
          onToggle={setIsEditPassword}
        />
      ),
    },
  ];

  return (
    <div
      className={['account-persanal-data', className].filter(Boolean).join(' ')}
    >
      {!isLessMobile && (
        <div className="account-persanal-data__sections">
          {tabs.map(({ label, content }) => (
            <section key={label} className="account-persanal-data__section">
              <Title
                className="account-persanal-data__title"
                as="h2"
                kind="h2-21-16"
              >
                {label}
              </Title>
              {content}
            </section>
          ))}
        </div>
      )}
      {isLessMobile && (
        <>
          <Tabs
            className="account-persanal-data__tabs"
            value={activeTab}
            onChange={setActiveTab}
          >
            {tabs.map(({ label }) => (
              <Tabs.Tab
                className="account-persanal-data__tab"
                key={label}
                label={label}
              />
            ))}
          </Tabs>
          {tabs.map(({ content, label }, index) => (
            <TabPanel key={label} index={index} value={activeTab}>
              {content}
            </TabPanel>
          ))}
        </>
      )}
    </div>
  );
}

export default AccountPersanalData;
