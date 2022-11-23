import Header from '../components/Header';
import StoredCalculationsTemplate from '../templates/storedCalculations';

export default function StoredCalculations() {
  return (
    <>
      <Header />
      <StoredCalculationsTemplate calculatorLinkNavigate="/emissions" />
    </>
  );
}
