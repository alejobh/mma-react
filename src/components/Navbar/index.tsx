import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import logo from 'assets/logo.png';
import PATHS from 'constants/paths';
import { removeHeaders } from 'config/api/utils';
import LocalStorageService from 'services/LocalStorageService';

import styles from './styles.module.scss';

function Navbar() {
  const { t } = useTranslation();
  const history = useHistory();

  const handleLogout = () => {
    LocalStorageService.removeAuthHeaders();
    removeHeaders();
    history.push(PATHS.login);
  };

  return (
    <div className={`row center full-width ${styles.navbarContainer}`}>
      <div className={`row middle space-between full-width ${styles.navbarContent}`}>
        <img src={logo} alt="Wolox logo" />
        <button type="button" className={styles.logout} onClick={handleLogout}>
          {t('Common:logout')}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
