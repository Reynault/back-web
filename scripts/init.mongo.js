/**
 * Script d'initialisation de la base de données
 */
{
    // Création des collections
    db.createCollection( "web_users", {
        validator: {
            $jsonSchema: {
                bsonType: "Object",
                required: ["login", "salt", "pass", "recipies"],
                properties : {
                    login: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    pass: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    salt: {
                        bsonType: "",
                        description: "must be a string and is required"
                    }
                }
            }
        }
      }
    );
    db.createCollection( "recipies",{
        validator: {
            $jsonSchema: {
                bsonType: "Object",
                required: ["name", "description", "ingredients", "steps", "linked"],
                properties : {
                    name: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    description: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    ingredients: {
                        bsonType: "array",
                        description: "must be an array and is required"
                    },
                    steps: {
                        bsonType: "array",
                        description: "must be an array and is required"
                    },
                    linked: {
                        bsonType: "array",
                        description: "must be an array and is required"
                    }
                }
            }
        }
    });
    db.createCollection( "units",{
        validator: {
            $jsonSchema: {
                bsonType: "Object",
                required: ["unit"],
                properties : {
                    unit: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    }
                }
            }
        }
    });

    // Création des ID
    let oid1 = ObjectId();
    let oid2 = ObjectId();
    let oid3 = ObjectId();
    let oid4 = ObjectId();
    let oid5 = ObjectId();
    let oid6 = ObjectId();
    let oid7 = ObjectId();

    // Insertion des unités de mesure
    db.getCollection("units").insertMany([
        { "_id": oid1, "unit" : "entier(s)" },
        { "_id": oid2, "unit" : "cuillière(s) à soupe" },
        { "_id": oid3, "unit" : "g"},
        { "_id": oid4, "unit" : "kg"},
        { "_id": oid5, "unit" : "l"},
        { "_id": oid6, "unit" : "ml"},
        { "_id": oid7, "unit" : "cl"},
    ]);

    // Insertion des recettes
    db.getCollection("recipies").insertMany([
        {
            "name" : "Crepes",
            "description": "La crêpe est un mets composé d'une couche plus ou moins fine de pâte, faite à base de farine (principalement de blé ou de sarrasin) et d'œufs agglomérés à un liquide (lait, parfois mélangé à de l'eau ou de la bière). Elle est généralement de forme ronde.",
            "ingredients": [
                {
                    "name": "Oeufs",
                    "quantity": "3",
                    "unit": oid1,
                },
                {
                    "name": "Farine",
                    "quantity": "300",
                    "unit": oid3,
                },
                {
                    "name": "Sucre",
                    "quantity": "300",
                    "unit": oid2,
                },
                {
                    "name": "Huile",
                    "quantity": "3",
                    "unit": oid2,
                },
                {
                    "name": "Beurre fondu",
                    "quantity": "2",
                    "unit": oid3,
                },
                {
                    "name": "Lait",
                    "quantity": "60",
                    "unit": oid7,
                }
            ],
            "steps": [
                "Mettre la farine dans une terrine et former un puits.",
                "Y déposer les oeufs entiers, le sucre, l'huile et le beurre.",
                "Mélanger délicatement avec un fouet en ajoutant au fur et à mesure le lait. La pâte ainsi obtenue doit avoir une consistance d'un liquide légèrement épais.",
                "Parfumer de rhum.",
                "Faire chauffer une poêle antiadhésive et la huiler très légèrement. Y verser une louche de pâte, la répartir dans la poêle puis attendre qu'elle soit cuite d'un côté avant de la retourner. Cuire ainsi toutes les crêpes à feu doux.",
            ],
            "linked": []
        },
    ]);
}
