import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <header>
        <h1>Memora</h1>
      </header>
      <main>
        <Outlet /> {/* Здесь рендерятся дочерние маршруты (login, register) */}
      </main>
    </div>
  );
};

export default PublicLayout;