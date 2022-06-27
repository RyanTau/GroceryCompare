import json
from tkinter.messagebox import NO
from bs4 import BeautifulSoup
from numpy import append
from selenium import webdriver
from selenium.webdriver.common.by import By
import requests
import re


def coles(search,json_out,num_results=5):
    url = f'https://shop.coles.com.au/a/national/everything/search/{search}?pageNumber=1'
    path = r'C:\Users\Ryan1\Downloads\chromedriver_win32 (1)\chromedriver.exe'
    path = r"C:\Users\Ryan1\Downloads\chromedriver_win32 (2)\chromedriver.exe"
    driver = webdriver.Chrome(path)
    driver.get(url)
    # Name, Price, Quantity
    list_json = []
    out = driver.find_elements(By.CLASS_NAME, 'product-main-info')
    out = [x.text for x in out]
    iterator = 0
    for i in out:
        # print(i)
        # print("\n")
        title = re.search(r'(.*)\n', i)
        title= title.group(1)

        price = re.search(r'sponsored product\n(.*)\n', i)
        if price is None:
            price = re.search(r'.*\n.*\n(.*)', i)
            price = price.group(1)
        else:
            price = price.group(1)
        if iterator == num_results:
            break
        iterator += 1
        quantity = re.search(r'\n(.*)\n', i)
        quantity = quantity.group(1)
        list_json.append({'title': title, 'price': price, 'quantity': quantity})

    json_out["coles"] = list_json
    return json_out

def woolworth(search,json_out,num_results=5):
    url = f"https://www.woolworths.com.au/shop/search/products?searchTerm={search}"
    
    path = r'C:\Users\Ryan1\Downloads\chromedriver_win32 (1)\chromedriver.exe'
    path = r"C:\Users\Ryan1\Downloads\chromedriver_win32 (2)\chromedriver.exe"
    driver = webdriver.Chrome(path)
    driver.get(url)

    # Name, Price, Quantity
    out = driver.find_elements(By.CLASS_NAME, 'shelfProductTile-information')
    out = [x.text for x in out]
    list_json = []
    iterator = 0
    for i in out:
        
        title = re.search(r'(.*)\n', i)
        title= title.group(1)

        dollar = re.search(r'\$(.*)', i)
        dollar = dollar.group(1)

        cents = re.search(r'\.\n(.*)\n', i)
        cents = cents.group(1) 
        
        price = dollar + "." + cents

        dpg = re.search(r'\n(.*)$', i)
        dpg = dpg.group(0)


        try:
            dpq = re.search(r'\$(.*) / ([0-9]*)([A-Za-z]*)$', dpg)
            ppq = float(dpq.group(1))
            qty = float(dpq.group(2))
            units = dpq.group(3)         

            quantity = str(int(float(price[1:])/ppq * qty)) + units
        except:
            quantity = "N/A"
            dpq = "N/A"
            qty = "N/A"
            units = "N/A"
        if iterator == num_results:
            break
        iterator += 1
        list_json.append({'title': title, 'price': price, 'quantity': quantity})
        json_out["woolworth"] = list_json 
    return json_out

json_out = {}
json_out = (coles("chocolate",json_out))
print(woolworth("chocolate",json_out))
#coles("milk")
