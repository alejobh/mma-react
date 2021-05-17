import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import logo from 'assets/logo.png';
import PATHS from 'constants/paths';
import { LOCAL_STORAGE_KEYS } from 'constants/general';
import LocalStorageService from 'services/LocalStorageService';

import styles from './styles.module.scss';

function Navbar() {
  const { t } = useTranslation();
  const history = useHistory();

  const handleLogout = () => {
    LocalStorageService.removeValue(LOCAL_STORAGE_KEYS.client);
    LocalStorageService.removeValue(LOCAL_STORAGE_KEYS.session);
    LocalStorageService.removeValue(LOCAL_STORAGE_KEYS.uid);
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
