import Head from 'next/head'
import {useState, useEffect} from "react";
import Dialog from "../components/dialog";
import styles from "../styles/Home.module.css";
import {useSession, signIn, signOut} from "next-auth/client";

const HomePage = () => {

    const [session, loading] = useSession();
    const [open, setOpen] = useState(false);
    const handleDialogClose = () => {
        setOpen(false)
    }

    const handleDialogOpen = () => {
        setOpen(true);
    }

    const handleSignIn = e => {
        e.preventDefault();
        signIn();
    }

    const handleSignOut = e => {
        e.preventDefault();
        signOut();
    }

    useEffect(() => {
        if (session) {
            handleDialogOpen();
        }
    }, [session]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>

                {loading && (
                    <div className={styles.loading_container}>
                        <p className={styles.loading_text}>loading...</p>
                    </div>
                )}

                {!loading && session && (
                    <div className={styles.session_container}>
                        <h1 className={styles.name}>{session.user.name}</h1>
                        <p className={styles.email}>{session.user.email}</p>
                        <div className={styles.button_container}>
                            <button className={styles.sign_out_button} onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>
                )}

                {!loading && !session && (
                    <div className={styles.no_session_container}>
                        <p className={styles.info_text}>You are not signed in!!!</p>
                        <p className={styles.info_text}>Stranger in Moscow</p>
                        <div className={styles.button_container}>
                            <button className={styles.sign_out_button} onClick={handleSignIn}>Sign In</button>
                        </div>
                    </div>
                )}


                {open ? (
                    <div className={styles.dialog}>
                        <Dialog handleDialogClose={handleDialogClose}/>
                    </div>
                ) : null}

            </main>
        </div>
    )
}

export default HomePage;