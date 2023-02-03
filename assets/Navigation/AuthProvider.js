import React, { createContext, useState } from 'react';
import auth, { sendPasswordResetEmail, sendEmailVerification, updateProfile } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebaseErrors } from '../errors/firebase/FireaseErrors';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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
                        Role: data.role,
                        Email: data.email,
                        isAgreedTC: data.isAgreedTC,
                        status: data.status,
                        createdAt: firestore.Timestamp.fromDate(new Date()),
                    })
            })
            .then(async () => {
                console.log("Updating user auth profile with display name")
                await auth().currentUser.updateProfile({
                    displayName: 'Gavin',
                })
            })
            .then(async () => {
                //verification email sent following account signup, this will be available in the metadata
                console.log("Sending verification email to users account")
                verificationEmail()
            })
            .catch((e) => {
                return Promise.reject(e)
            })
    }
    async function verificationEmail(){
        return auth().currentUser.sendEmailVerification();
    }

    async function logOut() {
        console.log("logout function running")
        return auth().signOut();
    }

    async function deleteUserAuth(){
        console.log("logout function running")
        return auth().currentUser.delete();
    }

    function reset(email) {
        console.log("Password reset method running")
        return auth().sendPasswordResetEmail(email)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, signIn, createUser, logOut, reset, deleteUserAuth, verificationEmail }}>
            {children}
        </AuthContext.Provider>
    );
};