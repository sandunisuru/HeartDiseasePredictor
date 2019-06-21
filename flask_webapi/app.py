from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask_jsonpify import jsonify
import keras
from keras.models import load_model
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import os
from sklearn.preprocessing import StandardScaler
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
import keras
from keras.models import Sequential
from keras.layers import Dense
import warnings
from sklearn.metrics import accuracy_score
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

df = pd.read_csv("heart.csv")

y = df.target.values

X = df.drop(['target'], axis = 1)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

classifier = Sequential()

# Adding the input layer and the first hidden layer
classifier.add(Dense(output_dim = 11, init = 'uniform', activation = 'relu', input_dim = 13))

# Adding the second hidden layer
classifier.add(Dense(output_dim = 11, init = 'uniform', activation = 'relu'))

# Adding the output layer
classifier.add(Dense(output_dim = 1, init = 'uniform', activation = 'sigmoid'))

# Compiling the ANN
classifier.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])

classifier.fit(X_train, y_train, batch_size = 10, epochs = 100)

y_pred = classifier.predict(X_test)

ac=accuracy_score(y_test, y_pred.round())
print('accuracy of the model: ',ac*100 )



class Prediction(Resource):
    def post(self):
        matrix = [[0 for x in range(13)] for y in range(1)]
        matrix[0][0] = request.json['age']
        matrix[0][1] = request.json['sex']
        matrix[0][2] = request.json['cp']
        matrix[0][3] = request.json['trestbps']
        matrix[0][4] = request.json['chol']
        matrix[0][5] = request.json['fbs']
        matrix[0][6] = request.json['restecg']
        matrix[0][7] = request.json['thalach']
        matrix[0][8] = request.json['exang']
        matrix[0][9] = request.json['oldpeak']
        matrix[0][10] = request.json['slope']
        matrix[0][11] = request.json['ca']
        matrix[0][12] = request.json['thal']

        matrix = sc.transform(matrix)
        pred = classifier.predict(matrix)
        print(pred)

        return {'prediction': pred[0][0]*100} 

api.add_resource(Prediction, "/predict")

if __name__ == '__main__':
     app.run(port='5002')



#Remove mkl- files and pywin32 after pip freeze