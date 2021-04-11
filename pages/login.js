import styles from "../styles/Login.module.css";
import LoginCard from "../components/login-card";
import {useSession} from "next-auth/client";
import {useEffect} from "react";
import {useRouter} from "next/router";

const LoginPage = () => {
    const [session] = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session){
            router.push("/");
        }
    }, [session]);
    return (
        <div className={styles.container}>
            <LoginCard />
        </div>
    )
}

export default LoginPage;