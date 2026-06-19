const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const dbPath = path.join(__dirname, "coffeeData.json");

if (!fs.existsSync(dbPath)) {
  const defaultData = [
    {
      id: 1,
      name: "Cappuccino",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
      votes: 0
    },
    {
      id: 2,
      name: "Latte",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      votes: 0
    },
    {
      id: 3,
      name: "Espresso",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      votes: 0
    }
  ];

  fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
}

function getCoffeeData() {
  return JSON.parse(fs.readFileSync(dbPath));
}

function saveCoffeeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

app.get("/coffees", (req, res) => {
  res.json(getCoffeeData());
});

app.post("/vote/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const coffees = getCoffeeData();

  const coffee = coffees.find(c => c.id === id);

  if (!coffee) {
    return res.status(404).json({ message: "Coffee not found" });
  }

  coffee.votes += 1;

  saveCoffeeData(coffees);

  res.json({
    success: true,
    votes: coffee.votes
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
