import styles from "../styles/Dialog.module.css";
import Image from "next/image";
import {useState} from "react";
import axios from "axios";

const Dialog = ({handleDialogClose}) => {
    const [user, setUser] = useState({});
    const [hobbies, setHobbies] = useState([]);
    const [hobby, setHobby] = useState("");

    const handleUserChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
        console.log(user)
    }

    const handleHobbyChange = event => {
        setHobby(event.target.value);
    }

    const handleHobbyAdd = e => {
        e.preventDefault();
        setHobbies([...hobbies, hobby]);
        setHobby("")
    }

    const handleHobbyRemove = hobby => {
        setHobbies(hobbies.filter(h => h !== hobby));
    }

    const handleUserDetailsSubmit = event => {
        event.preventDefault();

        axios({
            url: `'http://localhost:5000/api/v1/users'`,
            method: 'post',
            data: {...user, hobbies}
        }).then(res => {
            const {data, message} = res.data;
            console.log(data, message);
            handleDialogClose();
        }).catch(error => {
            console.log(error.data.error.message);
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
                        name="website"
                        placeholder="Enter website url"
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
                            value={hobby}
                            onChange={handleHobbyChange}
                            className={styles.add_hobby_input}
                            type="text"
                            placeholder="Enter hobby"
                        />

                        <button
                            className={styles.add_hobby_button}
                            value="Add Hobby"
                            onClick={handleHobbyAdd}>
                            Add Hobby
                        </button>
                    </div>
                    <div className={styles.hobbies_container}>
                        {hobbies.length ? (
                            hobbies.map((hobby, index) => {
                                return (
                                    <p className={styles.chip} key={index}>
                                        <span className={styles.chip_text}>{hobby}</span>
                                        <span className={styles.chip_close_container}
                                              onClick={() => handleHobbyRemove(hobby)}>
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