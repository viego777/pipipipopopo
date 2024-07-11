let token;

function initializeAdmin() {
    const password = document.getElementById('init-password').value;
    fetch('/admin/init', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        document.getElementById('init-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    });
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        token = data.token;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        fetchProducts();
        fetchStats();
    });
}

function addProduct() {
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;

    fetch('/admin/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ name, description, price })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        fetchProducts();
    });
}

function fetchProducts() {
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            products.forEach((product, index) => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: ${product.price}</p>
                    <button onclick="deleteProduct(${index})">Delete</button>
                `;
                productList.appendChild(productDiv);
            });
        });
}

function deleteProduct(index) {
    fetch(`/admin/products/${index}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        fetchProducts();
    });
}

function fetchStats() {
    fetch('/admin/stats', {
        headers: {
            'Authorization': token
        }
    })
    .then(response => response.json())
    .then(stats => {
        document.getElementById('access-stats').innerText = `Accesses: ${stats.accesses}`;
        document.getElementById('sales-stats').innerText = `Sales: ${stats.sales}`;
    });
}
