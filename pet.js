const loadCategories = () => {
  // Fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadDetails = async (petId) => {
  console.log(petId);
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.petData);
};

const showCongrats = (button) => {
  const congratsContainer = document.getElementById("congratsContent");
  congratsContainer.innerHTML = `
    <img class="mx-auto" width="60" height="60" src="https://img.icons8.com/color-glass/48/handshake--v1.png" alt="handshake--v1"/>

    <h2 class="text-4xl text-center font-bold">Congrats</h2>
    <br>
    <p class="text-center font-bold text-xl">Adoption process started for your pet</p>
    <p id="countdown" class="text-7xl font-bold text-center">3</p>
  `;
  const myModal = document.getElementById("mymodal");
  document.getElementById("showCongratsData").click();

  let countdownValue = 3;
  const countdownElement = document.getElementById("countdown");

  const countdownInterval = setInterval(() => {
    countdownValue -= 1;
    countdownElement.textContent = countdownValue;

    if (countdownValue === 0) {
      clearInterval(countdownInterval);
      myModal.close();
      button.disabled = true;
      button.classList.add("bg-gray");
      button.textContent = "Adopted";
    }
  }, 1000);
};

const showPic = (pet) => {
  const likedImageContainer = document.getElementById("likedPet");
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="p-5">
      <img src=${pet} />
    </div>
  `;
  likedImageContainer.appendChild(div);
};

const getDisplayValue = (value) => {
  return value === null || value === undefined ? "Not available" : value;
};


const displayDetails = (petData) => {
  console.log(petData);
  const detailContainer = document.getElementById("modal-content");

  detailContainer.innerHTML = `
    <img class="rounded-lg h-full w-full object-cover" src=${getDisplayValue(petData.image)} />
    <div class="mb-3 p-3">
        <h3 class="font-bold text-2xl mb-2">${getDisplayValue(petData.pet_name)}</h3>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/health-data.png" alt="health-data"/> Breed: ${getDisplayValue(petData.breed)} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar--v1"/> Birth: ${getDisplayValue(petData.date_of_birth)} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="15" src="https://img.icons8.com/fluency-systems-regular/50/mercury.png" alt="mercury"/> Gender: ${getDisplayValue(petData.gender)} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="15" src="https://img.icons8.com/fluency-systems-regular/50/mercury.png" alt="mercury"/> Vaccinated Status: ${getDisplayValue(petData.vaccinated_status)} </p>
        <p class="text-gray-500 flex gap-1"> <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/us-dollar--v1.png" alt="us-dollar--v1"/> Price: ${getDisplayValue(petData.price)}$ </p>
        <br>
        <h3 class="font-bold text-xl">Details Information</h3>
        <p> ${getDisplayValue(petData.pet_details)} </p>
    </div>
  `;

  document.getElementById("showModalData").click();
};


const displaypets = (pets) => {
  const petContainer = document.getElementById("pets");
  petContainer.innerHTML = ""; // Clearing previous pet cards

  if (pets.length === 0) {
    petContainer.innerHTML = `
      <div class="mx-auto w-[800px] text-center">
        <img class="mx-auto" src="images/error.webp" />
        <br />
        <h2 class="font-extrabold text-5xl">No Information Available</h2>
        <br />
        <p>Oops!! Sorry, there are no pets available right now. Please check again later.</p>
      </div>
    `;
    return;
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="p-3 border rounded-lg">
        <figure>
          <img class="rounded-lg h-full w-full object-cover" src=${getDisplayValue(pet.image)} />
        </figure>
        <div class="mb-3 p-3">
          <h3 class="font-bold text-2xl mb-2">${getDisplayValue(pet.pet_name)}</h3>
          <p class="text-gray-500 flex gap-1">
            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/health-data.png" alt="health-data" /> 
            Breed: ${getDisplayValue(pet.breed)}
          </p>
          <p class="text-gray-500 flex gap-1">
            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar--v1" /> 
            Birth: ${getDisplayValue(pet.date_of_birth)}
          </p>
          <p class="text-gray-500 flex gap-1">
            <img width="24" height="15" src="https://img.icons8.com/fluency-systems-regular/50/mercury.png" alt="mercury" /> 
            Gender: ${getDisplayValue(pet.gender)}
          </p>
          <p class="text-gray-500 flex gap-1">
            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/us-dollar--v1.png" alt="us-dollar--v1" /> 
            Price: ${getDisplayValue(pet.price)}$
          </p>
        </div>
        <hr />
        <div class="flex justify-around mt-2">
          <button id="likeButton" onclick="showPic('${pet.image}')" class="border rounded-lg p-2">
            <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/50/facebook-like--v1.png" alt="facebook-like--v1" />
          </button>
          <button onclick="showCongrats(this)" class="text-clr font-bold border rounded-lg p-2">Adopt</button>
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
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="btn category-btn">
        <img src="${item.category_icon}" />
        ${item.category}
      </button>
    `;

    categoryContainer.appendChild(buttonContainer);
  });
};

const loadCategoryPets = async (id) => {
  const loadingSpinner = document.getElementById("loadingSpinner");
  const petContainer = document.getElementById("pets");

  petContainer.style.display = "none";
  loadingSpinner.style.display = "block";

  const startTime = Date.now(); 

  try {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`);
    const d = await response.json();

    const delay = Math.max(2000 - (Date.now() - startTime), 0);

    setTimeout(() => {
      loadingSpinner.style.display = "none"; 
      petContainer.style.display = "grid"; 
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");

      displaypets(d.data);
    }, delay);

  } catch (error) {
    console.error("Error fetching category data:", error);
    loadingSpinner.style.display = "none";
    petContainer.style.display = "grid";
  }
};


const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};


let petsData = []; // storing fetched pet

const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      petsData = data.pets; 
      displaypets(petsData); 
    })
    .catch((error) => console.log(error));
};

// Sorting function
const sortByPriceDescending = () => {
  petsData.sort((a, b) => b.price - a.price); // descending order sorting
  displaypets(petsData); 
};

// Add event listener to the sorting button
document.getElementById("sortByPriceBtn").addEventListener("click", sortByPriceDescending);

// Function to display pets
const displaypets2 = (pets) => {
  const petsContainer = document.getElementById("pets");
  petsContainer.innerHTML = ''; // Clear out previous pets
  pets.forEach((pet) => {
    const petElement = document.createElement('div');
    petElement.classList.add('pet-card', 'border', 'p-4', 'rounded-lg');
    petElement.innerHTML = `
      <img src="${pet.image}" alt="${pet.name}" class="w-full h-48 object-cover rounded-lg">
      <h2 class="text-xl font-bold mt-4">${pet.name}</h2>
      <p class="text-lg">Price: $${pet.price}</p>
      <button onclick="loadDetails('${pet.id}')" class="mt-3 px-4 py-2 bg-clr text-white rounded">View Details</button>
    `;
    petsContainer.appendChild(petElement);
  });
};




// load categories and pets function
loadCategories();
loadPets();
