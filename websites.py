import json
from tkinter.messagebox import NO
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import requests
import re

def coles(search):
    url = f'https://shop.coles.com.au/a/national/everything/search/{search}?pageNumber=1'
    path = r'C:\Users\Ryan1\Downloads\chromedriver_win32 (1)\chromedriver.exe'
    driver = webdriver.Chrome(path)
    driver.get(url)
    # Name, Price, Quantity
    json_out = {}
    out = driver.find_elements(By.CLASS_NAME, 'product-main-info')
    out = [x.text for x in out]
    for i in out:
        title = re.search(r'(.*)\n', i)
        title= title.group(0)

        price = re.search(r'sponsored product\n(.*)\n', i)
        if price is None:
            price = re.search(r'.*\n.*\n(.*)', i)
            price = price.group(0)
       
        quantity = re.search(r'\n(.*)\n', i)
        quantity = quantity.group(0)
        json_out["coles"]= {'title': title, 'price': price, 'quantity': quantity}
        print(price)
        print("\n")


coles("milk")
