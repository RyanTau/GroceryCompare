import json
from tkinter.messagebox import NO
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import requests, urllib, re, time
import numpy as np
from PIL import Image
from io import BytesIO



def coles_images(url,driver,test):
    out =driver.find_elements(By.XPATH,r"//div[@class='product-image-container']//img")
    out = [x.get_attribute('src') for x in out]
    y = 0
    for x in out:
        response = requests.get(x)
        bytes_img = BytesIO(response.content)
        # img = Image.open(bytes_img)
        # img.show()
        y += 1
    return out

def woolworth_images(url,driver):
    out = driver.find_elements(By.CLASS_NAME, 'shelfProductTile-image')
    out = [x.get_attribute('src') for x in out]
    return out

def coles(search,json_out,num_results=5):
    url = f'https://shop.coles.com.au/a/national/everything/search/{search}?pageNumber=1'
    path = r'C:\Users\Ryan1\Downloads\chromedriver_win32 (1)\chromedriver.exe'
    path = r"C:\Users\Ryan1\Downloads\chromedriver_win32 (2)\chromedriver.exe"
    driver = webdriver.Chrome(path)
    driver.get(url)
    out = driver.find_elements(By.CLASS_NAME, 'product-main-info')
    out = [x.text for x in out]

    out_img =driver.find_elements(By.XPATH,r"//div[@class='product-image-container']//img")
    out_img = [x.get_attribute('src') for x in out_img]

    # Name, Price, Quantity
    TPQI = []
    iterator = 0
    for i,x in zip(out,out_img):
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

        iterator += 1
        quantity = re.search(r'\n(.*)\n', i)
        quantity = quantity.group(1)

        response = requests.get(x)
        bytes_img = BytesIO(response.content)
        
        TPQI.append([title,price,quantity,bytes_img])
        #list_json.append({'title': title, 'price': price, 'quantity': quantity})
    TPQI.sort(key=lambda x: x[1])
    TPQI = TPQI[:num_results]
    json_out["coles"] = TPQI

    return json_out

def woolworth(search,json_out,num_results=5):
    url = f"https://www.woolworths.com.au/shop/search/products?searchTerm={search}"
    
    path = r'C:\Users\Ryan1\Downloads\chromedriver_win32 (1)\chromedriver.exe'
    path = r"C:\Users\Ryan1\Downloads\chromedriver_win32 (2)\chromedriver.exe"
    driver = webdriver.Chrome(path)
    driver.get(url)

    out = driver.find_elements(By.CLASS_NAME, 'shelfProductTile-information')
    out = [x.text for x in out]
    
    out_img =driver.find_elements(By.XPATH,r"//div[@class='shelfProductTile-imageWrapper']//img")
    out_img = [x.get_attribute('src') for x in out_img]
    
    # Name, Price, Quantity
    TPQI = []
    list_json = []
    iterator = 0
    for i,x in zip(out,out_img):
        print(iterator)
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
        response = requests.get(x)
        print(x)
        bytes_img = BytesIO(response.content)
        TPQI.append([title,price,quantity,bytes_img])
        iterator += 1

    TPQI.sort(key=lambda x: x[1])
    TPQI = TPQI[:num_results] 
    json_out["woolworth"] = TPQI 
    return json_out

json_out = {}
#json_out = (coles("chocolate",json_out))
#print(json_out)
print(woolworth("chocolate",json_out))
#coles("milk")
