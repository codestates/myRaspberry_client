import React, {useState} from 'react';
import styles from './userImage.module.css';

const UserImage = () => {
  const [isUserImg, setUserImag] = useState(false)
  return (
    <div className={styles.user_img_box}>
      <img className={styles.user_img} src={!isUserImg ? "https://i.ibb.co/rxmRjS2/main.png" : "src"} alt="userimage" />
    </div>
  );
};

export default UserImage;