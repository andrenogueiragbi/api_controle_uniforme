import requests
baseURL = 'http://localhost:3000/'

# ANSI Escape Codes para cores
cor_vermelho = "\033[1;31m"  # Vermelho
cor_verde = "\033[1;32m"     # Verde


def pais():

    payload = {"name": "brasil"}
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", baseURL+'v1/country', json=payload, headers=headers).json()

    print(f"{cor_verde}[  OK  ] - país") if response['ok'] else print(f"{cor_vermelho}[ FAIL ] - país")


def estado():
    payload = {
    "name": "bahia",
    "abbreviation": "ba",
    "id_country": 1
}
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", baseURL+'v1/state', json=payload, headers=headers).json()

    print(f"{cor_verde}[  OK  ] - estado") if response['ok'] else print(f"{cor_vermelho}[ FAIL ] - estado")


def estado():
    payload = {
    "name": "bahia",
    "abbreviation": "ba",
    "id_country": 1
}
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", baseURL+'v1/state', json=payload, headers=headers).json()

    print(f"{cor_verde}[  OK  ] - estado") if response['ok'] else print(f"{cor_vermelho}[ FAIL ] - estado")

def cidade():
    payload = {
	"name":"Guanambi",
	"id_state": 1
	
}
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", baseURL+'v1/city', json=payload, headers=headers).json()

    print(f"{cor_verde}[  OK  ] - cidade") if response['ok'] else print(f"{cor_vermelho}[ FAIL ] - cidade")

def empresa():
    payload = {
	"name":"Chicão bar",
	"cnpj": "0000000000000",
	"address": "rua omeu Pinto",
	"id_city":1
	
	
}
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", baseURL+'v1/company', json=payload, headers=headers).json()

    print(f"{cor_verde}[  OK  ] - empresa") if response['ok'] else print(f"{cor_vermelho}[ FAIL ] - empresa")

def funcionario():
    payload = {
	"name":"Andre Pereira Nogueira",
	"birth_date": "1970-09-20",
	"email":"teste@gmail.com",
	"telephone_1":"7799779977",
	"telephone_2":"9977997799",
	"address":"teste@gmail.com",
	"sex":"M",
	"active":"Y",
	"id_city":1,
	"id_company":1	
	
	
}
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", baseURL+'v1/employee', json=payload, headers=headers).json()

    print(f"{cor_verde}[  OK  ] - funcionario") if response['ok'] else print(f"{cor_vermelho}[ FAIL ] - funcionario")



pais()
estado()
cidade()
empresa()
funcionario()

