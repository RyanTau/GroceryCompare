import json
from lib2to3.pgen2 import driver
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import requests, urllib, re, time,os
import numpy as np
from PIL import Image
from io import BytesIO
from scipy.optimize import linprog


def coles(search,json_out,driver,num_results=1):
    url = f'https://shop.coles.com.au/a/national/everything/search/{search}?pageNumber=1'

    
    driver.get(url)
    out = driver.find_elements(By.CLASS_NAME, 'product-main-info')
    out = [x.text for x in out]

    #out_img =driver.find_elements(By.XPATH,r"//div[@class='product-image-container']//img")
    #out_img = [x.get_attribute('src') for x in out_img]

    # Name, Price, Quantity, Image
    TPQI = []
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

        iterator += 1
        quantity = re.search(r'\n(.*)\n', i)
        quantity = quantity.group(1)

        # response = requests.get(x)
        # bytes_img = BytesIO(response.content)
        # img = Image.open(bytes_img)
        # img.show()
        TPQI.append([title,price,quantity])
        #list_json.append({'title': title, 'price': price, 'quantity': quantity})
    TPQI.sort(key=lambda x: x[1])
    TPQI = TPQI[:num_results]
    #json_out["coles"] = TPQI

    return TPQI

def woolworth(search,json_out,num_results=5):
    url = f"https://www.woolworths.com.au/shop/search/products?searchTerm={search}"
    

    full_path = os.path.realpath(__file__)
    path, filename = os.path.split(full_path)
    path = path+"\chromedriver.exe"
    driver = webdriver.Chrome(path)
    driver.get(url)

    out = driver.find_elements(By.CLASS_NAME, 'shelfProductTile-information')
    out = [x.text for x in out]
    
    #out_img =driver.find_elements(By.XPATH,r"//div[@class='shelfProductTile-imageWrapper']//img")
    #out_img = [x.get_attribute('src') for x in out_img]
    
    # Name, Price, Quantity, Image
    TPQI = []
    list_json = []
    iterator = 0
    for i in out:
        title = re.search(r'(.*)\n', i)
        title= title.group(1)

        dollar = re.search(r'\$(.*)', i)
        dollar = dollar.group(1)

        cents = re.search(r'\.\n(.*)', i)
        cents = cents.group(1) 
        
        price = "$"+dollar + "." + cents

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
        # response = requests.get(x)
        # print(x)
        # bytes_img = BytesIO(response.content)
        TPQI.append([title,price,quantity])
        iterator += 1

    TPQI.sort(key=lambda x: x[1])
    TPQI = TPQI[:num_results] 
    json_out["woolworth"] = TPQI 
    return json_out

def minimize(products, budget, companies, prices):

    obj = []
    obj2 = []
    for x in json_out:
        obj.append(-1*x['price'])
        obj2.append(x['price'])
    
    lhs_ineq = []
    rhs_ineq = []
    for x in products:
        rhs_ineq.append(-1*x['min_amount'])

    lhs_ineq = [[-1,0],[0,-1],obj2]
    rhs_ineq = [-1*10,-1*2,budget]

    opt = linprog(c=obj, A_ub=lhs_ineq, b_ub=rhs_ineq, method="revised simplex")
    print(opt)

#minimize(1,1,1)

json_out = {}
#json_out = (coles("chocolate",json_out))
#print(json_out)


#print(coles("chocolate",json_out))

#coles("milk")

    # Input parameters
    # input['budget'] - '150'
    # input['companies'] - ['COLES', 'WOOLWORTHS']
    # input['products'] - [{name: 'carrot', min_amount: '10'}, {name: 'bananna', min_amount: '2'}]
    # return JSON package

def main_function(budget, companies, products):
    budget = int(budget)
    json_out = {}
    
    full_path = os.path.realpath(__file__)
    path, filename = os.path.split(full_path)
    path = path+"\chromedriver.exe"
    driver = webdriver.Chrome(path)
    for company in companies:
        if company == "COLES":
            for x in products:
                prod = x['name']
                TPQI = coles(prod,json_out,driver)[0]
                price = TPQI[1]
                 
                #json_out[company] = json_out.get(company, []).append(TPQI)

        elif company == "WOOLWORTHS":
            for x in products:
                prod = x['name']
                #json_out = woolworth(prod,json_out)
    
main_function(150,["COLES","WOOLWORTHS"],[{"name": 'carrot', "min_amount": '10'}, {"name": 'bananna', "min_amount": '2'}])
