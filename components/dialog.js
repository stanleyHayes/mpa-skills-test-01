import styles from "../styles/Dialog.module.css";
import {useState} from "react";
import axios from "axios";
import {DEVELOPMENT_SERVER_URL, PRODUCTION_SERVER_URL} from "../constants/constants";

const Dialog = ({handleDialogClose, session, handleProfile, mode, profile}) => {
    const [user, setUser] = useState({
        email: session && session.user && session.user.email,
        name: session && session.user && session.user.name,
        bio: profile.bio,
        occupation: profile.occupation,
        github: profile.github
    });
    const [languages, setLanguages] = useState(profile.languages || []);
    const [language, setLanguage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUserChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const handleHobbyChange = event => {
        setLanguage(event.target.value);
    }

    const handleHobbyAdd = e => {
        e.preventDefault();
        setLanguages([...languages, language]);
        setLanguage("")
    }

    const handleHobbyRemove = language => {
        setLanguages(languages.filter(l => l !== language));
    }

    const handleUserDetailsSubmit = event => {
        event.preventDefault();

        setLoading(true);
        axios({
            url: `${DEVELOPMENT_SERVER_URL}/api/v1/users`,
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': "*"
            },
            data: {...user, languages}
        }).then(res => {
            const {data} = res.data;
            handleProfile(data);
            setLoading(false);
            handleDialogClose();
        }).catch(error => {
            setLoading(false);
            console.log(error.data);
        });
    }

    const handleUserDetailsUpdate = event => {
        event.preventDefault();
        setLoading(true);
        axios({
            url: `${DEVELOPMENT_SERVER_URL}/api/v1/users/${user.email}`,
            method: 'put',
            headers: {
                'Access-Control-Allow-Origin': "*"
            },
            data: {...user, languages}
        }).then(res => {
            const {data} = res.data;
            handleProfile(data);
            setLoading(false);
            handleDialogClose();
        }).catch(error => {
            setLoading(false);
            console.log(error.data);
        });
    }

    return (
        <div className={styles.container}>
            {mode === "edit" ? (
                <div>
                    <p className={styles.info_text}>Welcome back </p>
                    <p className={styles.greeting_text}>{user.name}</p>
                    <p className={styles.info_text}>Update your profile</p>
                </div>
            ) : (
                <div>
                    <p className={styles.greeting_text}>Greetings & Welcome</p>
                    <p className={styles.info_text}>We are glad you joined</p>
                    <p className={styles.info_text}>Please fill this form with your personal details</p>
                </div>
            )}
            <form>
                {loading && <p className={styles.loading_text}>Loading...</p>}
                <div>
                    <input
                        onChange={handleUserChange}
                        value={user.name}
                        required={true}
                        className={styles.input}
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                    />
                </div>

                <div>
                    <input
                        onChange={handleUserChange}
                        value={user.email}
                        required={true}
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                    />
                </div>

                <div>
                    <input
                        onChange={handleUserChange}
                        value={user.occupation}
                        defaultValue={profile.occupation}
                        className={styles.input}
                        type="text"
                        name="occupation"
                        placeholder="Enter occupation"
                    />
                </div>

                <div>
                    <input
                        onChange={handleUserChange}
                        value={user.github}
                        defaultValue={profile.github}
                        className={styles.input}
                        type="url"
                        name="github"
                        placeholder="Enter github url"
                    />
                </div>

                <div>
                    <textarea
                        onChange={handleUserChange}
                        value={user.bio}
                        defaultValue={profile.bio}
                        rows={5}
                        name="bio"
                        className={styles.input}
                        placeholder="Enter bio"
                    />
                </div>

                <div>
                    <div className={styles.hobby_form_container}>
                        <input
                            value={language}
                            onChange={handleHobbyChange}
                            className={styles.add_hobby_input}
                            type="text"
                            placeholder="Enter Programming Language"
                        />

                        <button
                            className={styles.add_hobby_button}
                            value="Add Programming Language"
                            onClick={handleHobbyAdd}>
                            Add Language
                        </button>
                    </div>
                    <div className={styles.hobbies_container}>
                        {languages && languages.length ? (
                            languages.map((language, index) => {
                                return (
                                    <p className={styles.chip} key={index}>
                                        <span className={styles.chip_text}>{language}</span>
                                        <span className={styles.chip_close_container}
                                              onClick={() => handleHobbyRemove(language)}>
                                        <img alt="" title="" width={20} height={10} src="/close.svg"/>
                                </span>
                                    </p>
                                )
                            })
                        ) : (
                            <div className={styles.no_hobbies_container}>
                                <p className={styles.info_text}>I wonder what you code in...</p>
                            </div>
                        )}
                    </div>
                </div>

                <hr className={styles.divider}/>

                <div className={styles.buttons_container}>
                    <button
                        onClick={handleDialogClose}
                        className={styles.close_dialog_button}
                        value="Close"
                        type="submit">
                        Close
                    </button>

                    {mode === "edit" ? (
                        <button
                            className={styles.submit_button}
                            onClick={handleUserDetailsUpdate}
                            value="Submit"
                            type="submit">
                            Update
                        </button>
                    ) : (
                        <button
                            className={styles.submit_button}
                            onClick={handleUserDetailsSubmit}
                            value="Submit"
                            type="submit">
                            Submit
                        </button>
                    )}


                </div>
            </form>
        </div>
    )
}

export default Dialog;