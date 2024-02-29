// console.log('hunter here');

// By promise
// function loadData(){
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//         .then(res => res.json())
//         .then(data => console.log(data));
// }

// By async await
// load data(2)
const loadData = async (brand, isShowAll) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand}`)
  const data = await response.json();
  const phones = data.data;
  // here phones is a array
  displayData(phones, isShowAll);

}
// display data(3)
function displayData(phonesData, isShowAll) {
  const getCardContainer = document.getElementById('card-container');
  getCardContainer.textContent = '';
  console.log('showAll-', isShowAll)
  // console.log(phonesData.length);
  // display show all button
  const getShowAllBtnContainer = document.getElementById('show-btn-container');
  if (phonesData.length > 8) {
    getShowAllBtnContainer.classList.remove('hidden');
    showAll();
  }
  else {
    getShowAllBtnContainer.classList.add('hidden');
  }
  // display 8 phones
  if (!isShowAll) {
    phonesData = phonesData.slice(0, 9);
  }

  phonesData.forEach(phone => {
    console.log(phone);

    // 1 .create post container
    const createPostContainer = document.createElement('div');
    createPostContainer.classList = `card bg-base-100 shadow-xl`;

    // 2. create post container element
    createPostContainer.innerHTML = `
        <figure><img src="${phone.image}" alt="phones" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p><span>ID - </span>${phone.slug}</p>
                      <div class="card-actions justify-center items-center">
                        <button class="btn btn-primary" onclick="my_modal_3.showModal(); showDetails('${phone.slug}')">Show Details</button>
                      </div>
                    </div>
        `
    // 3. append
    getCardContainer.appendChild(createPostContainer);
  })
  // hide spinner
  let loading = false;
  showSpinner(loading);
}

// search phone(1)
const searchPhones = (isShowAll) => {
  const getSearchBox = document.getElementById('search-box');
  const getValue = getSearchBox.value;
  // show spinner
  let loading = true;
  showSpinner(loading)
  // console.log(getValue);
  loadData(getValue, isShowAll);
}
// loadData();

// show spinner
const showSpinner = (isLoading) => {
  const getSpinnerContainer = document.getElementById('spinner-container');
  if (isLoading) {
    getSpinnerContainer.classList.remove('hidden');

  }
  else {
    getSpinnerContainer.classList.add('hidden');
  }
}

// show all phones
function showAll() {
  const getShowAllBtn = document.getElementById('show-btn');
  // console.log(getShowAllBtn)
  getShowAllBtn.addEventListener('click', () => {
    searchPhones(true);
  })
}

// show phone details
const showDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  console.log(data);
  // display details in modal
  const getModalContainer = document.getElementById('modal-container');
  getModalContainer.textContent = ' ';
  // create modal data container
  const createDataContainer = document.createElement('div');
  createDataContainer.innerHTML = `
            <figure class="px-10 pt-10 flex justify-center items-center">
      
              <img src="${data.data.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class=" space-y-2">
              <h2 class="card-title">${data.data.name}</h2>
              <p><span class="font-medium">Storage: </span>${data.data.
      mainFeatures.storage}</p>
              <p><span class="font-medium">Display Size: </span>${data.data.
      mainFeatures.displaySize}</p>
              <p><span class="font-medium">Chipset: </span>${data.data.
      mainFeatures.chipSet}</p>
              <p><span class="font-medium">Memory: </span>${data.data.
      mainFeatures.memory}</p>
              <p><span class="font-medium">Brand: </span>${data.data.
      brand}</p>
              <p><span class="font-medium">Release Date: </span>${data.data.
      releaseDate}</p>
              
            </div>
    `
  getModalContainer.appendChild(createDataContainer);

}
