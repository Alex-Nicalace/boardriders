import { useState } from 'react';
import Tabs, { TabPanel } from '../../component-library/Tabs';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import FormPersanalData from '../FormPersanalData';
import Title from '../ui/Title';
import './AccountPersanalData.scss';

const TABS = [
  {
    label: 'Личные данные',
    content: <FormPersanalData mode="personal-data" />,
  },
  {
    label: 'Пароль',
    content: <FormPersanalData mode="change-password" />,
  },
];

type TAccountPersanalDataProps = {
  className?: string;
};
function AccountPersanalData({
  className,
}: TAccountPersanalDataProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const { isLessMobile } = useScreenWidth();
  return (
    <div
      className={['account-persanal-data', className].filter(Boolean).join(' ')}
    >
      {!isLessMobile && (
        <div className="account-persanal-data__sections">
          {TABS.map(({ label, content }) => (
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
            {TABS.map(({ label }) => (
              <Tabs.Tab
                className="account-persanal-data__tab"
                key={label}
                label={label}
              />
            ))}
          </Tabs>
          {TABS.map(({ content, label }, index) => (
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
