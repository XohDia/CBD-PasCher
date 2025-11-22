import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

interface User {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: 'user' | 'admin';
}

interface LoginProps {
  onLogin: (user: User) => void;
  onSwitchToSignUp?: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Veuillez entrer une adresse email valide.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Demo credentials - in real app, this would be an API call
      if (formData.email === 'user@exemple.com' && formData.password === '123456') {
        onLogin({ 
          username: 'Utilisateur',
          email: formData.email,
          firstName: 'Utilisateur',
          lastName: 'Demo',
          role: 'user'
        });
        setError('');
      } else if (formData.email === 'admin@cbdpascher.com' && formData.password === 'admin123') {
        onLogin({ 
          username: 'Administrateur',
          email: formData.email,
          firstName: 'Admin',
          lastName: 'CBD Pas Cher',
          role: 'admin'
        });
        setError('');
      } else {
        setError('Email ou mot de passe incorrect.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-title">Connexion</h2>
        <p className="login-subtitle">Connectez-vous à votre compte CBD pas cher</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="votre.email@exemple.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${error && error.includes('email') ? 'form-input-error' : ''}`}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Votre mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${error && error.includes('mot de passe') ? 'form-input-error' : ''}`}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'login-button-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Connexion en cours...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="login-demo">
          <p className="demo-title">Comptes de démonstration :</p>
          <div className="demo-accounts">
            <div className="demo-account">
              <p className="account-type">👤 Utilisateur :</p>
              <p className="demo-credentials">
                Email: <strong>user@exemple.com</strong><br />
                Mot de passe: <strong>123456</strong>
              </p>
            </div>
            <div className="demo-account">
              <p className="account-type">🛠️ Administrateur :</p>
              <p className="demo-credentials">
                Email: <strong>admin@cbdpascher.com</strong><br />
                Mot de passe: <strong>admin123</strong>
              </p>
            </div>
          </div>
        </div>

        {onSwitchToSignUp && (
          <div className="signup-footer">
            <p>
              Vous n'avez pas de compte ? 
              <button 
                className="switch-form-button"
                onClick={onSwitchToSignUp}
                disabled={isLoading}
              >
                S'inscrire
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;