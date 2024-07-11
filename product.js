document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach((product, index) => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: ${product.price}</p>
                    <button onclick="purchaseProduct(${index})">Buy Now</button>
                `;
                productList.appendChild(productDiv);
            });
        });
});

function purchaseProduct(index) {
    fetch('/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productIndex: index })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    });
}
