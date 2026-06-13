const products = [

{
id:1,
name:"Laptop",
price:50000,
image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",

shortDesc:"Powerful laptop for work.",

fullDesc:"Intel Core i7 Laptop with 16GB RAM and 512GB SSD.",

size:"15.6 Inch",

model:"LP-2025"
}

];

const id =
new URLSearchParams(
window.location.search
).get("id");

const product =
products.find(
p => p.id == id
);

document.getElementById(
"productDetails"
).innerHTML = `

<div class="detail-card">

<img src="${product.image}">

<h1>${product.name}</h1>

<h2>₹${product.price}</h2>

<p>
<strong>Description:</strong>
${product.fullDesc}
</p>

<p>
<strong>Size:</strong>
${product.size}
</p>

<p>
<strong>Model Number:</strong>
${product.model}
</p>

<button>
Add To Cart
</button>

</div>
`;