import Link from "next/link";
import Image from "next/image";
import styles from "./../styles/Card.module.css";

const LoginCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.card__information}>
                <p className={styles.card__text}>Welcome Back</p>
                <p className={styles.card__message}>
                    To Keep Connecting with us please register with your personal info
                </p>
            </div>
            <div className={styles.card__form}>
                <p className={styles.sign_in_text}>Sign In</p>
                <p className={styles.info_text}>New to Register? <Link href="/signup"><a className={styles.link}>Sign
                    up</a></Link></p>
                <div className={styles.social_items}>
                    <div className={styles.social_item}>
                        <Image src="/google-colored.svg" width={25} height={25}/>
                    </div>
                    <div className={styles.social_item}>
                        <Image src="/linkedin-colored.svg" width={25} height={25}/>
                    </div>
                    <div className={styles.social_item}>
                        <a href="http://localhost:3000/api/auth/signin">
                            <Image src="/github-colored.svg" width={25} height={25}/>
                        </a>
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
                        <button className={styles.button} type="submit" value="Login">Login</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginCard