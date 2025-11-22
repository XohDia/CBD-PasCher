import { useState } from 'react';
import Header from './components/Header';
import Home from './Home';
import Login from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Admin from './Pages/Admin';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
  category?: string;
  stock?: number;
}

interface User {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: 'user' | 'admin';
}

type PageType = 'home' | 'login' | 'signup' | 'about' | 'contact' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Huile de CBD 10%',
      description: 'Huile de chanvre 10% CBD, pure et naturelle.',
      price: '39.99€',
      category: 'Huiles CBD',
      stock: 50
    },
    {
      id: 2,
      name: 'Gélules CBD',
      description: 'Gélules pratiques avec 20mg de CBD par unité.',
      price: '49.99€',
      category: 'Gélules CBD',
      stock: 30
    },
    {
      id: 3,
      name: 'Crème apaisante au CBD',
      description: 'Crème pour les douleurs musculaires et articulaires.',
      price: '29.99€',
      category: 'Crèmes & Cosmétiques',
      stock: 25
    }
  ]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('home'); // Redirect to home after login
  };

  const handleSignUp = (userData: User) => {
    setUser(userData);
    setCurrentPage('home'); // Redirect to home after signup
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home'); // Redirect to home after logout
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home products={products} />;
      case 'admin':
        return user?.role === 'admin' ? (
          <Admin 
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={handleUpdateProduct}
          />
        ) : (
          <section className="access-denied">
            <div className="login-container">
              <h2 className="login-title">Accès Refusé</h2>
              <p className="login-subtitle">Vous devez être administrateur pour accéder à cette page.</p>
              <button 
                className="login-button"
                onClick={() => setCurrentPage('home')}
              >
                Retour à l'accueil
              </button>
            </div>
          </section>
        );
      case 'login':
        return <Login 
          onLogin={handleLogin} 
          onSwitchToSignUp={() => setCurrentPage('signup')}
        />;
      case 'signup':
        return (
          <SignUp 
            onSignUp={handleSignUp}
            onSwitchToLogin={() => setCurrentPage('login')}
          />
        );
      case 'about':
        return (
          <section style={{ padding: '40px', minHeight: '60vh' }}>
            <About />
          </section>
        );
      case 'contact':
        return (
          <section style={{ padding: '40px', minHeight: '60vh' }}>
            <Contact />
          </section>
        );
      default:
        return <Home products={products} />;
    }
  };

  return (
    <div className="app">
      <Header 
        onChangePage={handlePageChange}
        user={user}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <footer className="footer">
        &copy; 2025 CBD pas cher, Tous droits réservés
      </footer>
    </div>
  );
}
