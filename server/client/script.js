document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const summary = document.getElementById('summary');
    let products = [];

    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const productName = document.getElementById('product-name').value;
        const purchasePrice = parseFloat(document.getElementById('purchase-price').value);
        const salePrice = parseFloat(document.getElementById('sale-price').value);

        const product = {
            name: productName,
            purchasePrice,
            salePrice,
        };

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            const newProduct = await response.json();
            products.push(newProduct);
            displayProducts();
            displaySummary();
        } catch (error) {
            console.error('Error:', error);
        }

        productForm.reset();
    });

    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3000/api/products');
            products = await response.json();
            displayProducts();
            displaySummary();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function displayProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <strong>${product.name}</strong><br>
                Valor Pago: R$${product.purchasePrice.toFixed(2)}<br>
                Valor Vendido: R$${product.salePrice.toFixed(2)}<br>
                Lucro: R$${product.profit.toFixed(2)}
            `;
            productList.appendChild(productItem);
        });
    }

    function displaySummary() {
        const totalPurchase = products.reduce((acc, product) => acc + product.purchasePrice, 0);
        const totalSale = products.reduce((acc, product) => acc + product.salePrice, 0);
        const totalProfit = products.reduce((acc, product) => acc + product.profit, 0);

        summary.innerHTML = `
            <h2>Resumo</h2>
            Total Pago: R$${totalPurchase.toFixed(2)}<br>
            Total Vendido: R$${totalSale.toFixed(2)}<br>
            Lucro Total: R$${totalProfit.toFixed(2)}
        `;
    }

    fetchProducts();
});
