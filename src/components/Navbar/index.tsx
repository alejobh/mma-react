import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import logo from 'assets/logo.png';
import { ROUTES } from 'components/Router/constants';
import LocalStorageService from 'services/LocalStorageService';

import styles from './styles.module.scss';

function Navbar() {
  const { t } = useTranslation();
  const history = useHistory();

  const handleLogout = () => {
    LocalStorageService.removeValue('session');
    history.push(ROUTES.login);
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarContent}>
        <img src={logo} alt="Wolox logo" />
        <button type="button" className={styles.logout} onClick={handleLogout}>
          {t('common:logout')}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
