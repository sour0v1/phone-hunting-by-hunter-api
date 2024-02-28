// console.log('hunter here');

// By promise
// function loadData(){
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//         .then(res => res.json())
//         .then(data => console.log(data));
// }

// By async await
const loadData = async (brand) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand}`)
    const data = await response.json();
    const phones = data.data;
    // here phones is a array
    displayData(phones);
    
}

function displayData(phonesData) {
    const getCardContainer = document.getElementById('card-container');
    getCardContainer.textContent = '';

    console.log(phonesData.length);
    // display show all button
    const getShowAllBtnContainer = document.getElementById('show-btn-container');
    if(phonesData.length > 8){
      getShowAllBtnContainer.classList.remove('hidden');
    }
    else{
      getShowAllBtnContainer.classList.add('hidden');
    }
    // display 8 phones
    phonesData = phonesData.slice(0, 9);

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
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
        `
        // 3. append
        getCardContainer.appendChild(createPostContainer);
    })
}

// search phone
const getSearchBtn = document.getElementById('search-btn');
getSearchBtn.addEventListener('click',() => {
  const getSearchBox = document.getElementById('search-box');
  const getValue = getSearchBox.value;
  // console.log(getValue);
  loadData(getValue);
})
// loadData();

