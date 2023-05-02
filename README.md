# The Rainbow Project - Appointment Booking APP for Rapid HIV & Syphillis testing
## 1. Project Description
The Rainbow Project is the largest LGBT charity in Nothern Ireland, who offer a variety of services to the LGBT community. One such service is rapid HIV and Syphillus testing. A system was developed to enable The Rainbow project to schedule rapid HIV testing clinics at specific test centers within the City of Belfast. This project covered the developement of a mobile application to enable service users to book and manage their own appointments. 




https://user-images.githubusercontent.com/94055886/235634889-ca110765-d47a-49ef-864b-25ca1392c7b7.mp4




A seperate web application was developed to allow The Rainbow Project to created and manage testing clinics. The web app repository can be found [HERE](https://github.com/12495034/trp-serviceprovider_2).

The mobile app was developed as a cross platform mobile using React-Native with Firebase utilised for user authentication and data storage. As the mobile app is cross platform it is compatible with both Android and iOS devices. However, the primary objective of the project was to deliver a mobile app for the android platform. The system has completed user testing but is still in developement to resolve outstanding key issues. Have a look at the 'How to contribute' section if you would like to get involved with solving these issues.


## 2. Environment Setup

For more details consult the React_native developement environment setup [HERE](https://reactnative.dev/docs/0.70/environment-setup)

1. Install Node version 14 or newer
2. Install Java developement kit (Recommended JDK11)
3. Install Android Studio
   - Android SDK
   - Android SDK Platform (Android 12(s) required)
   - Android Virtual Device
4. Configure environment Variables
   - ANDROID_HOME (See example below)
     - ![image](https://user-images.githubusercontent.com/94055886/235624440-4907219a-ac71-4ae7-8588-59b7bafe6ab5.png)

   - JAVA_HOME (See example below)
     - ![image](https://user-images.githubusercontent.com/94055886/235624623-8469bcd2-a473-4d05-aec6-32e5b9f0d9c2.png)

Note: If you have installed react-native-cli package please remove it as it may cause unexpected issues. The command line interface can be accessed using the `npx` command, which ships with node.
     
## Installation

1. Clone the repository (Local copy only)
   - Open Git Bash
   - Type `git clone https://github.com/12495034/trp-service-user.git`
   - Press enter
2. Navigate to the project root directory and Run `npm install` to install dependencies

## Run the App
It is recommended to use a physical device to run the mobile app as newer version of the android issues caused issues with firebase.

1. Connect device to developement machine using USB cable
2. Ensure mobile device is in developement mode
3. Turn on USB debugging
4. Confirm device is connected by using command 'adb devices'
   - If the device is not listed try changing `USB Configuration` to `PTP`
2. Run `npx react-native run-android start`

## 3. credits
The Rainbow project provided vital user feedback of the mobile app during developement and also conducted user testing. I'd like to thank them for the help they gave me during this project. Additionally I would like to thank my project supervisor Leo Gallway for keeping me on the straight and narrow during this difficult project.

## 4. Testing

Unit tests and snapshot tests were utilised within the mobile app. Unit tests have the suffix `.test.js` and are located next the the file they are testing within the project folder structure. Snapshots were performed to confirm basic rendering of critical components and are stored within the _tests_ folder within the project. Tests were carried out using the JEST framework and react-native-testing-library.

Run `npm test`

## 5. How to contribute
For a list of known issues with the mobile app and areas you can contribute please consult the issues log. Additional recommendations are always welcome so if you have an idea for an app improvement, please leave a comment for discussion.

For a detailed explanation on performing the steps below please consult the following [ARTICLE](https://www.dataschool.io/how-to-contribute-on-github/)

1. Sign In to Github
2. Fork Repository
3. Clone fork
4. Navigate to local repository
5. Check that your fork is the "origin" remote
6. Add the project repository as the "upstream" remote
7. Pull latest changes from upstream into local repository
8. Create new branch
9. Make your proposed changes
10. Commit the changes
11. Push changes to fork
12. Begin pull request
13. Create the pull request 
    - If you referencing a specific issue from the issues log please reference the specific issue
    - What does the change implement/Fix? Please explain your changes clearly
    - Include any additional information you feel is relevant eg. additional dependencies required, etc
14. Review Pull Request
