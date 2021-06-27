<img src="./assets/imgs/logo.png" align="right" width="27%" style="margin-top:15px; background-color:white; border-raduis:10px"/>

# Talabatak

it's an online ordering application and this is its mobile client application

# Table of Contents

- ### [Introduction](#Introduction) :microphone:
- ### [Installation steps](#Getting-Started) :memo:
- ### [Related repos](#Related-Repos)
- ### [Authors](#Authors) :thinking:
- ### [License](#License) :closed_book:

# Introduction

This project is a full on system which works similarly as talabat the delivery system we have the backend in this repo and the rest of the system is distributed through other repos which their links will be found at the end of the document, The system consists of a web frontend for:

The service providers (Restaurants, Pharmacies,etc..)
The Super users
The clients/guests
also the system has a driver mobile application for the people which are responsible for delivery and a mobile application for the clients.

With that being said let's discuss the decisions taken in this project.

# Installation steps

    1.	Make sure that Git is installed.
    2.	Open the terminal in an empty directory and type $ git clone
    Client mobile app : https://github.com/mmAbdelhay/talabat-mobile-client.git
    Driver mobile app : https://github.com/mmAbdelhay/talabat-mobile-driver.git
    3.	Once it’s done make sure you have Node and NPM installed
    4.	Then type $ npm install —global expo-cli
    5.	Open the directory that appeared and in the terminal type $ yarn install
    6.	Make sure your backend is on
    7.	Open up your terminal and type $ ip addr , if you are on linux and $ ip config if your are on windows to get your ip
    8.	Open src/assets/config type your backend ip (if you want to run it to the backend installed on your localhost so it will be http://your ip : and the port that your backend listening on)
    9.	If you want to run the application on your own mobile device then go to your app store or google play and install app called expo go
    10.	Make sure your laptop and your mobile connected to the same network
    11.	Now you can type expo strat it will open to you a tab in your default browser you can now scan the QRcode from your mobile it will open expo go and run smoothly
    12.	If you want to run the app on android emulator so after step number 8 make sure your laptop is in the requirement 4 GB RAM minimum; 8 GB RAM recommended. 2 GB of available digital storage minimum, 4 GB Recommended (500 MB for IDE + 1.5 GB for Android SDK and emulator system image).
    13.	Open android studio from bottom left open AVD manager and from it open your android emulator
    14.	Type in the same terminal expo start it will open up in your default broswer you can now select run on android emulator from the left and expo will add the expo go and take care of the rest

# Related-repos

- BackEnd : https://github.com/aliosman21/Talabat_Backend.git
- FrontEnd : https://github.com/mmAbdelhay/talabat-frontend.git
- Driver mobile application : https://github.com/mmAbdelhay/talabat-mobile-driver.git

# Authors

<a href="https://github.com/aliosman21"><img src="https://github.com/aliosman21.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>
<a href="https://github.com/mmAbdelhay"><img src="https://github.com/mmAbdelhay.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>
<a href="https://github.com/karim-arafa"><img src="https://github.com/karim-arafa.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>
<a href="https://github.com/youssefshaban"><img src="https://github.com/youssefshaban.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>
<a href="https://github.com/ibrahimHesham"><img src="https://github.com/ibrahimHesham.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>
<a href="https://github.com/ali-khaled-ali"><img src="https://github.com/ali-khaled-ali.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>

# License

SeaScape is [MIT licensed](./LICENSE).
