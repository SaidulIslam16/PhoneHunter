const loadPhoneData = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();

    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    // display Phones 10 phone 

    const showAllBtn = document.getElementById('show-all');
    if(dataLimit && phones.length>10){
        phones = phones.slice(0,10)
        
        showAllBtn.classList.remove('d-none')
    }
    else{
        showAllBtn.classList.add('d-none')
    }

    // display no phone found
    const noPhone = document.getElementById('not-found-msg');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }

    // display all phones
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `<div class="card p-5">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">View Details</button>
            </div>
        </div>
    `;
        phoneContainer.appendChild(div);

    });
    // Stop Spin Loader
    toggleSpinner(false);

}

// process Search

const processSearch = (dataLimit)=>{
    toggleSpinner(true);

    const searchField = document.getElementById('search-field');
    
    const searchText = searchField.value;
    // searchField.value = '';
    loadPhoneData(searchText, dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch(10)
})

// Enter Button Search

document.getElementById('search-field').addEventListener('keyup', function(event){
    // console.log(event.key);
    if(event.key ==='Enter'){
        processSearch(10)
    }
})

// Loading Section
const toggleSpinner= isLoading=>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

// load all after clicking show all btn

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})


// Load Phone Detials

const loadPhoneDetails = async id=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);



}

// Displying phone detials on a modal


const displayPhoneDetails = phone=>{
    console.log(phone);
    const phoneTitle = document.getElementById('phoneModalLabel');
    phoneTitle.innerText = phone.name;
    const phoneDetials = document.getElementById('phoneDetails');
    phoneDetials.innerHTML=`
        <img src="${phone.image}">
        <h6>Main Features:</h6>
        <table>
            <tr>
                <td>ChipSet : </td>
                <td> ${phone.mainFeatures.chipSet}</td>
            </tr>
            <tr>
                <td>Display Size : </td>
                <td> ${phone.mainFeatures.displaySize}</td>
            </tr>
            <tr>
                <td>Memory : </td>
                <td> ${phone.mainFeatures? phone.mainFeatures.memory: 'No Memonry Info'}</td>
            </tr>
            <tr>
                <td>Release Date:</td>
                <td> ${phone.releaseDate? phone.releaseDate : 'No Date Found'}</td>
            </tr>
        </table>
    `

}

loadPhoneData('apple');