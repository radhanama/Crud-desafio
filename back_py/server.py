from flask import Flask, Response, request
import pymongo
import json
from bson.objectid import ObjectId
app = Flask("__name__")

try:
    mongo = pymongo.MongoClient(
    host = "localhost", 
    port=27017,
    serverSelectionTimeoutMS = 1000
    )
    db = mongo.company
    mongo.server_info() ##triger exception if not connect with database
except:
    print("ERROR - cannot conect to db")

##################################################################
@app.route("/api/animais", methods=["GET"])
def get_some_animal():
    try:
        data = list(db.animal.find())
        for anima in data:
            anima["_id"] = str(anima["_id"])
        return Response(
            response=json.dumps(data),
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({"message": "cannot read animal"}),
            status=500,
            mimetype="application/json"
        )

##################################################################
@app.route("/api/animais", methods=["POST"])
def create_animal():
    try:
        animal = {"name": request.form["name"], "tipo": request.form["tipo"]}
        dbResponse = db.animal.insert_one(animal)
        return Response(
            response=json.dumps(
                {"message": "animal created",
                 "id":f"{dbResponse.inserted_id}"
                }),
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)


##################################################################
@app.route("/api/animais/<id>", methods=["DELETE"])
def delete_some_animal(id):
    try:
        dbResponse = db.animal.delete_one({"_id":ObjectId(id)})
#        for attr in dir(dbResponse):
#            print(f"******{attr}******")

        if dbResponse.deleted_count == 1:
            return Response(
                response=json.dumps( {"message": "animal deleted" }),
                status=200,
                mimetype="application/json"
            )
        else:
            return Response(
                response=json.dumps( {"message": "animal not found" }),
                status=200,
                mimetype="application/json"
            )
    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({"message": "cannot delete animal"}),
            status=500,
            mimetype="application/json"
        )


##################################################################
@app.route("/api/animais/<id>", methods=["PUT"])
def put_some_animal(id):
    try:
        animal = {"name": request.form["name"], "tipo": request.form["tipo"]}
        dbResponse = db.animal.update_one({"_id":ObjectId(id)},{"$set":animal})
#        for attr in dir(dbResponse):
#            print(f"******{attr}******")

        if dbResponse.modified_count == 1:
            return Response(
                response=json.dumps( {"message": "animal updated" }),
                status=200,
                mimetype="application/json"
            )
        else:
            return Response(
                response=json.dumps( {"message": "animal not found" }),
                status=200,
                mimetype="application/json"
            )
    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({"message": "cannot update animal"}),
            status=500,
            mimetype="application/json"
        )





##################################################################



if __name__ == "__main__":
    app.run(port=5000, debug=True)