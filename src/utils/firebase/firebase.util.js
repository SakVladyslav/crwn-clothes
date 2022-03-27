import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCoDISYjyZr3Jr3_R3jcLdO_B3ZWrUH5AQ',
	authDomain: 'crwn-clother-v2-c6853.firebaseapp.com',
	projectId: 'crwn-clother-v2-c6853',
	storageBucket: 'crwn-clother-v2-c6853.appspot.com',
	messagingSenderId: '258243777475',
	appId: '1:258243777475:web:06b4fd578bb0f33b216376',
	measurementId: 'G-249KF8C4QE',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
};
