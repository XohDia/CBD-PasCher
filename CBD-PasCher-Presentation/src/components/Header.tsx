interface User {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: 'user' | 'admin';
}

interface HeaderProps {
  onChangePage?: (page: string) => void;
  user?: User | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onChangePage, user, onLogout }) => (
  <header className="header">
    <h1>CBD Pas Cher</h1>
    <nav className="nav">
      <a href="#products" onClick={e => { e.preventDefault(); onChangePage?.('home'); }} className="nav-link">Produits</a>
      <a href="#about" onClick={e => { e.preventDefault(); onChangePage?.('about'); }} className="nav-link">À propos</a>
      <a href="#contact" onClick={e => { e.preventDefault(); onChangePage?.('contact'); }} className="nav-link">Contact</a>
      {!user ? (
        <>
          <a href="#login" onClick={e => { e.preventDefault(); onChangePage?.('login'); }} className="nav-link">Connexion</a>
          <a href="#signup" onClick={e => { e.preventDefault(); onChangePage?.('signup'); }} className="nav-link">Inscription</a>
        </>
      ) : (
        <>
          {user.role === 'admin' && (
            <a href="#admin" onClick={e => { e.preventDefault(); onChangePage?.('admin'); }} className="nav-link admin-link">
              🛠️ Administration
            </a>
          )}
          <span className="user-greeting">
            Bonjour, {user.username}
            {user.role === 'admin' && <span className="admin-badge">Admin</span>}
          </span>
          <button onClick={onLogout} className="logout-button">Déconnexion</button>
        </>
      )}
    </nav>
  </header>
);

export default Header;