import { useRoutes } from 'react-router-dom';
import { userRoutes } from './routes';
import { authStorage } from '@memora/auth-storage';

function App() {
  console.log(authStorage.getTokens());
  const element = useRoutes(userRoutes);

  return (
    <>
      {element || <div>Ошибка загрузки модуля пользователя</div>}
    </>
  )
}

export default App
