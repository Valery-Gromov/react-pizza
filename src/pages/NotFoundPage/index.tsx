import React from 'react';

import styles from './NotFoundPage.module.scss';

const NotFoundPage:React.FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h1>Oh, oh! Slikha slikha slikha</h1>
      <p>This page does not exist</p>
    </div>
  );
};

export default NotFoundPage;
