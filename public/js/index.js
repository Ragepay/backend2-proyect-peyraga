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
  const { online } = response.response;
  if (online) {
    document.querySelector("#navbar").innerHTML = `
          <li class="nav-item">
            <a class="nav-link" href="/homeApp">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/createProduct">Create Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/products">Productos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/profile">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/" onClick="signOut()" >Signout</a>
          </li>
        `
  }
}

async function signOut() {
  const url = "/api/sessions/signout"
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/jsoN"
    }
  }
  await fetch(url, opts);
}
