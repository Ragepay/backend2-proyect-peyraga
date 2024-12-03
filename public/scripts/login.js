const BotonLogin = document.querySelector("#login");

BotonLogin.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/jsoN" },
            body: JSON.stringify(data),
        }
        const URL = "/api/sessions/login"
        let response = await fetch(URL, options);
        response = await response.json();
        localStorage.setItem("token", response.token);
        alert(response.message);
    } catch (error) {
        alert(error.message);
    };
});

const BotonLoginGoogle = document.querySelector("#google-login");

BotonLoginGoogle.addEventListener("click", (e) => {
    // Redirigir directamente al endpoint que manejará la autenticación
    const URL = "http://localhost:9000/api/sessions/auth/google";
    window.location.href = URL; // Redirige al usuario a Google para autenticarse
});