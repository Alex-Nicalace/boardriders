import { useState } from 'react';
import { TabPanel } from '../../component-library/Tabs';
import PageContent from '../../components/PageContent';
import Title from '../../components/ui/Title';
import './AccountPage.scss';
import TabsBlock from '../../components/TabsBlock';

const TABS = [
  'Главная',
  'Мои заказы',
  'Бонусный счет',
  'Личная информация',
  'Мои адреса',
  'Подписка на новости',

  // 'Главная 2',
  // 'Мои заказы 2',
  // 'Бонусный счет 2',
  // 'Личная информация 2',
  // 'Мои адреса 2',
  // 'Подписка на новости 2',
];

type TAccountPageProps = {
  className?: string;
};
function AccountPage({ className }: TAccountPageProps): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);
  const [tabs] = useState([...TABS]);

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
        {tabs.map((tab) => (
          <TabsBlock.Tab key={tab} label={tab} />
        ))}
      </TabsBlock>
      <TabPanel index={0} value={currentTab}>
        111
      </TabPanel>
      <TabPanel index={1} value={currentTab}>
        222
      </TabPanel>
      <TabPanel index={2} value={currentTab}>
        333
      </TabPanel>
      {/* </div> */}
    </PageContent>
  );
}

export default AccountPage;
