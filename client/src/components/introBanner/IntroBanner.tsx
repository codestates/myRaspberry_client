import React, {useState} from 'react';
import styles from './introBanner.module.css';
import { ImPointUp } from "react-icons/im";

const IntroBanner: React.FC = () => {
  const [close, setClose] = useState(true)
	
	return (
			<div className={close? styles.show : styles.none}>
				<div className={styles.show_icon_box}>
					<ImPointUp className={styles.show_icon} />
				</div>
				<div className={styles.show_box}>
					<span className={styles.show_text}>선호하지 않는 영화를 골라주세요</span>
					<button className={styles.show_btn} onClick={()=> setClose(false)} >닫기</button>
				</div>
			</div>
	);
};

export default IntroBanner;