import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {sleep} from '@/utils/helpers';

import {
    addDoc,
    collection,
    doc,
    docData,
    Firestore,
    getDoc,
    setDoc
} from '@angular/fire/firestore';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    User
} from '@angular/fire/auth';

const provider = new GoogleAuthProvider();

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user?: User | null = null;
    public role?: any | null = null;
    public phoneNumber?: any | null = null;

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private firestore: Firestore
    ) {
        onAuthStateChanged(
            getAuth(),
            (user) => {
                console.log('getting auth..');
                if (user) {
                    this.user = user;
                    console.log('user :', user);
                    this.getRole();
                } else {
                    this.user = undefined;
                }
            },
            (e) => {
                this.user = undefined;
            }
        );
    }

    async registerWithEmail(
        email: string,
        password: string,
        displayName: string,
        phoneNumber: string // Include phone number in the parameters
    ) {
        try {
            const result = await createUserWithEmailAndPassword(
                getAuth(),
                email,
                password
            );
            if (result.user) {
                await updateProfile(result.user, {
                    displayName: displayName
                });
                await this.registerDetails(phoneNumber); // Pass the phone number to registerDetails
            }
            this.user = result.user;
            this.router.navigate(['/dashboard']);
            return result;
        } catch (error) {
            this.toastr.error(error.message);
            throw error; // re-throw the error if needed
        }
    }

    async loginWithEmail(email: string, password: string) {
        try {
            const result = await signInWithEmailAndPassword(
                getAuth(),
                email,
                password
            );
            this.user = result.user;
            this.router.navigate(['/dashboard']);

            return result;
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async signInByGoogle() {
        try {
            const result = await signInWithPopup(getAuth(), provider);
            this.user = result.user;

            this.router.navigate(['/dashboard']);
            return result;
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerDetails(phoneNumber: string) {
        try {
            // Reference to the user document
            const userDocRef = doc(this.firestore, `users/${this.user.uid}`);

            // Check if the user document already exists
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                // Add the user document with role 'USER' and phone number if it does not exist
                await setDoc(userDocRef, {
                    uid: this.user.uid,
                    role: 'USER',
                    phoneNumber: phoneNumber // Include the phone number here
                });
                this.role = 'USER';
            } else {
                // If user document exists, retrieve the role
                const userData = userSnapshot.data();
                this.role = userData?.role;
            }
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        console.log('getting profile...');
        try {
            console.log('awaiting for 500ms...');
            await sleep(500);
            console.log('awaiting done');
            const user = getAuth().currentUser;
            if (user) {
                this.user = user;
                console.log('user fetched, getting role..');
                await this.getRole();
            } else {
                this.logout();
            }
            console.log('profile fetched');
        } catch (error) {
            this.logout();
            this.toastr.error(error.message);
        }
    }

    async logout() {
        await getAuth().signOut();
        this.user = null;
        this.router.navigate(['/login']);
    }

    async getRole() {
        try {
            console.log('getting role...');
            // await sleep(500); // Assuming sleep is a function that pauses execution for a given time
            const userDocRef = doc(this.firestore, `users/${this.user.uid}`);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                console.log('userDocSnap :', userDocSnap);
                const userData = userDocSnap.data();
                this.role = userData.role;
                console.log('role fetched');
            } else {
                console.error('error on fetching role');
            }
        } catch (error) {
            this.toastr.error('error fetching role', error.message);
        }
    }

    async getPhoneNumber() {
        try {
            // await sleep(500); // Assuming sleep is a function that pauses execution for a given time
            const userDocRef = doc(this.firestore, `users/${this.user.uid}`);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                console.log(userDocSnap);
                const userData = userDocSnap.data();
                this.phoneNumber = userData.phoneNumber;
                console.error('Phone Number Fetched!');
            } else {
                console.error('No such document!');
            }
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    fetchProfileDuringInit(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.getProfile()
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
