import React from 'react';
import styles from './button.module.css';

type fromGoBtnProps = {
  goBtn? : boolean;
}

const Button:React.FC<fromGoBtnProps> = (props) => {
  const {goBtn} = props;

  if(goBtn) {
    return (
      <div>
        <button className={styles.GoBtn}>나만의 라즈베리 고르러 가기</button>
      </div>
    );
  } else {
    return (
      <div>
        <button className={styles.btn}>000 변경</button>
      </div>
    );
  }
};

export default Button;