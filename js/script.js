// alert('hello');
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const phoneDiv = document.getElementById("phone-card");
const phoneDetails = document.getElementById("details-card");

const findPhone = () => {
    const searchInputValue = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputValue}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => displayFindPhone(data.data));
}

const displayFindPhone = (phones) =>{
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = `
            <div class="card mb-4">
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
}

const getPhoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = (details) => {
    console.log(details);
    phoneDetails.innerHTML =`
    <div class="card">
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
}
// chipSet: "Apple A15 Bionic (5 nm)"
// displaySize: "6.7 inches, 109.8 cm2 (~87.4% screen-to-body ratio)"
// memory: "128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM, 1TB 6GB RAM"
// sensors: (6) ['Face ID', 'accelerometer', 'gyro', 'proximity', 'compass', 'barometer']
// storage: "128GB/256GB/1TB storage, no card slot"