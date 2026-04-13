console.log("Filmes/Séries JS carregado!");


// ELEMENTOS

// Elementos do Hero / Trailer
// Nota: Variáveis de perfil e tema agora são gerenciadas pelo global.js

const heroVideo = document.getElementById("heroVideo");
const playTrailerBtn = document.getElementById("playTrailerBtn");
const muteBtn = document.getElementById("muteBtn");
const muteIcon = document.getElementById("muteIcon");

// abas
const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".section");


// SISTEMA DE ABAS


// categorias 
const categories = {
    "Início": () => showAll(),
    "Filmes": () => filterSection("Populares"),
    "Séries": () => filterSection("Séries"),
    "Jogos": () => filterSection("Jogos de Corrida")
};

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // remove active
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const tabText = tab.textContent.trim();

        if (categories[tabText]) {
            categories[tabText]();
        }
    });
});


// FUNÇÕES DE FILTRO

function showAll() {
    sections.forEach(section => {
        section.style.display = "block";
    });
}

function filterSection(name) {
    sections.forEach(section => {
        const title = section.querySelector("h2").textContent;

        if (title.includes(name)) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });
}


// CONTROLE DE ÁUDIO (MUTE)

if (muteBtn && heroVideo) {
    muteBtn.addEventListener("click", () => {
        heroVideo.muted = !heroVideo.muted;
        muteIcon.innerText = heroVideo.muted ? "🔇" : "🔊";
    
    });
}


// CONTROLE DO TRAILER (HERO)

if (playTrailerBtn && heroVideo) {
    playTrailerBtn.addEventListener("click", () => {
        if (heroVideo.paused) {
            heroVideo.play();
            heroVideo.volume = 0.2;
            playTrailerBtn.innerHTML = "⏸ Pausar";
    
        } else {
            heroVideo.pause();
            playTrailerBtn.innerHTML = "▶ Assistir";
        
        
        }
    });
}

// Resetar para a imagem (poster) quando o vídeo acabar
if (heroVideo) {
    heroVideo.addEventListener("ended", () => {
        heroVideo.load(); // Recarrega o vídeo para voltar ao estado do 'poster'
        if (playTrailerBtn) playTrailerBtn.innerHTML = "▶ Assistir";
        
    });
}


// PREVIEWS NOS CARDS 

const movieCards = document.querySelectorAll('.card');

movieCards.forEach(card => {
    const video = card.querySelector('.card-video');
    let hoverTimeout;
    
    if (video) {
        card.addEventListener('mouseenter', () => {
            // Inicia o preview apenas se o usuário "parar" o mouse no card
            hoverTimeout = setTimeout(() => {
                video.play().catch(err => {});
                video.volume = 0.2;
            }, 400); 
        });
        
        card.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            video.pause();
            video.currentTime = 0; // Reseta o vídeo ao sair
        });
    }
});

//cards

document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.insertAdjacentHTML("beforeend", `
      <div class="card-info">
        <div class="card-icons">
          <div class="icon-circle">▶</div>
          <div class="icon-circle">+</div>
          <div class="icon-circle">👍</div>
        </div>
        <div class="card-metadata">
          <span class="match">98% relevante</span>
          <span class="age">14+</span>
        </div>
        <span class="card-category">Ação • Carros • Adrenalina</span>
      </div>
    `);
  });

});