import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } data-testid="meals-bottom-btn" alt="" />
      </Link>
    </footer>
  );
}

export default Footer;
