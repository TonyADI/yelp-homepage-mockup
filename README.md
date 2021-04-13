# Yelp Homepage Mockup
I decided to recreate the yelp homepage in React and add some bit of functionality by utilizing their API. I used yelps API as well as locationIQ's API to grant users the ability to search up various terms and find businesses in their location based on those terms.

## How it works
When a user first uses the app they are asked for access to their location. If granted the longitude and latitude is then fed to locationIQ's api which consumes it and returns the city name for the coordinates given. 

This is then displayed in the input field of location. Yelps autocomplete API is used to make the users search experience more convenient by returning up to three terms based on what the user inputs. 

Finally when the form is submitted yelp's businesses search API is called with the specified term and location provided by the user. Also, three featured businesses are fetched when the component initially renders and the location is granted.

