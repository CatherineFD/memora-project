import { Outlet, Link, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('memora_token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="main-layout">
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/user">Профиль</Link> | 
        <Link to="/vocabulary">Словарь</Link> | 
        <button onClick={handleLogout}>Выйти</button>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet /> {/* Здесь рендерятся защищенные маршруты */}
      </main>
    </div>
  );
};

export default MainLayout;