// alert('hello');
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");

const findPhone = () => {
    const searchInputValue = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputValue}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data));
}