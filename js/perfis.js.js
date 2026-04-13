/* Script para gerenciar Dark Mode e Light Mode */

// Perfis 
function setupProfileSelection() {
    const perfis = document.querySelectorAll(".profile");

    perfis.forEach(perfil => {
      perfil.addEventListener("click", (e) => {
        e.preventDefault();
        const id = perfil.dataset.perfil;
        const loaderEl = document.getElementById('loader');
        
        localStorage.setItem("perfil", id);
        if (loaderEl) loaderEl.classList.add('active');

        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1200);
      });
    });
}
// Vídeo de fundo
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
        triggerLoader(() => {
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        }, 800);
    });
}

// Inicializar o tema ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    setupProfileSelection();
});
