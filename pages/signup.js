import styles from "../styles/Login.module.css";
import RegisterCard from "../components/register-card";
import {useSession} from "next-auth/client";
import {useRouter} from "next/router";
import {useEffect} from "react";

const SignUpPage = () => {

    const [session] = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session){
            router.push("/");
        }
    }, [session]);

    return (
        <div className={styles.container}>
            <RegisterCard />
        </div>
    )
}

export default SignUpPage;