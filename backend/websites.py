
#from lib2to3.pgen2 import driver
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import  re, time,os
#requests, urllib,
import numpy as np
# from PIL import Image
# from io import BytesIO
from scipy.optimize import linprog


def coles(search,json_out,driver,num_results=1):
    url = f'https://shop.coles.com.au/a/national/everything/search/{search}?pageNumber=1'

    
    driver.get(url)
    time.sleep(1)
    out = driver.find_elements(By.CLASS_NAME, 'product-main-info')
    out = [x .text for x in out]

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
        #print(i)
        price = re.search(r'(\$[0-9]*\.[0-9]*)', i)
        price = price.group(1)
        

        iterator += 1
        try:
            quantity = re.search(r'\n(.*)\n', i)
            quantity = quantity.group(1)
        except:
            continue
        # response = requests.get(x)
        # bytes_img = BytesIO(response.content)
        # img = Image.open(bytes_img)
        # img.show()
        #print(price, "PRICER")
        #print("\n")
        TPQI.append([title,price,quantity])
        #list_json.append({'title': title, 'price': price, 'quantity': quantity})
    TPQI.sort(key=lambda x: float(x[1][1:]))
    TPQI = TPQI[:num_results]
    #json_out["coles"] = TPQI
    #print(TPQI, "COLES")
    return TPQI

def woolworth(search,json_out,driver,num_results=1):
    url = f"https://www.woolworths.com.au/shop/search/products?searchTerm={search}"
    
    driver.get(url)
    #change sleep time
    time.sleep(2)
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
        if (title == None):
            continue
        title= title.group(1).strip(" Each")
        #print(i)
        try:
            dollar = re.search(r'\$(.*)\n\.', i)
            dollar = dollar.group(1)
        except:
            continue
        cents = re.search(r'\.\n(.*)', i)
        cents = cents.group(1) 
        
        price = "$"+dollar + "." + cents

        dpg = re.search(r'\n(.*)$', i)

        # try:
        #     dpg = re.search(r'\n\$.* / .*', i)
        #     dpg = dpg.group(0)
        # except:
        #     dpg = "EACH"

        try:
            dpq = re.search(r'\$(.*) / ([0-9]*)([A-Za-z]*)$', i)
            ppq = float(dpq.group(1))
            qty = float(dpq.group(2))
            units = dpq.group(3)         

            quantity = str(float(price[1:])/ppq * qty) + units
            quantity = dpq.group(0)
        except:
            quantity = "N/A"
            dpq = "N/A"
            qty = "N/A"
            units = "N/A"
        # response = requests.get(x)
        # print(x)
        # bytes_img = BytesIO(response.content)
        #print(i)
        TPQI.append([title,price,quantity])
        iterator += 1

    TPQI.sort(key=lambda x: float(x[1][1:]))
    #print(TPQI)
    TPQI = TPQI[:num_results] 
    #print(TPQI,"WOOLWORTHS")
    return TPQI

def minimize(products, budget, companies, prices):

    obj = [-1*x for x in prices]
    
    lhs_ineq = []
    for x in range(len(products)):
        check = []
        for i in range(len(products)):
            if i == x:
                check.append(-1)
            else:
                check.append(0)
        lhs_ineq.append(check)
    lhs_ineq.append(prices)

    print(lhs_ineq,"LHS")
    rhs_ineq = []
    for x in products:
        rhs_ineq.append(-1*int(x['min_amount']))
    rhs_ineq.append(int(budget))

    print(rhs_ineq,"RHS")


    #lhs_ineq = [[-1,0],[0,-1],obj2]
    #rhs_ineq = [-1*10,-1*2,budget]

    opt = linprog(c=obj, A_ub=lhs_ineq, b_ub=rhs_ineq, method="revised simplex")
    print(opt)
    return opt



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
    #options = Options()
    #options.headless = True
    driver = webdriver.Chrome(path)

    abo = False
    if abo == True:
        for company in companies:
            if company == "COLES":
                prices = []
                for x in products:
                    prod = x['name']
                    TPQI = coles(prod,json_out,driver)[0]
                    price = float(TPQI[1][1:])
                    prices.append(price)
                minimize(products,budget,companies,prices)
                    #json_out[company] = json_out.get(company, []).append(TPQI)

            elif company == "WOOLWORTHS": 
                for x in products:
                    prod = x['name']
                #json_out = woolworth(prod,json_out)
    if abo == False:
        for company in companies:
            if company == "COLES":
                json_out["COLES"] = {}
                for x in products:
                    prod = x['name']
                    TPQI = coles(prod,json_out,driver)
                    if TPQI == []:
                        continue
                    #print(TPQI)
                    #price = TPQI[0][1]
                    json_out["COLES"][prod] = TPQI[0]
            elif company == "WOOLWORTHS":
                json_out["WOOLWORTHS"] = {}
                for x in products:
                    prod = x['name']
                    TPQI = woolworth(prod,json_out,driver)
                    print(TPQI, "THIS THIS")
                    if TPQI == []:
                        continue
                    #price = TPQI[0][1]
                    #print(TPQI)
                    json_out["WOOLWORTHS"][prod] = TPQI[0]

        final_out = {}
        #{'Woolworths': [ ['Woolworths Chickpeas No Added Salt 420g', '$0.80', '$0.19 / 100G']], 'Coles': [['Coles Pink And White Marshmallows', '$1.95', '150g everyday product']], "USED": 100, "UNUSED": 200}
        #print(json_out)
        used = 0
        
        next = 0
        if len(companies) == 2:
            COLES = json_out["COLES"]
            WOOLWORTHS = json_out["WOOLWORTHS"]
            for k,v in COLES.items():
                if k in WOOLWORTHS:
                    cur_wool = float(WOOLWORTHS[k][1][1:])
                    cur_cole = float(COLES[k][1][1:])
                    amount = int(products[next]['min_amount'])
                    print(k, amount)

                    if cur_wool <= cur_cole:
                        final_out["Woolworths"] = final_out.get("Woolworths",{})
                        final_out["Woolworths"][k] = WOOLWORTHS[k]  
                        final_out["Woolworths"][k].append(amount)
                        print(WOOLWORTHS[k], ' GUKYGJH')
                        #.append(amount)
                        used += cur_wool*amount
                    else:
                        final_out["Coles"] = final_out.get("Coles",{})
                        final_out["Coles"][k] = COLES[k]
                        final_out["Coles"][k].append(amount)
                        print(COLES[k], ' GUKYGJH')
                        used += cur_cole*amount
                    #print(cur_wool)
                    #print(cur_cole)
                next = next +1
        else:
            for k,v in json_out.items():
                for k2,v2 in v.items():    
                    used += float(v2[1][1:])*float(products[next]['min_amount'])
                    v2.append(int(products[next]['min_amount']))
                    #final_out[k][k2] = v2
            final_out = json_out
    final_out["USED"] = round(used,2)
    if budget - used < 0:
        unused = -1q
    else:
        unused = budget - used
    final_out["UNUSED"] = round(unused,2)
    print(final_out)

    return final_out

if __name__ == '__main__':
    #main_function("1000",["COLES", "WOOLWORTHS"],[{"name": 'Apple', "min_amount": '5'}, {"name": 'Orange', "min_amount": '10'}])

    main_function(150,["COLES","WOOLWORTHS"],[{"name": 'carrot', "min_amount": '10'}, {"name": 'banana', "min_amount": '2'},{"name": 'fruit cake', "min_amount": '2'},{"name": 'marshmallow', "min_amount": '2'},{"name": 'peas', "min_amount": '2'}])

    '''
    main_function(100,["COLES","WOOLWORTHS"],[{"name": 'Apple', "min_amount": '10'}, {"name": 'Orange', "min_amount": '2'}])
'''