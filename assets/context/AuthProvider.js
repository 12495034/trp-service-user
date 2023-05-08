import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { refresh } from '@react-native-community/netinfo';

//Auth provider manages user state changes and persists the user state across the app
//App is wrapper within AuthContext.Provider allowing state and functions to be retrieved throughout the component tree
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [status, setStatus] = useState(null);

    /**
     * Function used to track user state 
     * User object, role and account status held as high level state variables
     * @param {Object} user current signed in user
     */
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

    /**
     * Firebase Function to sign in user with email and password
     * @param {String} email 
     * @param {String} password 
     * @returns Promise
     */
    async function signIn(email, password) {
        return auth().signInWithEmailAndPassword(email, password)
    }

    /**
     * Firebase function used to create a new user with an email and password
     * @param {Object} data Data entered into user signup form
     * Following user signup a firestore user document is created with the users firebase id
     * Auth profile is also updated with new name information
     * A verification email is sent to the users email they entered at signup
     * Promise rejection returned if any of the operations do not succeed
     */
    async function createUser(data) {
        return auth().createUserWithEmailAndPassword(data.email, data.password)
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
            .then(async()=>{
                updateAuthProfile(data)
            })
            .then(async() => {
                verificationEmail()
            })
            .catch((e)=>{
                console.log("Theres a problem")
                return Promise.reject(e)
            })
    }

    /**
     * Function to update users auth profile with new information
     * @param {Object} data Data entered at user signup
     */
    async function updateAuthProfile(data) {
        auth().currentUser.updateProfile({
            displayName: `${data.firstname} ${data.lastname}`,
        })
    }

    /**
     * Function to refresh a users idToken when custom claims or auth profile has been updated
     */
    async function refreshUserToken() {
        auth().currentUser.getIdTokenResult(true)
            .then((idTokenResult) => {
                setRole(idTokenResult.claims.role)
                setStatus(idTokenResult.claims.accountStatus)
            })
            .catch((e) => {
                // console.log(e.message)
            })
    }


    /**
     * Firebase Function to send verification email to the current user
     */
    async function verificationEmail() {
        return auth().currentUser.sendEmailVerification();
    }

    /**
     * Firebase Function to logout the current user
     */
    async function logOut() {
        return auth().signOut();
    }

    /**
     * Firebase Function to delete the current users auth profile
     * This triggers a cloud function to perform clean up operations on the firestore database
     */
    async function deleteUserAuth() {
        return auth().currentUser.delete();
    }

    /**
     * Function to alter firestore offline persistence
     */
    async function offlineMode(state) {
        await firestore().settings({ persistence: state })
    }

    /**
     * Function to send password reset email to a specific email address
     * @param {String} email 
     */
    function reset(email) {
        return auth().sendPasswordResetEmail(email)
    }

    //AuthContext Provider used to pass high level user state and functions to all levels of the component tree
    //See index.js file in navigation
    return (
        <AuthContext.Provider value={{ user, role, status, signIn, createUser, logOut, reset, deleteUserAuth, verificationEmail, offlineMode, refreshUserToken }}>
            {children}
        </AuthContext.Provider>
    );
};