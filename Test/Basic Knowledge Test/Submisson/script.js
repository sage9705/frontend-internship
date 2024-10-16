const filterName = document.querySelector("[data-filter]");
const productName = document.querySelector("[data-products]");
const colorDots = document.getElementsByClassName("coloDots")
var nav = document.querySelector("#primary-navigation");
var toggleButton = document.querySelector("#toggleButton");
var validEmail = document.querySelector("#email");
var form = document.querySelector("form");
errorMessage = document.getElementById("re");
var regularExp = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;


let currentColor = "blue";
showColor(currentColor);
let product = [];
let data;
let slideIndex = 1;
showSlides(slideIndex);

function pushSlides(n){
    showSlides(slideIndex += n);
}

function currentSlide(n){
    showSlides(slideIndex = n);
}

function showSlides(n){
  let i;
  let slides = document.getElementsByClassName("slideShow");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function changeColor(color){
  showColor(currentColor = color);
}

function showColor(color){
  let dotss = document.getElementsByClassName("dot");

}
function validation() {
  if (!validEmail.value.match(regularExp)) {
    errorMessage.innerHTML = "Valid email required";
    return false;
  }
  errorMessage.innerHTML = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submit();
});


filterName.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    product.forEach((product)=> {
        const isVisible = 
            product.name.toLowerCase().includes(value) ||
            product.category.toLowerCase().includes(value) ||
            product.price.toString().includes(value);
        product.element.classList.toggle("hide", !isVisible);
    });
});

toggleButton.addEventListener("click", ()=>{
  const visibility = nav.getAttribute("data-visible");
  if (visibility === "false"){
    nav.setAttribute("data-visible", true);
    toggleButton.setAttribute("aria-expanded", true);
  }else{
    nav.setAttribute("data-visible", false);
    toggleButton.setAttribute("aria-expanded", false);
  }
  console.log(visibility);
});



