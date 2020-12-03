import React from 'react';
import styles from './button.module.css';

type fromGoBtnProps = {
  isIntroBtn
}

const Button:React.FC<fromGoBtnProps> = (props) => {
  
  if(props.isIntroBtn) {
    return (
      <div>
        <button className={styles.btn}>000 변경</button>
      </div>
    );
  } else {
    return (
      <div>
        <button className={styles.GoBtn}>나만의 라즈베리 고르러 가기</button>
      </div>
    );
  }
};

export default Button;