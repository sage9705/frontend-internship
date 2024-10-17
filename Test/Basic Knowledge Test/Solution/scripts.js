// Sample product data with updated image references from assets folder
const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: 199,
    description: "Stay connected with our latest smartwatch",
    colors: ["black", "silver", "gold"],
    images: [
      "assets/images/watch1.jpeg",
      "assets/images/watch2.jpeg",
      "assets/images/watch3.jpeg",
    ],
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 149,
    description: "Experience true wireless freedom",
    colors: ["white", "black", "blue"],
    images: [
      "assets/images/earbuds1.jpg",
      "assets/images/earbuds2.jpg",
      "assets/images/earbuds3.jpg",
    ],
  },
  {
    id: 3,
    name: "Fitness Tracker",
    price: 99,
    description: "Track your fitness goals with ease",
    colors: ["red", "green", "purple"],
    images: [
      "assets/images/tracker1.jpg",
      "assets/images/tracker2.jpg",
      "assets/images/tracker3.jpg",
    ],
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79,
    description: "Powerful sound in a compact design",
    colors: ["gray", "orange", "teal"],
    images: [
      "assets/images/speaker1.jpg",
      "assets/images/speaker2.jpg",
      "assets/images/speaker3.jpg",
    ],
  },
  {
    id: 5,
    name: "Power Bank",
    price: 49,
    description: "Keep your devices charged on the go",
    colors: ["white", "black", "pink"],
    images: [
      "assets/images/powerbank1.jpg",
      "assets/images/powerbank2.jpg",
      "assets/images/powerbank3.jpg",
    ],
  },
];

// Function to render products
function renderProducts(productsToRender) {
  const container = document.querySelector(".product-container");
  if (!container) {
    console.error("Product container not found");
    return;
  }
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
  const detailsSection = document.getElementById("product-details");
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
    colorButton.onclick = () => changeProductColor(color);
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

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.onclick = () => changeSlide(-1);
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.onclick = () => changeSlide(1);
  slideshow.appendChild(prevButton);
  slideshow.appendChild(nextButton);

  detailsSection.classList.remove("hidden");
}

// Function to change product color
function changeProductColor(color) {
  // In a real application, this would change the product image
  // For this example, we'll just show an alert
  alert(`Product color changed to ${color}`);
}

// Function to change slides in the image slideshow
let currentSlide = 0;
function changeSlide(direction) {
  const slides = document.querySelectorAll("#image-slideshow img");
  slides[currentSlide].style.display = "none";
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  slides[currentSlide].style.display = "block";
}

// Form validation
document.getElementById("contact-form").onsubmit = function (event) {
  event.preventDefault();
  let isValid = true;

  // Validate name
  const name = document.getElementById("name");
  if (name.value.trim() === "") {
    showError(name, "Name is required");
    isValid = false;
  } else {
    clearError(name);
  }

  // Validate email
  const email = document.getElementById("email");
  if (email.value.trim() === "") {
    showError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError(email, "Please enter a valid email address");
    isValid = false;
  } else {
    clearError(email);
  }

  // Validate message
  const message = document.getElementById("message");
  if (message.value.trim() === "") {
    showError(message, "Message is required");
    isValid = false;
  } else {
    clearError(message);
  }

  if (isValid) {
    alert("Form submitted successfully!");
    this.reset();
  }
};

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector(".error-message");
  errorElement.innerText = message;
  formGroup.classList.add("error");
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector(".error-message");
  errorElement.innerText = "";
  formGroup.classList.remove("error");
}

function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Initial render
renderProducts(products);

// Add event listener for product filter
document
  .getElementById("product-filter")
  .addEventListener("input", filterProducts);
