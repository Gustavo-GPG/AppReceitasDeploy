import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Header } from '../../components';
import { ClipboardCheck, Heart, LogOut } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const email = localStorage.getItem('user');
  let finalEmail = '';
  if (email) {
    const start = email.indexOf(":") + 2; // Pula ": e o primeiro "
    const end = email.indexOf("\"", start); // Encontra a próxima aspas
    finalEmail = email.substring(start, end);
  }

  const recipesDone = () => {
    navigate('/done-recipes');
  };

  const recipesFavorite = () => {
    navigate('/favorite-recipes');
  };

  const logoutRecipe = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Header />
      <main className="profile-container">
        <div className="profile-email">
          <p>Email:</p>
          <span data-testid="profile-email">{finalEmail}</span>
        </div>
        
        <div className="profile-actions">
          <button
            onClick={recipesDone}
            data-testid="profile-done-btn"
            className="profile-button done"
          >
            <ClipboardCheck size={20} />
            Receitas concluidas
          </button>

          <button
            onClick={recipesFavorite}
            data-testid="profile-favorite-btn"
            className="profile-button favorite"
          >
            <Heart size={20} />
            Receitas favoritas
          </button>

          <button
            onClick={logoutRecipe}
            data-testid="profile-logout-btn"
            className="profile-button logout"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
