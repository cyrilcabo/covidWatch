# Covid Watch
## Introduction
Covid Watch is a web application aimed to monitor COVID19 cases in the Philippines. The public can be provided with substantial and comprehensive updates regarding the outbreak. Compared to other COVID19 case trackers, CovidWatch provides the user with updates from the national level down to each and every cities or municipalities in the Philippines.

### Demo
Covid Watch is live at: https://ncovidwatch.herokuapp.com . Check it out, and don't forget to follow me for more projects like this.

## Technologies Used
Covid Watch is currently built with the following technologies:
* NodeJS
* ExpressJS
* ReactJS
* NextJS
* ReduxJS
* MongoDB
* Material-UI
* Leaflet Map API

## Setup
You can clone the repository to your local machine. Be sure that you have NodeJS and MongoDB installed that is pre-filled with mock data. You can then run `npm install`, and after installing dependencies, run `npm build`. Finally, you can run `npm start`, and check your application running at `http://localhost:3000`.

## Features
### Watch Your City
With an easy to use search bar, you can easily search for updates on different locations. You can search either by regions, or cities. The updates include Confirmed cases, PUIs (Persons Under Investigation), PUMs (Persons Under Monitoring), Recovered cases, and the number of deaths in each locality. 

### Announcements
Users can filter announcements, whether they want to see local or national announcements.

### Local Announcements
Users can also view different local announcements made by the respective LGUs. 

### National Announcements
Users can read national announcements made by the different LGUs.

### Admin Registration
Each LGU can pick their respective locality, and register credentials with respect to that locality.

### Admin Login
With the credentials they registered with, they can login to the admin panel. But, they can only manage updates and announcements limited to the locality they registered for.

### Cases Overview (Admin Only)
Admin users can see the overview of the COVID19 cases of their locality, with respect to both the region they belong in, and to the country's cases.

### Update Cases (Admin Only)
Admin users can manage COVID19 cases (add, delete) in their locality.

### Post Announcements (Admin Only)
Admin users can post announcements, either locally or nationally.