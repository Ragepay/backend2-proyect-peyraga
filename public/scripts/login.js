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
        alert(response.message);
    } catch (error) {
        alert(error.message);
    };
});