// BOTON LOGIN CON EMAIL Y CONTRASEÑA.
const BotonLogin = document.querySelector("#login");

BotonLogin.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        // Extraer data de logueo.
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        // Configurar option para fectch
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/jsoN" },
            body: JSON.stringify(data),
        }
        // Fetch y respuesta.
        let response = (await fetch("/api/sessions/login", options)).json();
        console.log(response);
        if (response.status = true){
            location.replace("/homeApp.html")
        } else{
            alert("INVALID CREDENCIALS")
        }
    } catch (error) {
        alert(error.message);
    };
});


// BOTON LOGIN GOOGLE
const BotonLoginGoogle = document.querySelector("#google-login");

BotonLoginGoogle.addEventListener("click", (e) => {
    // Redirigir directamente al endpoint que manejará la autenticación
    const URL = "/api/sessions/auth/google";
    window.location.href = URL; // Redirige al usuario a Google para autenticarse
});

/*

const url = "http://localhost:8080/api/sessions/online";
const opts = {
 method: "POST",
 headers: {
   "Content-Type": "application/json",
   Authorization: "Bearer " + token,
 },
};
let response = await fetch(url, opts);
response = await response.json();

*/