const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = {
    cars: [
        {
            id: 1,
            car: "Honda Civic",
            lv: "lv1",
            price: 20
        },
        {
            id: 10,
            car: "Toyota Prius",
            lv: "lv2",
            price: 25
        },
        {
            id: 20,
            car: "Jetta",
            lv: "lv3",
            price: 30
        }
    ]
}

app.get("/list", (req, res) => {
    res.json(DB.cars);
});

app.get("/list/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    }
    else {
        var id = parseInt(req.params.id);

        var car = DB.cars.find(car => car.id == id);
        if (car != undefined) {
            res.json(car);
        }
        else {
            res.sendStatus(404);
        };
    };
});

app.post("/new", (req, res) => {
    var { id, car, lv, price } = req.body;

    DB.cars.push({
        id: id,
        car: car,
        lv: lv,
        price: price
    });

    res.sendStatus(200);
});

app.delete("/list/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    }
    else {
        var id = parseInt(req.params.id);
        var index = DB.cars.find(car => car.id == id);

        DB.cars.splice(index, 1);
        res.sendStatus(200);
    };
});

app.listen(8080, () => {
    console.log("Server On");
})