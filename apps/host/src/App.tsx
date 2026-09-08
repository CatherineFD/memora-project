import { Suspense, } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routeObjects } from './routes';
import './App.css';

const AppContent = () => {
  const element = useRoutes(routeObjects);
  return element;
};

function App() {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Загрузка микрофронтенда...</div>}>
          <AppContent />
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
