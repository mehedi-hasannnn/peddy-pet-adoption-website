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

const showPic = (pet) =>{
  
    const likedImageContainer = document.getElementById("likedPet");
    const div = document.createElement("div");
    div.innerHTML = `
    
    <div class="p-5">
    <img src= ${pet} />
    </div>
    
    `;
    likedImageContainer.appendChild(div);
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
    petContainer.innerHTML = "";

    if(pets.length ==0){
      petContainer.innerHTML = `
      
      <div class="mx-auto w-[800px] text-center">
      <img class="mx-auto" src="images/error.webp"/>
      <br>
      <h2 class="font-extrabold text-5xl">No Information Available
      </h2>
      <br>
      <p>OOps!! Sorry, There is no birds available here to adopt right now. Please check again later
      </p>
      </div>
      
      `;
      return;
    }

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
        <button id="likeButton" onclick="showPic('${pet.image}')" class="border rounded-lg  p-2"><img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/50/facebook-like--v1.png" alt="facebook-like--v1"/></button>
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
      
      `
   
      categoryContainer.appendChild(buttonContainer);
    });
  };
 const loadCategoryPets = (id) =>{
  
  // fetch
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
      .then((res) => res.json())
      .then((d) => {
        // class remove
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active");
        displaypets(d.data)
      })
      .catch((error) => console.log(error));
 }

const removeActiveClass=()=>{
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons){
      btn.classList.remove("active");
    }
}

  loadCategories();
  loadPets();
  
