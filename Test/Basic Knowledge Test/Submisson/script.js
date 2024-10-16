const filterName = document.querySelector("[data-filter]");
const productName = document.querySelector("[data-products]");

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



