import React, { useContext, useState } from "react";
import {
	signOut,
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState();

	const auth = getAuth();

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	//send email verification
	function sendemailver() {
		return onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser(user);
				sendEmailVerification(user);
			} else {
			}
		});
	}

	async function login(email, password) {
		let error = "";
		try {
			await signInWithEmailAndPassword(auth, email, password).then(
				(userCredential) => {
					if (userCredential.user.emailVerified) {
						error = "verified";
					} else {
						error = "not";
					}
				}
			);
		} catch (e) {
			error = e.code;
		}
		return error;
	}

	function logout() {
		signOut(auth)
			.then(() => {
				console.log("logout");

				setCurrentUser(null);
			})
			.catch((error) => {
				// An error happened.
			});
	}

	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User

			if (currentUser !== user.uid) {
				setCurrentUser(user.uid);
			}

			// ...
		} else {
			// User is signed out
			// ...
		}

		setLoading(false);
	});

	const value = {
		currentUser,
		login,
		signup,
		logout,
		sendemailver,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
