import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, ...props }) => {
  return (
    // recebe as props, para facilitar caso em algum lugar vá usar algma propriedade diferente e não ter que ficar vindo aqui e passando
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
