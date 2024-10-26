import StatCard from '../StatCard';
import './AccountMainData.scss';
import { STAT_CARD_LIST } from './statCardListConfig';

// type TAccountMainDataProps = { }
function AccountMainData(/*{ }: TAccountMainDataProps*/): JSX.Element {
  return (
    <div className="account-main-data">
      {STAT_CARD_LIST.map(({ title, hint, labelTarget, element, toTarget }) => (
        <StatCard
          key={title}
          className="account-main-data__stat-card"
          title={title}
          hint={hint}
          labelTarget={labelTarget}
          toTarget={toTarget}
        >
          {element}
        </StatCard>
      ))}
    </div>
  );
}

export default AccountMainData;
