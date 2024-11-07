import { useState } from 'react';
import { TabPanel } from '../../component-library/Tabs';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Title from '../ui/Title';
import './AccountPersanalData.scss';
import ToggleablePersonaData from '../ToggleablePersonaData';
import TabsBlock from '../TabsBlock';
import { TAccountPersanalDataProps } from './AccountPersanalData.types';

function AccountPersanalData({
  className,
}: TAccountPersanalDataProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const { isLessMobile } = useScreenWidth();
  const tabs = [
    {
      label: 'Личные данные',
      content: <ToggleablePersonaData mode="personal-data" />,
    },
    {
      label: 'Пароль',
      content: <ToggleablePersonaData mode="change-password" />,
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
          <TabsBlock
            className="account-persanal-data__tabs"
            value={activeTab}
            onChange={setActiveTab}
            variant="second"
          >
            {tabs.map(({ label }) => (
              <TabsBlock.Tab key={label} label={label} />
            ))}
          </TabsBlock>
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
