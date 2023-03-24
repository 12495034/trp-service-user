import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
                    console.log(error);
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
        console.log("signIn function running")
        return auth().signInWithEmailAndPassword(email, password)
    }

    async function createUser(data) {
        console.log("creating a new user with input details")
        await auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(() => {
                console.log("Adding firestore instance of user details")
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
                console.log("Updating user auth profile with display name")
                await auth().currentUser.updateProfile({
                    displayName: `${data.firstname} ${data.lastname}`,
                })
            })
            .then(async () => {
                //verification email sent following account signup, this will be available in the metadata
                console.log("Sending verification email to users account")
                await verificationEmail()
            })
            .catch((e) => {
                return Promise.reject(e)
            })
            
        await logOut()
            .then(() => {
                console.log("Logging out to refresh custom claims")
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    async function verificationEmail() {
        return auth().currentUser.sendEmailVerification();
    }

    async function logOut() {
        console.log("logout function running")
        return auth().signOut();
    }

    async function deleteUserAuth() {
        console.log("logout function running")
        return auth().currentUser.delete();
    }

    async function offlineMode(state) {
        await firestore().settings({ persistence: state })
        console.log("offline persistence:", state)
    }

    function reset(email) {
        console.log("Password reset method running")
        return auth().sendPasswordResetEmail(email)
    }

    return (
        <AuthContext.Provider value={{ user, role, status, signIn, createUser, logOut, reset, deleteUserAuth, verificationEmail, offlineMode }}>
            {children}
        </AuthContext.Provider>
    );
};