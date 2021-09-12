# Charging-Spots
Charging Spots is an application that let's the user find surrounding charging spots and charge his/hers EV.

# Getting Started 

## 1. Clone the Repo 
\
`git clone https://github.com/KonGkal/Charging-Spots`

## 2. Install dependencies
\
  Navigate into the folder and run `yarn`

## 3. Add Enviromental Variable
\
  Within the folder there is an `.example.env` file.
\
  In order for the app to be able to fetch data from the <a href="https://openchargemap.org/site/develop#api">Open Charge Map</a> API you will need an API KEY.
\
  Copy the variable from the `.example.env` file, paste it on a new `.env` file that you will create locally and fill the variable with your API KEY. 

## 4. Start the app
\
  Run the app by executing `yarn start` from inside the repo. 

# Tech stack
<a href="https://reactnative.dev/">React Native</a>
\
<a href="https://www.typescriptlang.org/">TypeScript</a>
\
<a href="https://axios-http.com/">Axios</a>

# Notes

## My approach
\
Based on the directions of the challenge, the app was built using React Native Expo.
\
I used `react-router-native` to navigate through the Screens and Components of the app and `react-native-maps` to render the map.
\
By fetching data from <a href="https://openchargemap.org/site/develop#api">Open Charge Map</a> API and confining that data depending on the position 
of the user and the country that the user is currently in, the user is able to see charging spots located on a 1km radius around him/her.
\
<a href="https://axios-http.com/">Axios</a> was used to fetch the data and expo's <a href="https://docs.expo.dev/versions/latest/sdk/location/">Location</a> and 
<a href="https://docs.expo.dev/versions/latest/sdk/localization/">Localization</a> packages were used to get the current position of the user and the countryCode
in order to make the http requests.
\
With the response data from the API markers are being created and rendered on the map, which if they are clicked will redirect the user to the selected spot.
\
On the selected charging spot the user can begin charging the vehicle.

## Notes about the functionality of the app.
* When a charging spot is selected and the `Start Charging` functionality is triggered an exeption will be thrown. 
That is because the post request triggered by the press of the `Start Charging` button will call a function which makes a post request with an invalid example URL.
* The `Location.getCurrentPositionAsync()` of the expo <a href="https://docs.expo.dev/versions/latest/sdk/location/">Location</a> package that is inside the 
`useEffect` of the `Map` screen seems to be having performance inconsistencies (given the same data on the same call some times it will respond and some times it will not) that are related to the package which I solved by making continous calls to the method until
a response is returned as the time for a more robust solution to this problem was limited and it seems like there is not a definite solution for it.

# Improvements and Expansion
### Improvements
* Cache the results of the API call if the call parameters were the same in order to improve performance and reduce load times and spare the expenses of anothher API call.
* Would normally use `Redux` to save the results of the API call on the store and then get the data that needed to render the markers from there,
but since using `Redux` in such a small application would be an overkill and we only need the `id` and the `title` to `Start Charging`,
we pass title as well as a `param` on the page URL instead of just using the `id` inside the `ChargingSpot` screen to get the rest of the corresponding data from the store
for that specific charging spot.
* Add styling and further functionality.
### Expansion
* Provide the ability to the user to search for spots in an area of interest.
* Provide the ability to the user to book a time slot in a charging spot by which it would be guaranteed that he/she would find a charging spot in order to allow for more 
confidence and control over the planning of the trip. Obviously someone would not just be able to book a slot and never show up while that slot remains reserved so a time window
during which the user should be in place should be establised as well.
* Give the user a time estimate of when a spot will be available based on the time slots booked.
* Provide activities for the user to do while the EV is charging.
* Provide the ability for the user to make a list with activities that can be done while the EV is charging.

