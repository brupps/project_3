# Cyclonic Cartography: Mapping Significant Tornadoes

## Description/ overview
The topic we have chosen is tornado data across the US. We have opted to investigate multiple avenues including the number of tornadoes, their intensity, frequency, width, and paths. Living in Oklahoma, tornadoes are something nearly everyone can relate to in some way; learning more about them and presenting that information in an easily accessible/ understandable format would be highly educational.

Due to the large number of tornadoes that happen in the USA, we will concentrate on the data for EF3 to EF5. These are the storms that cause the most damage and loss of life and therefore are of the greatest concern. The data documents tornadoes from January 1, 2000, to December 31, 2023.

One thing we notice from the data is that the biggest concentration of more significant tornadoes seem to occur in the southern states as opposed to the center of the US that most consider ‘Tornado Alley.’

## Methodology
1. Finding the data
	- The national weather service had all the data we needed and we could export CSV files using our parameters. www.weather.gov.

2. Cleaning the data
	- Due to the 500 row limit, there were three separate CSV files. The three files were combined into one. The team determined which columns were necessary and which could be dropped. There were two rows that were missing latitude and longitude data and those rows were removed. 

3. Creating a database
	- The csv file was imported into mongoDB and Python was used to clean several columns.
	- Pandas was then utilized to create several data frames containing summary information to be used for creating charts in the next section.

4. Setting up the HTML + CSS and deploying the servers
	- Since each visualization is contained within its own page we went through and created our own individual html and css documents (making sure to add the appropriate plugins and formatting)

5. Creating the final index.html page
   	- Used a website template generator and then writing the HTML code.

***Since each team member created their visualizations independently we all took different approaches with our methodologies; our independent workflows within the code itself is outlined more clearly within the js files***

## Additional library, not used in class
- **Charts.js**; allows you to create a variety of charts (bar, line, etc.) within javascript (more information in the resources section)
- **Siter.io**; creates a website template to use 


## Files
### Static folder

Contains all the javascript files the team used to create their visualizations as well as the data (json and geojson files) and css documents required to create them
- <a href="https://github.com/brupps/project_3/blob/main/static/chartjava2.js">chartjava2.js</a>
	- Angie’s js file containing the code for the chartsJS visualizations which includes several different charts displaying different information
- <a href="https://github.com/brupps/project_3/blob/main/static/heat.js">heat.js </a>
	- Barb’s js file containing the code for the heat map/ tornado alley visualization
- <a href="https://github.com/brupps/project_3/blob/main/static/markerMap.js">markerMap.js </a>
	- Amanda’s js file containing the code for the marker map visualization, displaying individual tornadoes and additional data
- <a href="https://github.com/brupps/project_3/blob/main/static/polylineMap.js">polylineMap.js </a>
	- Cassidy’s js file containing the code for the polyline visualization, demonstrating tornado paths
- chart.cjs
	- Part of Charts JS; provided/downloaded from the Charts JS documentation.
- tornadoAlley.geojson
	- The geojson file used in the heat.js code to create the polygon shape representing tornado alley
- data.json + data.geojson
	- The main data source (converted from CSVs) used throughout all the visualizations 

### HTML files

The html files associated with the webpages for each of our visualizations

- **charts2.html**
![a screenshot of the chartsJS visualization](https://github.com/brupps/project_3/blob/main/images/charts2image.PNG)

- **heatindex.html**
![a screenshot of the heat map/ tornado alley visualization](https://github.com/brupps/project_3/blob/main/images/heatIndexImage.PNG)

- **markerMap.html**
![a screenshot of the marker map visualization](https://github.com/brupps/project_3/blob/main/images/markerMapImage.PNG)

- **polylineMap.html**
![a screenshot of the polyline map visualization](https://github.com/brupps/project_3/blob/main/images/polylineMapImage.PNG)

### Resources folder

Contains all the CSV (cleaned and uncleaned) files that were later converted into json and geojson files (located in the static folder)

- AllStates2000-2023EF3-5 is the fully cleaned file; we cleaned (deleted unnecessary columns and missing data) and combined the other three CSVs into this one in order to include all the necessary dates

### Other Files
- Cyclonic Cartography.pptx
	- The powerpoint presentation we as a team presented during class; includes the process we went through to complete the objectives provided

- NoSQL_setup.ipynb
	- The jupyter notebook file used to create the MongoDB database which houses the json and geojson files used throughout the project


## Ethical Considerations
There was no personal information involved with the data in this project. The data is part of the public domain and we are able to use freely as long as we do not: 
- Claim it as our own
- Use it in a way that implies we are affiliated with, or endorsed by, NOAA
- Modify content and then present as official government material.

Our project was only exploratory in nature and not intended to influence policy or decision making of any kind.


## Acknowledgements
- <a href="https://github.com/brupps">Barb Rupps</a>
- <a href="https://github.com/angiecfoust">Angie Foust </a>
- <a href="https://github.com/scottarterbury">Scott Arterbury</a>
- <a href="https://github.com/cassidysimmons">Cassidy Simmons </a>
- <a href="https://github.com/ASPigman">Amanda Pigman </a>


## Resources
- <a href="https://www.ncdc.noaa.gov/stormevents/listevents.jsp?eventType=%28C%29+Tornado&beginDate_mm=01&beginDate_dd=01&beginDate_yyyy=2000&endDate_mm=12&endDate_dd=31&endDate_yyyy=2010&hailfilter=0.00&tornfilter=3&windfilter=000&sort=DT&submitbutton=Search&statefips=-999%2CALL">The ‘storm events database’ from the National Centers for Environmental Information (our main source of data, which we converted to a json/ geojson format)</a>
- <a href="https://www.youtube.com/watch?v=mH6MfzUJRms">Creating a dropdown menu with ChartsJS</a>
- <a href="https://www.chartjs.org/docs/latest/samples/information.html">ChartsJS </a>
- <a href="https://geojson.io/#map=2/0/20">geoJSON editor </a>
- <a href="https://www.accuweather.com/en/severe-weather/is-tornado-alley-shifting-east/1162839">Accuweather for tornado alley shape </a>
- <a href="https://www.siter.io">Siter Website Template to write the HTML Landing Page</a>

