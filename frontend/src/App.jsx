import { CryproContextProvider } from './components/context/crypto-context';
import { AppLayout } from './components/layout/AppLayout';

export default function App() {
  return (
    <CryproContextProvider>
      <AppLayout />
    </CryproContextProvider>
  );
}
