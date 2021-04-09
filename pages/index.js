import Head from 'next/head'
import {useState} from "react";
import Dialog from "../components/dialog";
import styles from "../styles/Home.module.css";

const HomePage = () => {

    const [open, setOpen] = useState(true);
    const handleDialogClose = () => {
        setOpen(false)
    }

    const handleDialogOpen = () => {
        setOpen(true);
    }

    return (
        <div className={{}}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={{}}>

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