import { useState } from 'react';
import './AccountPage.scss';
import { TabPanel } from '../../component-library/Tabs';
import PageContent from '../../components/PageContent';
import Title from '../../components/ui/Title';
import TabsBlock from '../../components/TabsBlock';
import AccountMainData from '../../components/AccountMainData';
import AccountAddressData from '../../components/AccountAddressData';
import AccountOrderDataContainer from '../../features/makeOrder/AccountOrderDataContainer';
import AccounPersanalDataProvider from '../../features/authentication/AccounPersanalDataProvider';
import AccountPersanalData from '../../components/AccountPersanalData';

type TAccountPageProps = {
  className?: string;
};
function AccountPage({ className }: TAccountPageProps): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    const el = document.querySelector('.account-page__tabs');
    if (!el) return;

    // прокручиваем страницу вверх до табов
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tabs = [
    {
      label: 'Главная',
      content: <AccountMainData setActiveTab={handleTabChange} />,
    },
    { label: 'Мои заказы', content: <AccountOrderDataContainer /> },
    {
      label: 'Личная информация',
      content: (
        <AccounPersanalDataProvider
          render={(data) => (
            <AccountPersanalData className={className} data={data} />
          )}
        />
      ),
    },
    { label: 'Мои адреса', content: <AccountAddressData /> },
    { label: 'Подписка на новости', content: <>не реализовано</> },
  ];

  return (
    <PageContent
      as="main"
      className={['account-page', className].filter(Boolean).join(' ')}
      paddingTop="50-15"
    >
      <Title className="account-page__title" as="h1" withContainer>
        Мой аккаунт
      </Title>
      <TabsBlock
        className="account-page__tabs"
        value={currentTab}
        onChange={setCurrentTab}
      >
        {tabs.map(({ label }) => (
          <TabsBlock.Tab key={label} label={label} />
        ))}
      </TabsBlock>
      <div className="account-page__container">
        <div className="account-page__tabs-panels">
          {tabs.map(({ label, content }, index) => (
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
