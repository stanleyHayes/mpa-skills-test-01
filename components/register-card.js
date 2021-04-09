import Link from "next/link";
import Image from "next/image";
import styles from "./../styles/Card.module.css";

const RegisterCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.card__information}>
                <p className={styles.card__text}>Register for MPA</p>
                <p className={styles.card__message}>
                    To Keep Connecting with us please register with your personal info
                </p>
            </div>
            <div className={styles.card__form}>
                <p className={styles.sign_in_text}>Sign Up</p>
                <p className={styles.info_text}>Already have an account? <Link href="/login"><a className={styles.link}>Sign
                    In</a></Link></p>
                <div className={styles.social_items}>
                    <div className={styles.social_item}>
                        <Image src="/google-colored.svg" width={25} height={25}/>
                    </div>
                    <div className={styles.social_item}>
                        <Image src="/linkedin-colored.svg" width={25} height={25}/>
                    </div>
                    <div className={styles.social_item}>
                        <Image src="/github-colored.svg" width={25} height={25}/>
                    </div>
                    <div className={styles.social_item}>
                        <Image src="/facebook-colored.svg" width={25} height={25}/>
                    </div>
                </div>
                <div className={styles.divider_container}>
                    <div className={styles.divider_root}>
                        <hr className={styles.divider}/>
                    </div>
                    <div className={styles.or}>or</div>
                    <div className={styles.divider_root}>
                        <hr className={styles.divider}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label className={styles.label}>Full name</label>
                        <div className={styles.input_container}>
                            <div className={styles.icon_container}>
                                <Image src="/user.svg" width={20} height={20}/>
                            </div>
                            <input className={styles.input} type="text"/>
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>Email</label>
                        <div className={styles.input_container}>
                            <div className={styles.icon_container}>
                                <Image src="/envelope.svg" width={20} height={20}/>
                            </div>
                            <input className={styles.input} type="email"/>
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>Password</label>
                        <div className={styles.input_container}>
                            <div className={styles.icon_container}>
                                <Image src="/lock.svg" width={20} height={20}/>
                            </div>
                            <input className={styles.input} type="password"/>
                        </div>

                    </div>

                    <div>
                        <button className={styles.button} type="submit" value="Login">Register</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RegisterCard