import styles from "../styles/Login.module.css";
import RegisterCard from "../components/register-card";

const SignUpPage = () => {
    return (
        <div className={styles.container}>
            <RegisterCard />
        </div>
    )
}

export default SignUpPage;