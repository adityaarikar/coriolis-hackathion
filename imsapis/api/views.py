from django.shortcuts import render
from rest_framework import viewsets
from api.models import User, Category, Inventories
from api.serializers import UserSerializer, CategorySerializer, InventoriesSerializer
import qrcode
from django.http import HttpResponse, JsonResponse
from imsapis.settings import BASE_DIR
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
import sqlite3
import openai

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class InventoriesViewSet(viewsets.ModelViewSet):
    queryset = Inventories.objects.all()
    serializer_class = InventoriesSerializer

# ******************************************** QR Generater **********************************************
# Data to encode
@api_view(['GET'])
def generateQR(request):
    invent_id = request.query_params.get('invent_id')
    print("invent_id", invent_id)
    
    if not invent_id:
        return Response({'error': 'No invent_id provided'}, status=400)

    data = f"http://localhost:3000/inventories/{invent_id}"
    
    img_path = f"{BASE_DIR}/QRs/{invent_id}.png"
    
    if not os.path.exists(img_path):
        # Creating an instance of QRCode class
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        
        # Adding data to the instance 'qr'
        qr.add_data(data)
        qr.make(fit=True)
        
        # Creating the QR code image
        img = qr.make_image(fill_color='red', back_color='white')
        
        # Saving the QR code image to a file
        img.save(img_path)

    # Read the image file to prepare it for download
    with open(img_path, 'rb') as image_file:
        response = HttpResponse(image_file.read(), content_type='image/png')
    
    # Set the appropriate content-disposition header to prompt download
    response['Content-Disposition'] = f'attachment; filename="{invent_id}.png"'
    
    # Optionally, you can set custom headers as well
    response['Custom-Header'] = 'Custom Value'
    
    return response

# ******************************************* Chat Bot **************************************************
openai.api_key = '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'

# Function to get table columns from SQLite database
def get_table_columns(table_name):
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute("PRAGMA table_info({})".format(table_name))
    columns = cursor.fetchall()
    cursor.close()
    conn.close()
    return [column[1] for column in columns]

# Function to generate SQL query from input text using ChatGPT
def generate_sql_query(table_name, table_name_2, table_name_3, text, columns, columns_2, columns_3):
    prompt = """You are a ChatGPT language model that can generate SQL queries. Please provide a natural language input text, and I will generate the corresponding SQL query for you.The table name are {}, {} and {} corresponding columns are {}, {} and {}.\nInput: {}\nSQL Query:""".format(
        table_name, table_name_2, table_name_3, columns, columns_2, columns_3, text)
    print(prompt)
    request = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0301",
        messages=[
            {"role": "user", "content": prompt},
        ]
    )
    sql_query = request['choices'][0]['message']['content']
    print(sql_query)
    return sql_query


# Function to execute SQL query on SQLite database
def execute_sql_query(query):
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result

@api_view(['GET'])
# Django view function
def askChatGpt(request):
    question = request.GET.get('question', '')
    if not question:
        return JsonResponse({"error": "No question provided."}, status=400)

    table_name = 'api_inventories'
    table_name_2 = "api_user"
    table_name_3 = 'api_category'
    columns = get_table_columns(table_name)
    columns_2 = get_table_columns(table_name_2)
    columns_3 = get_table_columns(table_name_3)
    sql_query = generate_sql_query(table_name, table_name_2, table_name_3, question, columns, columns_2, columns_3)
    
    if sql_query:
        result = execute_sql_query(sql_query)
        print(result)
        return JsonResponse({"question": question, "sql_query": sql_query, "result": result})
    else:
        return JsonResponse({"error": "Failed to generate SQL query."}, status=500)