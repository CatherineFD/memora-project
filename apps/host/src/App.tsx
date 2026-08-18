import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import './App.css'

const User = lazy(() => import('remote-auth/App'));

function App() {


  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Обратите внимание на /* в конце */}
          <Route path="/catalog/*" element={<Catalog />} />
          <Route path="/cart/*" element={<Cart />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App
