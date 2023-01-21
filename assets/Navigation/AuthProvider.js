import React, { createContext, useState } from 'react';
import auth, { sendPasswordResetEmail, sendEmailVerification, updateProfile } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebaseErrors } from '../errors/firebase/FireaseErrors';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    console.log("Running login function")
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                        // if (e.code === 'auth/user-not-found') {
                        //     console.log('That email is not recognised');
                        // }
                    }
                },
                register: async (data) => {
                    console.log("calling register function")
                    console.log(data)
                    try {
                        await auth().createUserWithEmailAndPassword(data.email, data.password)
                            .then(() => {
                                //Once the user creation has happened successfully, we can add the currentUser into firestore
                                //with the appropriate details.
                                firestore().collection('Users').doc(auth().currentUser.uid)
                                    .set({
                                        ProNouns: data.pronouns,
                                        FirstName: data.firstName,
                                        MiddleName: data.middleName,
                                        LastName: data.lastName,
                                        PhoneNumber: data.phoneNumber,
                                        dob: data.dob,
                                        Role: "Service-User",
                                        Email: data.email,
                                        isAgreedTC: data.isAgreedTC,
                                        status:"Active",
                                        createdAt: firestore.Timestamp.fromDate(new Date()),
                                    })
                                    .then(() => {
                                        console.log('User added!');
                                    });
                            })
                            // //we need to catch the whole sign up process if it fails too.
                    } catch (e) {
                        console.log(e);
                    }

                    //verification email sent following account signup, this will be available in the metadata
                    //could use the metadata to ensure the email address is verified before an appointment can be booked
                    try {
                        await auth().currentUser.sendEmailVerification();
                        alert("Please check your email and click on the link to verify your account")
                    } catch (e) {
                        console.log(e)
                    }

                    try {
                        //TODO: debug issue with updating profile information, https://stackoverflow.com/questions/53238244/how-to-update-profile-displayname-firebase-in-react-native
                        await auth().currentUser.updateProfile({
                            displayName: 'Gavin',
                            photoURL: 'https://my-cdn.com/assets/user/123.png',
                        })
                    } catch (e) {
                        console.log(e)
                    }

                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        return e.code
                    }
                },
                reset: async (email) => {
                    console.log("Password reset method running")
                    let message = `Reset email sent to ${email}`
                    try {
                        await auth().sendPasswordResetEmail(email)
                            .then(() => message)
                        // return `Reset email sent to ${email}`
                    } catch (e) {
                        return e.code
                        //rather than running alerts on the screen here I can return the error code to display it on page

                    }
                }
            }}>
            {children}
        </AuthContext.Provider>
    );
};