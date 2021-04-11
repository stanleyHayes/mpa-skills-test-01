import Link from "next/link";
import Image from "next/image";
import {useSession, signOut} from "next-auth/client";

const NavBar = () => {

    const [session] = useSession();

    return (
        <nav className="nav-container">
            <div className="social-icon-links">
                <a className="logo">
                    <Image src="/mp_gradient_rock.svg" height={75} width={150}/>
                </a>

                <a target="_blank" className="social-icon" href="https://twitter.com/minorityprogram">
                    <img alt="Twitter Logo" src="./twitter.svg" width={20} height={20}/>
                </a>
                <a target="_blank" className="social-icon" href="https://www.facebook.com/MinorityProgrammers">
                    <img alt="Facebook Logo" src="facebook.svg" width={20} height={20}/>
                </a>
                <a target="_blank" className="social-icon" href="https://linkedin.com/company/minority-programmers">
                    <img alt="LinkedIn Logo" src="linkedin.svg" width={20} height={20}/>
                </a>
                <a target="_blank" className="social-icon" href="https://www.facebook.com/minorityprogrammers">
                    <img alt="Instagram Logo" src="instagram.svg" width={20} height={20}/>
                </a>
            </div>
            <div className="nav-items">
                <Link href="/"><a className="link">Home</a></Link>
                <Link href="/services"><a className="link">Services</a></Link>
                <Link href="/events"><a className="link">Events</a></Link>
                <Link href="/learn"><a className="link">Learn</a></Link>
                {session ? (
                    <a className="link" onClick={(e) => {
                        e.preventDefault();
                        signOut();
                    }}>
                        Sign Out
                    </a>
                ) : (
                    <Link href="/login"><a className="link">
                        <a className="link">
                            Sign In
                        </a>
                    </a></Link>

                )}
            </div>
        </nav>
    )
}

export default NavBar;