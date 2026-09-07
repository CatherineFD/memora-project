import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const User = lazy(() => import('user_mfe/App'));

function App() {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Загрузка микрофронтенда...</div>}>
          <Routes>
            {/* Обратите внимание на /* в конце */}
            <Route path="/user/*" element={<User />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
