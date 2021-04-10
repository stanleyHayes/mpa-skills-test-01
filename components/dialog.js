import styles from "../styles/Dialog.module.css";
import {useState} from "react";
import axios from "axios";

const Dialog = ({handleDialogClose, session, handleProfile}) => {
    const [user, setUser] = useState({email: session.email, name: session.name});
    const [languages, setLanguages] = useState([]);
    const [language, setLanguage] = useState("");

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

        axios({
            url: `https://git.heroku.com/mpa-mern-test-01.git/api/v1/users`,
            method: 'post',
            data: {...user, languages}
        }).then(res => {
            const {data, message} = res.data;
            handleProfile(data);
            console.log(data, message);
            handleDialogClose();
        }).catch(error => {
            console.log(error.data);
        });
    }
    return (
        <div className={styles.container}>
            <p className={styles.greeting_text}>Greetings & Welcome</p>
            <p className={styles.info_text}>We are glad you joined</p>
            <p className={styles.info_text}>Please fill this form with your personal details</p>

            <form>
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
                        className={styles.input}
                        type="text"
                        name="occupation"
                        placeholder="Enter occupation"
                    />
                </div>

                <div>
                    <input
                        onChange={handleUserChange}
                        value={user.website}
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
                            placeholder="Enter Language"
                        />

                        <button
                            className={styles.add_hobby_button}
                            value="Add Programming Language"
                            onClick={handleHobbyAdd}>
                            Add Language
                        </button>
                    </div>
                    <div className={styles.hobbies_container}>
                        {languages.length ? (
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
                                <p className={styles.info_text}>You have no hobbies!!!Really?</p>
                                <p className={styles.info_text}>Are you that boring?</p>
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

                    <button
                        className={styles.submit_button}
                        onClick={handleUserDetailsSubmit}
                        value="Submit"
                        type="submit">
                        Submit
                    </button>

                </div>
            </form>
        </div>
    )
}

export default Dialog;