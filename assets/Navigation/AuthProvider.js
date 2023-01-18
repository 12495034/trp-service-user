import React, { createContext, useState } from 'react';
import auth, { sendPasswordResetEmail, sendEmailVerification, updateProfile} from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
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
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                        if (e.code === firebaseErrors.invalidEmail.error) {
                            alert(firebaseErrors.invalidEmail.message)
                        }
                        if (e.code === firebaseErrors.invalidUser.error) {
                            alert(firebaseErrors.invalidUser.message)
                        }
                    }
                },
                register: async (data) => {
                    console.log("calling register function")
                    try {
                        await auth().createUserWithEmailAndPassword(data.email, data.password)
                            .then(() => {

                                //Once the user creation has happened successfully, we can add the currentUser into firestore
                                //with the appropriate details.
                                //   firestore().collection('users').doc(auth().currentUser.uid)
                                //   .set({
                                //       fname: '',
                                //       lname: '',
                                //       email: email,
                                //       createdAt: firestore.Timestamp.fromDate(new Date()),
                                //       userImg: null,
                                //   })
                                //   //ensure we catch any errors at this stage to advise us if something does go wrong
                                //   .catch(error => {
                                //       console.log('Something went wrong with added user to firestore: ', error);
                                //   })

                            })
                            //we need to catch the whole sign up process if it fails too.
                            .catch(error => {
                                console.log('Something went wrong with sign up: ', error);
                            });
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
                        console.log(e);
                    }
                },
                reset: async (email) => {
                    //email is passed into this function from the reset screen via context
                    console.log("Password reset method running")
                    try {
                        await auth().sendPasswordResetEmail(email)
                            .then(() => {
                                alert("reset email sent to " + email);
                            })
                    } catch (e) {
                        //rather than running alerts on the screen here I can return the error code to display it on page
                        if (e.code === firebaseErrors.invalidEmail.error) {
                            alert(firebaseErrors.invalidEmail.message)
                        }
                        if (e.code === firebaseErrors.invalidUser.error) {
                            alert(firebaseErrors.invalidUser.message)
                        }
                    }
                }
            }}>
            {children}
        </AuthContext.Provider>
    );
};