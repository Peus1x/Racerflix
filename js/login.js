console.log("login JS carregado!");

// Transição de Login
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        triggerLoader(() => {
            window.location.href = 'html/perfis.html.html';
        }, 1500);
    });
}