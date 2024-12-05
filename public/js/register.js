const BotonLogin = document.querySelector("#register");

BotonLogin.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        const data = {
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/jsoN" },
            body: JSON.stringify(data),
        }
        const URL = "/api/sessions/register"
        let response = await fetch(URL, options);
        response = await response.json();
        if (response.user) {
            location.replace("/login");
        } else {
            alert(response.message);
        }
    } catch (error) {
        alert(error.message);
    };
});

const BotonLoginGoogle = document.querySelector("#google-register");

BotonLoginGoogle.addEventListener("click", (e) => {
    // Redirigir directamente al endpoint que manejará la autenticación
    const URL = "http://localhost:9000/api/sessions/auth/google";
    window.location.href = URL; // Redirige al usuario a Google para autenticarse
});