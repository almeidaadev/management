documen.getElementById("productForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        purchasePrice: document.getElementById("purchasePrice").value,
        salePrice: document.getElementById("salePrice").value,
    };

    try {
        const response = await fetch("http://localhost:8081/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Erro ao adicionar produto");
        }

        const data = await response.json();
        console.log("Produto adicionado:", data);
        alert("Produto adicionado com sucesso!");
    } catch (error) {
        console.error("Erro:", error);
        alert(
            "Erro ao adicionar produto. Verifique o console para mais detalhes."
        );
    }
});

const response = await fetch("http://localhost:8081/api/products/totals");
const userData  = await response.json();

const { totalPurchase, totalSale, totalProfit } = userData;