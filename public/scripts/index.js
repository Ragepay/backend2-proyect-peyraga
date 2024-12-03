const url = "http://localhost:9000/api/sessions/onlineToken"
const opts = {
    method: "POST",
    headers: {
        "Content-Type": "application/jsoN",
        token: localStorage.getItem("token")
    }
}

async function verifyOnline() {
    let response = await fetch(url, opts);
    response = await response.json();
    const { online } = response;
    if (online) {
        document.querySelector("#navbar").innerHTML = `
        <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="register.html">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="CreateProduct.html">Create Producto</a>
          </li>
        `
    }
}

verifyOnline()
