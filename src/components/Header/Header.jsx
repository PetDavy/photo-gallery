import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = ({ pinedPhotosLength }) => (
  <header className="App__header Header">
    <div className="Header__tools">
      <div className="Header__like-icon">
        <i className="far fa-heart" />
        <span className="Header__counter">
          {pinedPhotosLength}
        </span>
      </div>
    </div>

    <nav className="Header__nav">
      <ul className="Header__links">
        <li className="Header__link">
          <Link to="/">Home</Link>
        </li>
        <li className="Header__link">
          <Link to="/my-photos">Favourites</Link>
        </li>
      </ul>
    </nav>

    <div className="Header__company">
      <span>TemplateMonster</span>
    </div>
  </header>
);

Header.propTypes = {
  pinedPhotosLength: PropTypes.number.isRequired,
};
