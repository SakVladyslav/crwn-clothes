import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	NextOrObserver,
	User,
	signInWithRedirect,
} from 'firebase/auth';
import {
	getFirestore,
	setDoc,
	doc,
	getDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Category } from '../../store/categories/categories.types';

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
	title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories');
	const queryRef = query(collectionRef);
	const querySnapshot = await getDocs(queryRef);

	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	);
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) {
		return;
	}

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
				...additionalInformation,
			});
		} catch (error) {
			console.error('error creating the user', error);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) {
		return;
	}

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) {
		return;
	}

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
