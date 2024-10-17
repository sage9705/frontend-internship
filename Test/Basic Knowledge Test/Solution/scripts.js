// Sample product data
const products = [
  {
    id: 1,
    name: "Product A",
    price: 99,
    description: "This is product A",
    colors: ["red", "blue", "green"],
    images: ["productA1.jpg", "productA2.jpg", "productA3.jpg"],
  },
  {
    id: 2,
    name: "Product B",
    price: 149,
    description: "This is product B",
    colors: ["yellow", "black", "white"],
    images: ["productB1.jpg", "productB2.jpg", "productB3.jpg"],
  },
  {
    id: 3,
    name: "Product C",
    price: 199,
    description: "This is product C",
    colors: ["purple", "orange", "pink"],
    images: ["productC1.jpg", "productC2.jpg", "productC3.jpg"],
  },
  {
    id: 4,
    name: "Product D",
    price: 79,
    description: "This is product D",
    colors: ["brown", "gray", "beige"],
    images: ["productD1.jpg", "productD2.jpg", "productD3.jpg"],
  },
  {
    id: 5,
    name: "Product E",
    price: 129,
    description: "This is product E",
    colors: ["teal", "maroon", "navy"],
    images: ["productE1.jpg", "productE2.jpg", "productE3.jpg"],
  },
];

// Function to render products
function renderProducts(productsToRender) {
  const container = document.querySelector(".product-container");
  container.innerHTML = "";
  productsToRender.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <button onclick="showProductDetails(${product.id})">View Details</button>
        `;
    container.appendChild(productElement);
  });
}

// Function to filter products
function filterProducts() {
  const filterValue = document
    .getElementById("product-filter")
    .value.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(filterValue) ||
      product.description.toLowerCase().includes(filterValue)
  );
  renderProducts(filteredProducts);
}

// Function to show product details
function showProductDetails(productId) {
  const product = products.find((p) => p.id === productId);
  const detailsContainer = document.getElementById("product-info");
  const colorOptions = document.getElementById("color-options");
  const slideshow = document.getElementById("image-slideshow");

  detailsContainer.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <p>${product.description}</p>
    `;

  colorOptions.innerHTML = "<h4>Color Options:</h4>";
  product.colors.forEach((color) => {
    const colorButton = document.createElement("button");
    colorButton.style.backgroundColor = color;
    colorButton.onclick = () => alert(`${color} selected!`);
    colorOptions.appendChild(colorButton);
  });

  slideshow.innerHTML = "";
  product.images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = `${product.name} image ${index + 1}`;
    img.style.display = index === 0 ? "block" : "none";
    slideshow.appendChild(img);
  });

  let currentSlide = 0;
  function showSlide(n) {
    const slides = slideshow.getElementsByTagName("img");
    slides[currentSlide].style.display = "none";
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].style.display = "block";
  }

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.onclick = () => showSlide(currentSlide - 1);
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.onclick = () => showSlide(currentSlide + 1);
  slideshow.appendChild(prevButton);
  slideshow.appendChild(nextButton);
}

// Form validation
document.getElementById("contact-form").onsubmit = function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email address");
    return;
  }

  alert("Form submitted successfully!");
  this.reset();
};

// Initial render
renderProducts(products);

// Add event listener for product filter
document
  .getElementById("product-filter")
  .addEventListener("input", filterProducts);
