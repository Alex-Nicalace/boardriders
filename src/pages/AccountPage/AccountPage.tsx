import { useState } from 'react';
import './AccountPage.scss';
import { TabPanel } from '../../component-library/Tabs';
import PageContent from '../../components/PageContent';
import Title from '../../components/ui/Title';
import TabsBlock from '../../components/TabsBlock';
import AccountMainData from '../../components/AccountMainData';
import AccountOrderData from '../../components/AccountOrderData';
import AccountPersanalData from '../../components/AccountPersanalData';
import AccountAddressData from '../../components/AccountAddressData';

const TABS = [
  { label: 'Главная', content: <AccountMainData /> },
  { label: 'Мои заказы', content: <AccountOrderData /> },
  { label: 'Личная информация', content: <AccountPersanalData /> },
  { label: 'Мои адреса', content: <AccountAddressData /> },
  { label: 'Подписка на новости', content: <>не реализовано</> },
];

type TAccountPageProps = {
  className?: string;
};
function AccountPage({ className }: TAccountPageProps): JSX.Element {
  const [currentTab, setCurrentTab] = useState(3);

  return (
    <PageContent
      as="main"
      className={['account-page', className].filter(Boolean).join(' ')}
      paddingTop="50-15"
    >
      {/* <div className="account-page__container"> */}
      <Title className="account-page__title" as="h1" withContainer>
        Мой аккаунт
      </Title>
      <TabsBlock
        className="account-page__tabs"
        value={currentTab}
        onChange={setCurrentTab}
      >
        {TABS.map(({ label }) => (
          <TabsBlock.Tab key={label} label={label} />
        ))}
      </TabsBlock>
      <div className="account-page__container">
        <div className="account-page__tabs-panels">
          {TABS.map(({ label, content }, index) => (
            <TabPanel key={label} index={index} value={currentTab}>
              {content}
            </TabPanel>
          ))}
        </div>
      </div>
    </PageContent>
  );
}

export default AccountPage;
