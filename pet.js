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

  const loadDetails = async(petId) =>{
    console.log(petId);
    const url =`https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.petData);
  };

  const displayDetails =(petData)=>{
    console.log(petData);
    const detailContainer = document.getElementById("modal-content");

    detailContainer.innerHTML = `
    
    <img class="rounded-lg h-full w-full object-cover"
        src=${petData.image}
        />

    <div class="mb-3 p-3">
        <h3 class="font-bold text-2xl mb-2">${petData.pet_name}<h3/>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/health-data.png" alt="health-data"/> Breed: ${petData.breed} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar--v1"/> Birth: ${petData.date_of_birth} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="15" src="https://img.icons8.com/fluency-systems-regular/50/mercury.png" alt="mercury"/> Gender: ${petData.gender} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="15" src="https://img.icons8.com/fluency-systems-regular/50/mercury.png" alt="mercury"/> Vaccinated Status: ${petData.vaccinated_status} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/us-dollar--v1.png" alt="us-dollar--v1"/> Price: ${petData.price}$ </p>
        <br>
        <h3 class="font-bold text-xl">Details Information</h3>
        <p> ${petData.pet_details} </p>

        </div>
    
    `

    document.getElementById("showModalData").click();
  }

const displaypets = (pets) => {
    const petContainer = document.getElementById("pets");
    pets.forEach((pet) => {
        console.log(pet);
        const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `
     <div class="p-3 border rounded-lg">
     <figure class="">
        <img class="rounded-lg h-full w-full object-cover"
        src=${pet.image}
        />
     </figure>
        <div class="mb-3 p-3">
        <h3 class="font-bold text-2xl mb-2">${pet.pet_name}<h3/>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/health-data.png" alt="health-data"/> Breed: ${pet.breed} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar--v1"/> Birth: ${pet.date_of_birth} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="15" src="https://img.icons8.com/fluency-systems-regular/50/mercury.png" alt="mercury"/> Gender: ${pet.gender} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/us-dollar--v1.png" alt="us-dollar--v1"/> Price: ${pet.price}$ </p>
        </div>
        <hr>
        <div class="flex justify-around mt-2">
        <button class="border rounded-lg  p-2"><img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/50/facebook-like--v1.png" alt="facebook-like--v1"/></button>
        <button class="text-clr font-bold border rounded-lg p-2">Adopt</button>
        <button onclick="loadDetails('${pet.petId}')" class="text-clr font-bold border rounded-lg p-2">Details</button>
        </div>
     </div>
        `;
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
  
