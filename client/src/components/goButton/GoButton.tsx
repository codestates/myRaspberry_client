import React, {useState} from 'react';
import Button from "../elements/button/Button";
import styles from './goButton.module.css';


const GoButton :React.FC = () => {
  const [isIntroBtn, setIsIntroBtn] = useState(false) 
  return (
    <div className={styles.goBtnBox}>
      <Button isIntroBtn={isIntroBtn} />
    </div>
  );
};

export default GoButton;