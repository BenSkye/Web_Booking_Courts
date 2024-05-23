import styles from './RegisterPackageCourt.module.css';


export default function RegisterPackageCourt() {
  return (
    <div>
      <h1>Register Package Court</h1>
      <div className={styles.packageContainer}>
        <div className={styles.package}>
          <h2>Gói 6 tháng</h2>
          <p className={styles.price}>1.377.924 <span>đ</span></p>
          <p>Thuê trong 6 tháng</p>
          <p>Discount 10%</p>
          <button className={styles.button}>Mua Ngay</button>
        </div>
        <div className={styles.package}>
          <h2>Gói 1 năm</h2>
          <p className={styles.price}>2.756.124 <span>đ</span></p>
          <p>Thuê trong 1 năm</p>
          <p>Discount 20%</p>
          <button className={styles.button}>Mua Ngay</button>
        </div>
        <div className={styles.package}>
          <h2>Gói 2 năm</h2>
          <p className={styles.price}>5.512.523 <span>đ</span></p>
          <p>Thuê trong 2 năm</p>
          <p>Discount 30%</p>
          <button className={styles.button}>Mua Ngay</button>
        </div>
      </div>
    </div>
  );
};
