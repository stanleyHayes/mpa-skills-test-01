import Head from 'next/head'
import {useState, useEffect} from "react";
import Dialog from "../components/dialog";
import styles from "../styles/Home.module.css";
import {useSession, signIn, signOut} from "next-auth/client";
import {fetchUser} from "../services/rest-service";

const HomePage = () => {

    const [session, loading] = useSession();
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState({});
    const [mode, setMode] = useState("new");

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
            fetchUser(session.user.email).then(res => {
                const {data} = res.data;
                if (data) {
                    setProfile({
                        bio: data.bio,
                        occupation: data.occupation,
                        github: data.github,
                        languages: data.languages
                    });
                    handleDialogOpen();
                }else {
                    setProfile({email: session.user.email, name: session.user.name});
                }
            }).catch(error => {

            });
        }
    }, [session]);

    const handleProfile = data => {
        setProfile(data);
    }

    const handleDetailsEdit = () => {
        setOpen(true);
        setMode("edit");
    }

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
                        <h1 className={styles.title}>Profile</h1>
                        <div>
                            <p className={styles.label}>Name</p>
                            <h1 className={styles.name}>{session.user.name}</h1>
                        </div>
                        <div>
                            <p className={styles.label}>Email</p>
                            <p className={styles.email}>{session.user.email}</p>
                        </div>

                        {profile ? (
                            <div>
                                <div>
                                    <p className={styles.label}>Occupation</p>
                                    <p className={styles.email}>{profile.occupation ? profile.occupation : 'Get a job'}</p>
                                </div>

                                <div>
                                    <p className={styles.label}>Github</p>
                                    {profile.github ?
                                        (<a href={profile.github} target="_blank" className={styles.email}>
                                            View Github Profile
                                        </a>) : (
                                            <p className={styles.email}>Create a Github account if you don't have
                                                one</p>
                                        )}
                                </div>

                                <div>
                                    <p className={styles.label}>Bio</p>
                                    <p className={styles.email}>{profile.bio ? profile.bio : 'Say something about yourself'}</p>
                                </div>

                                <div>
                                    <p className={styles.label}>Programming Languages</p>
                                    <div className={styles.languages_container}>
                                        {profile && profile.languages && profile.languages.length ? (
                                            profile.languages.map((language, index) => {
                                                return (
                                                    <p className={styles.chip} key={index}>
                                                        <span className={styles.chip_text}>{language}</span>
                                                    </p>
                                                )
                                            })
                                        ) : (
                                            <div>
                                                <p className={styles.email}>You really gotta learn a programming
                                                    language</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <div className={styles.button_container}>

                            <button
                                className={styles.edit_details_button}
                                onClick={handleDetailsEdit}>Edit Details
                            </button>
                            <button
                                className={styles.sign_out_button}
                                onClick={handleSignOut}>Sign Out
                            </button>
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
                    <div className={styles.dialog_container}>
                        <div className={styles.dialog}>
                            <Dialog
                                profile={profile}
                                mode={mode}
                                handleProfile={handleProfile}
                                session={session}
                                handleDialogClose={handleDialogClose}/>
                        </div>
                    </div>
                ) : null}

            </main>
        </div>
    )
}

export default HomePage;