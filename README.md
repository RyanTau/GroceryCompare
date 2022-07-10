# GroceryCompare
A web app to find the cheapest groceries for your needs.

The user inputs their budget, the stores they want to select from (Woolworths and Coles), the items they want, and the minimum amounts of each item they want. From there the web app outputs the best deals for the selected items at which store, and gives the name of the item, its price, quantity and how much of their budget they used along with how much they have remaining

### Installation

git clone https://github.com/RyanTau/GroceryCompare.git
pip install -r requirements.txt

Make sure your Chrome version is 103
    1) open Chrome  
    2) Click three dots on top right  
    3) Help -> About Google Chrome  

If your version is not 103,
    1) Go to https://www.selenium.dev/downloads/  
    2) Download the version that matches your Chrome browser  
    3) replace the current selenium webdriver file with the one you downloaded  

For the Frontend, It is a React App. You must have NPM installed on your computer. To start the frontend you:  
    1) Goto the frontend folder  
    2) Type 'npm install' to install all required dependencies.   
    3) Type 'npm start' to start the frontend.   

To start the whole app:     
    1) Start the server.py file in the backend folder.
    2) Move to the frontend folder and type in 'npm start'.
