import { QueryClient, QueryClientProvider } from 'react-query';
import Routers from './shared/Router';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Routers />
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
