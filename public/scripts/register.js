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
        alert(response.message);
    } catch (error) {
        alert(error.message);
    };
});