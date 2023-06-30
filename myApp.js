require("dotenv").config();
// db connection
const mongoose = require("mongoose");
const connectionString = process.env.MONGO_URL; //  `mongodb+srv://fcc-mongo.lzatttz.mongodb.net/test?retryWrites=true&w=majority`

const connectDB = async () => {
    return mongoose.connect(
        connectionString,
        {
            //user: username,
            //pass: password,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (error, db) => {
            if (error) {
                console.log("Error connecting to database", error);
                process.exit(1);
            } else {
                console.log("Connected to database!");
            }
        }
    );
};
connectDB();

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const arrayOfPeople = [
    { name: "Tom", age: 45, favoriteFoods: ["pizza", "sushi", "salad"] },
    { name: "Jane", age: 22, favoriteFoods: ["chicken", "salad", "chips"] },
    {
        name: "Peter",
        age: 37,
        favoriteFoods: ["cereals", "chocolate", "broccoli"],
    },
];

const createAndSavePerson = (done) => {
    const person = new Person({
        name: "Jane Doe",
        age: 33,
        favoriteFoods: ["pizza", "sushi", "salad"],
    });
    person.save((error, data) => {
        error ? console.log(error) : done(null, data);
    });
};

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (error, data) => {
        error ? console.log(error) : done(null, data);
    });
};

const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (error, data) => {
        error ? console.log(error) : done(null, data);
    });
};

const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (error, data) => {
        error ? console.log(error) : done(null, data);
    });
};

const findPersonById = (personId, done) => {
    Person.findById({ _id: personId }, (error, data) => {
        error ? console.log(error) : done(null, data);
    });
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById({ _id: personId }, (error, data) => {
        if (error) {
            return done(error);
        } else {
            data.favoriteFoods.push(foodToAdd);
            data.save((error, data) => {
                error ? console.log(error) : done(null, data);
            });
        }
    });
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate(
        { name: personName },
        { age: ageToSet },
        { new: true },
        (error, data) => {
            error ? console.log(error) : done(null, data);
        }
    );
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove({ _id: personId }, (error, data) => {
        error ? console.log(error) : done(null, data);
    });
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({ name: nameToRemove }, (error, data) => {
        error ? console.log(error) : done(null, data);
    })
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
