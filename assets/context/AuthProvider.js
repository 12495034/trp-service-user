import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { refresh } from '@react-native-community/netinfo';

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
            await auth().currentUser.getIdTokenResult()
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
        auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                //create new firestore document record using newly created user credentials
                firestore().collection('Users').doc(userCredential.user.uid)
                    .set({
                        ProNouns: data.pronouns,
                        FirstName: data.firstname.charAt(0).toUpperCase() + data.firstname.slice(1),
                        MiddleName: data.middlename.charAt(0).toUpperCase() + data.middlename.slice(1),
                        LastName: data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1),
                        PhoneNumber: data.phonenumber,
                        dob: data.dob,
                        email: data.email,
                        isAgreedTC: data.isAgreedTC,
                        emailOptIn: data.emailOptIn,
                        createdAt: firestore.Timestamp.fromDate(new Date()),
                    })
            })
            .then(()=>{
                updateAuthProfile(data)
            })
            .then(() => {
                verificationEmail()
            })
            .catch((e)=>{
                return Promise.reject(e)
            })
    }

    async function updateAuthProfile(data) {
        auth().currentUser.updateProfile({
            displayName: `${data.firstname} ${data.lastname}`,
        })
    }

    async function refreshUserToken() {
        auth().currentUser.getIdTokenResult(true)
            .then((idTokenResult) => {
                // console.log("refreshed Token:", idTokenResult.claims.role)
                setRole(idTokenResult.claims.role)
                setStatus(idTokenResult.claims.accountStatus)
            })
            .catch((e) => {
                // console.log(e.message)
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
        <AuthContext.Provider value={{ user, role, status, signIn, createUser, logOut, reset, deleteUserAuth, verificationEmail, offlineMode, refreshUserToken }}>
            {children}
        </AuthContext.Provider>
    );
};