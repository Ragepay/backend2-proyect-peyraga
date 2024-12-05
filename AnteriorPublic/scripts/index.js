verifyOnline()

// Verificar que la session esta iniciada/online
async function verifyOnline() {
  const url = "/api/sessions/online"
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/jsoN"
    }
  }
  let response = await fetch(url, opts);
  response = await response.json();
  const { online } = response;
  if (online) {
    document.querySelector("#navbar").innerHTML = `
        <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="products.html">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="CreateProduct.html">Create Producto</a>
          </li>
        `
  }
}
