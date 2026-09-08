import { useRoutes } from 'react-router-dom';
import { userRoutes } from './routes';

function App() {
  const element = useRoutes(userRoutes);

  return (
    <>
      {element || <div>Ошибка загрузки модуля пользователя</div>}
    </>
  )
}

export default App