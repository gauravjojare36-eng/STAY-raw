let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [
  {name:"Black Hoodie", price:999, img:"hoodie.jpg"},
  {name:"Street T-Shirt", price:599, img:"tshirt.jpg"}
];

// SHOW PRODUCTS
if(document.getElementById("productGrid")){
  let grid="";
  products.forEach(p=>{
    grid += `
      <div class="card">
        <img src="images/${p.img}" onclick="zoomImage(this.src)">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart('${p.name}',${p.price})">Add</button>
        <span class="wish" onclick="addWishlist('${p.name}')">❤️</span>
      </div>
    `;
  });
  document.getElementById("productGrid").innerHTML = grid;
}

// CART
function addToCart(name, price){
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// WISHLIST
function addWishlist(name){
  wishlist.push(name);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Added to wishlist");
}

// SHOW CART
if(document.getElementById("cartItems")){
  let output="", total=0;
  cart.forEach(item=>{
    output += `<p>${item.name} - ₹${item.price}</p>`;
    total += item.price;
  });
  output += `<h3>Total: ₹${total}</h3>`;
  document.getElementById("cartItems").innerHTML = output;
}

// SHOW WISHLIST
if(document.getElementById("wishItems")){
  let wishHTML="";
  wishlist.forEach(i=> wishHTML += `<p>${i}</p>`);
  document.getElementById("wishItems").innerHTML = wishHTML;
}

// WHATSAPP ORDER
function orderWhatsApp(){
  let text="Order:%0A";
  cart.forEach(i=> text += i.name + "%0A");
  window.open("https://wa.me/91XXXXXXXXXX?text="+text);
}

// IMAGE ZOOM
function zoomImage(src){
  document.getElementById("zoomBox").style.display="flex";
  document.getElementById("zoomImg").src=src;
}
function closeZoom(){
  document.getElementById("zoomBox").style.display="none";
}

// ADMIN LOGIN
function login(){
  if(document.getElementById("pass").value === "1234"){
    document.getElementById("panel").style.display="block";
    showAdminProducts();
  } else alert("Wrong password");
}

// ADMIN ADD PRODUCT
function addProduct(){
  let name = pname.value;
  let price = pprice.value;
  let img = pimg.value;
  products.push({name, price, img});
  localStorage.setItem("products", JSON.stringify(products));
  showAdminProducts();
  alert("Product Added");
}

// SHOW ADMIN PRODUCTS
function showAdminProducts(){
  if(!document.getElementById("adminProducts")) return;
  let html="";
  products.forEach((p,i)=>{
    html += `<p>${p.name} - ₹${p.price}
    <button onclick="deleteProduct(${i})">Delete</button></p>`;
  });
  adminProducts.innerHTML = html;
}

// DELETE PRODUCT
function deleteProduct(i){
  products.splice(i,1);
  localStorage.setItem("products", JSON.stringify(products));
  showAdminProducts();
}
