import './CheckOutPage.scss';
import PageContent from '../../components/PageContent';
import CartContainer from '../../features/cart/CartContainer';

function CheckOutPage(): JSX.Element {
  return (
    <PageContent className="check-out-page" as="main" paddingTop="50-15">
      <div className="check-out-page__container">
        <CartContainer />
      </div>
    </PageContent>
  );
}

export default CheckOutPage;
