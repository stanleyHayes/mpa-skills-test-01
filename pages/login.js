import styles from "../styles/Login.module.css";
import LoginCard from "../components/login-card";

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <LoginCard />
        </div>
    )
}

export default LoginPage;