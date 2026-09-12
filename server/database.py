import mysql.connector
from mysql.connector import Error

def get_db_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Manju@mysql1968',
            database='realestatedb'
        )
        print("Connection successful")
    except Error as e:
        print(f"Error: {e}")
    
    return connection