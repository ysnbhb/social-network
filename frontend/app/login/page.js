import { useRef, useEffect } from "react";
import styles from "./page.module.css";

export default function Login() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const signUpButton = container.querySelector("#signUp");
        const signInButton = container.querySelector("#signIn");

        const handleSignUpClick = () => {
            container.classList.add(styles.rightPanelActive);
        };

        const handleSignInClick = () => {
            container.classList.remove(styles.rightPanelActive);
        };

        signUpButton.addEventListener("click", handleSignUpClick);
        signInButton.addEventListener("click", handleSignInClick);

        return () => {
            signUpButton.removeEventListener("click", handleSignUpClick);
            signInButton.removeEventListener("click", handleSignInClick);
        };
    }, []);
    return (
        <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container} id="container" ref={containerRef}>
	<div className={styles.formContainer + " " + styles.signUpContainer}>
		<form action="#">
			<h1>Create Account</h1>
			<span>or use your email for registration</span>
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
		</form>
	</div>
	<div className={styles.formContainer + " " + styles.signInContainer}>
		<form action="#">
			<h1>Sign in</h1>
			<span>or use your account</span>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</form>
	</div>
	<div className={styles.overlayContainer}>
		<div className={styles.overlay}>
			<div className={styles.overlayPanel + " " + styles.overlayLeft}>
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button className={styles.ghost} id="signIn">Sign In</button>
			</div>
			<div className={styles.overlayPanel + " " + styles.overlayRight}>
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className={styles.ghost} id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>
</main>
</div>
)
}



