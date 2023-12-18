import BurgerProvider from './Context/BurgerContext';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BurgerProvider>
      <MainPage />
    </BurgerProvider>
  );
}

export default App;
