from flask import Flask,render_template,request,jsonify
from fastai.vision import *
app = Flask(__name__)
model = load_learner('','export.pkl')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=["POST"])
def upload():
    # try:
        # Getting img from POST
        file = request.files['img'].read()
        # Resizing img to 224 X 224 , This is the size on which model was trained
        img = open_image(io.BytesIO(file))
        # Prediction using model
        prediction = model.predict(img)[0]

        # Getting Prediction ready to sent it to frontend
        response = {"result": str(prediction)}
        return jsonify(response)

    # except:
    #     return jsonify({'result': "Sorry, Something Went Wrong !"})

if __name__=='__main__':
    app.run(debug=True)
