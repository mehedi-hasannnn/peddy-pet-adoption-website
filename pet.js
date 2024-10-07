const loadCategories = () => {
    // Fetch the data
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories))
      .catch((error) => console.log(error));
  };

  const loadPets = () => {
    // Fetch the data
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json())
      .then((data) => displaypets(data.pets))
      .catch((error) => console.log(error));
  };

const displaypets = (pets) => {
    const petContainer = document.getElementById("pets");
    pets.forEach((pet) => {
        console.log(pet);
        const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `
     <figure ">
        <img
        src=${pet.image}
        class="h-full w-full object-cover"
        />
        </figure>
        <div class = "px-0 py-2">
        </div> `;
petContainer.append(card);
    });
};

 
  const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
 
    categories.forEach((item) => {
      // Create a button
      const button = document.createElement("button");
      button.classList.add("btn");
 
      // Create an image element for the icon
      const icon = document.createElement("img");
      icon.src = item.category_icon;  // Use the category_icon from the API
     
      icon.classList.add("category-icon");
 
      // Add the icon and category text to the button
      button.appendChild(icon);
      button.innerHTML += item.category;
 
   
      categoryContainer.appendChild(button);
    });
  };
 
  loadCategories();
  loadPets();
