import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//Auth provider manages user state changes and persists the user state across the app
//App is wrapper within AuthContext.Provider allowing state and functions to be retrieved at any level below
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [status, setStatus] = useState(null);

    async function onAuthStateChanged(user) {
        if (user) {
            setUser(user)
            //retrieves the custom claims role and status
            await auth().currentUser.getIdTokenResult(true)
                .then((idTokenResult) => {
                    setRole(idTokenResult.claims.role)
                    setStatus(idTokenResult.claims.accountStatus)
                })
                .catch((error) => {
                    //console.log(error);
                });
        } else {
            setUser(null)
        }
    }

    //use effect contains listener to monitor user state changes
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    async function signIn(email, password) {
        return auth().signInWithEmailAndPassword(email, password)
    }

    async function createUser(data) {
        await auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(() => {
                firestore().collection('Users').doc(auth().currentUser.uid)
                    .set({
                        ProNouns: data.pronouns,
                        FirstName: data.firstname,
                        MiddleName: data.middlename,
                        LastName: data.lastname,
                        PhoneNumber: data.phonenumber,
                        dob: data.dob,
                        email: data.email,
                        isAgreedTC: data.isAgreedTC,
                        emailOptIn: data.emailOptIn,
                        createdAt: firestore.Timestamp.fromDate(new Date()),
                    })
            })
            .then(async () => {
                await auth().currentUser.updateProfile({
                    displayName: `${data.firstname} ${data.lastname}`,
                })
            })
            .then(async () => {
                //verification email sent following account signup, this will be available in the metadata
                await verificationEmail()
            })
            .catch((e) => {
                return Promise.reject(e)
            })
            
        await logOut()
            .then(() => {
                //logging out to refresh custom claims
            })
            .catch((error) => {
                //console.log(error.message)
            })
    }

    async function verificationEmail() {
        return auth().currentUser.sendEmailVerification();
    }

    async function logOut() {
        return auth().signOut();
    }

    async function deleteUserAuth() {
        return auth().currentUser.delete();
    }

    async function offlineMode(state) {
        await firestore().settings({ persistence: state })
    }

    function reset(email) {
        return auth().sendPasswordResetEmail(email)
    }

    return (
        <AuthContext.Provider value={{ user, role, status, signIn, createUser, logOut, reset, deleteUserAuth, verificationEmail, offlineMode }}>
            {children}
        </AuthContext.Provider>
    );
};