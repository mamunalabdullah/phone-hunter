// alert('hello');
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const phoneDiv = document.getElementById("phone-card");
const phoneDetails = document.getElementById("details-card");

const toggleSpinner = (displayStyle) => {
    document.getElementById("spinner").style.display = displayStyle;
}

const findPhone = () => {
    // clear value of search items
    phoneDiv.innerHTML = "";
    phoneDetails.innerHTML = "";

    const searchInputValue = searchInput.value;
    toggleSpinner("block")
    if (searchInputValue == "") {
        document.getElementById("error").style.display = "block";
    } else {
        document.getElementById("error").style.display = "none";
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputValue}`;
    
        fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data.data[0]);
            if (data.data[0] == undefined) {
                toggleSpinner("none");
                document.getElementById("error").style.display = "block";
            } else {
                document.getElementById("error").style.display = "none";
                displayFindPhone(data.data.slice(0, 20));
            }
        });
    
         // clear value
         searchInput.value = ""; 
    }
}

const displayFindPhone = (phones) =>{
    
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = `
            <div class="card mb-4 p-3">
                <img src="${phone.image}" class="card-img-top" alt="image of ${phone.phone_name}">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h4 class="card-title">${phone.brand}</h4>
                    <a href="#" class="btn btn-primary" onclick="getPhoneDetails('${phone.slug}')">Details</a>
                </div>
            </div>
        `;
        phoneDiv.appendChild(div);
    });
    toggleSpinner("none");
}

const getPhoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = (details) => {
    // clear value of details 
    phoneDetails.innerHTML = "";
    
    console.log(details);
    const div = document.createElement("div");
    div.classList.add("col-md-4");
    div.innerHTML =`
    <div class="card p-3 mb-4">
        <img src="${details.image}" class="card-img-top" alt="image of ${details.name}">
        <div class="card-body">
            <h5 class="card-title">${details.name}</h5>
            <h6 class="card-title">${details.releaseDate}</h6>
            <p>Chipset: ${details.mainFeatures.chipSet}</p>
            <p>Display Size: ${details.mainFeatures.displaySize}</p>
            <p>Memory: ${details.mainFeatures.memory}</p>
            <p>Storage: ${details.mainFeatures.storage}</p>
            <p>Sensors: ${details.mainFeatures.sensors}</p>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}