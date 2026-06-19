const coffeeContainer = document.getElementById("coffeeContainer");

async function loadCoffees() {
  const response = await fetch("/coffees");
  const coffees = await response.json();

  coffeeContainer.innerHTML = "";

  coffees.forEach(coffee => {
    const card = document.createElement("div");
    card.className = "coffee-card";

    card.innerHTML = `
      <img src="${coffee.image}" alt="${coffee.name}">
      <div class="coffee-info">
        <h2>${coffee.name}</h2>
        <div class="vote-count">Votes: ${coffee.votes}</div>
        <button class="vote-btn" onclick="voteCoffee(${coffee.id})">
          Vote ☕
        </button>
      </div>
    `;

    coffeeContainer.appendChild(card);
  });
}

async function voteCoffee(id) {
  await fetch(`/vote/${id}`, {
    method: "POST"
  });

  loadCoffees();
}

loadCoffees();
