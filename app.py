from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB Atlas configuration
mongodb_uri = "mongodb+srv://jeevansrinivas77:N%40dh2306@cluster0.yode8tw.mongodb.net/TaskManager"


database_name = "TaskManager"
collection_name = "tasksData"

client = MongoClient(mongodb_uri)
db = client[database_name]
tasks_collection = db[collection_name]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = {'task': data['task']}
    result = tasks_collection.insert_one(new_task)
    return jsonify({'message': 'Task added successfully', 'task_id': str(result.inserted_id)})

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = list(tasks_collection.find({}, {'_id': 0}))
    return jsonify({'tasks': tasks})

if __name__ == '__main__':
    app.run(debug=True)
