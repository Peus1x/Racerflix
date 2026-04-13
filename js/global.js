// Configurações Globais RacerFlix
const THEME_KEY = 'theme';


const isSubfolder = window.location.pathname.includes('/html/');
const basePath = isSubfolder ? "../" : "./";

const videoDark = `${basePath}assets/vid/night.mp4`;
const videoLight = `${basePath}assets/vid/light2.mp4`;
const iconDark = `${basePath}assets/img/toogle-light.png`;
const iconLight = `${basePath}assets/img/toogle-dark.png`;

// Componentes HTML Globais
const COMPONENTS = {
    loader: `
        <div id="loader" class="loader-overlay">
            <video autoplay muted loop playsinline></video>
            <div class="netflix-spinner"></div>
        </div>
    `,
    header: `
        <header>
            <div class="header-left">
                <a href="home.html" class="logo" id="global-logo">RACERFLIX</a>
                <ul class="nav-menu">
                    <li><a href="home.html" data-nav="home">Início</a></li>
                    <li><a href="filmes.html" data-nav="filmes">Filmes</a></li>
                    <li><a href="series.html" data-nav="series">Séries</a></li>
                    <li><a href="jogos.html" data-nav="jogos">Jogos</a></li>
                </ul>
            </div>
            <div class="header-right">
                <div class="search-container">
                    <button class="search-btn" id="searchBtn">🔍</button>
                    <input type="search" id="searchInput" placeholder="Títulos, gêneros..." autocomplete="off">
                </div>
                <div class="profile-menu">
                    <button class="profile-btn" id="profileBtn">
                        <video class="profile-avatar" autoplay muted loop playsinline>
                            <source src="${basePath}assets/vid/pf1.mp4" type="video/mp4">
                        </video>
                    </button>
                    <section class="profile-dropdown" id="profileDropdown">
                        <ul class="dropdown-list">
                            <li class="dropdown-item profile-item">
                                <a href="#" data-perfil="2">
                                    <video class="mini-avatar" autoplay muted loop playsinline preload="metadata">
                                        <source src="${basePath}assets/vid/pf2.mp4" type="video/mp4">
                                    </video>
                                    <span>Pedro</span>
                                </a>
                            </li>

                            <li class="dropdown-item profile-item">
                                <a href="#" data-perfil="3">
                                    <video class="mini-avatar" autoplay muted loop playsinline preload="metadata">
                                        <source src="${basePath}assets/vid/pf3.mp4" type="video/mp4">
                                    </video>
                                    <span>Gusmao</span>
                                </a>
                            </li>

                            <li class="dropdown-item profile-item">
                                <a href="#" data-perfil="1">
                                    <video class="mini-avatar" autoplay muted loop playsinline preload="metadata">
                                        <source src="${basePath}assets/vid/pf1.mp4" type="video/mp4">
                                    </video>
                                    <span>Joao</span>
                                </a>
                            </li>
                            <li class="dropdown-item"><a href="perfis.html.html">Gerenciar perfis</a></li>
                        </ul>
                        <div class="dropdown-divider"></div>
                        <ul class="dropdown-list">
                            <li class="dropdown-item">
                                <span>Modo Escuro</span>
                                <label class="switch">
                                    <input type="checkbox" id="themeSwitch">
                                    <span class="slider"></span>
                                </label>
                            </li>
                            <li class="dropdown-item"><a href="contas.html">Conta</a></li>
                        </ul>
                        <div class="dropdown-divider"></div>
                        <ul class="dropdown-list">
                            <li class="dropdown-item"><a href="../login.html">Sair da RacerFlix</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </header>
    `
};

function injectComponents() {
    
    if (!document.getElementById('loader')) {
        document.body.insertAdjacentHTML('afterbegin', COMPONENTS.loader);
    }
    
    const headerContainer = document.getElementById('global-header');
    if (headerContainer) {
        headerContainer.innerHTML = COMPONENTS.header;
        
    
        const currentPage = window.location.pathname.split("/").pop().split(".")[0];
        const activeLink = document.querySelector(`.nav-menu a[data-nav="${currentPage}"]`);
        if (activeLink) activeLink.classList.add('active');
    }
}

function setupGlobalSearch() {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const searchContainer = document.querySelector(".search-container");

    if (searchBtn && searchInput && searchContainer) {
        searchBtn.addEventListener("click", () => {
            searchContainer.classList.toggle("active");
            if (searchContainer.classList.contains("active")) searchInput.focus();
        });

        searchInput.addEventListener("input", () => {
            const term = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                const title = (card.dataset.title || card.querySelector('.card-title')?.textContent || "").toLowerCase();
                card.style.display = title.includes(term) ? "block" : "none";
            });
        });
    }
}

let loader, themeSwitch, themeIcon, body;

function refreshElements() {
    loader = document.getElementById("loader");
    themeSwitch = document.getElementById("themeSwitch");
    themeIcon = document.getElementById("themeIcon");
    body = document.body;
}

// Elementos de Perfil (Header)
let profileBtn, profileDropdown, profileVideoSource;


// TEMA E LOADER

function applyTheme(theme) {
    const loaderVideo = document.querySelector("#loader video");
    const bgVideo = document.getElementById("bgVideo");
    const bgVideoSource = bgVideo ? bgVideo.querySelector("source") : null;
    const currentVideoPath = theme === "light" ? videoLight : videoDark;

    if (loaderVideo) {
        loaderVideo.src = currentVideoPath;
        loaderVideo.load();
    }

    if (theme === "light") {
        body.classList.add("light-mode");
        if (themeSwitch) themeSwitch.checked = true;
        if (themeIcon) themeIcon.src = iconLight;
    } else {
        body.classList.remove("light-mode");
        if (themeSwitch) themeSwitch.checked = false;
        if (themeIcon) themeIcon.src = iconDark;
    }

    if (bgVideo) {
        bgVideo.pause();
        if (bgVideoSource) {
            bgVideoSource.src = currentVideoPath;
        } else {
            bgVideo.src = currentVideoPath;
        }
        bgVideo.load();
        bgVideo.play().catch(() => {});
    }
}

function updateProfileAvatar(id) {
    const video = document.querySelector("#profileBtn .profile-avatar");

    if (video) {
        video.src = `${basePath}assets/vid/pf${id}.mp4`;
        video.load();
        video.play().catch(() => {});
    }
}

function triggerLoader(callback, duration = 1200) {
    if (loader) {
        loader.classList.add('active');
        setTimeout(() => {
            callback();
            if (!window.location.href.includes(callback.toString())) {
                
                loader.classList.remove('active');
            }
        }, duration);
    } else {
        callback();
    }
}


// NAVEGAÇÃO E INICIALIZAÇÃO

document.addEventListener("DOMContentLoaded", () => {
    injectComponents();
    refreshElements();
    setupGlobalSearch();
    
    profileBtn = document.getElementById("profileBtn");
    profileDropdown = document.getElementById("profileDropdown");
    profileVideoSource = document.querySelector("#profileBtn .profile-avatar source");

    const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
    applyTheme(savedTheme);

    const currentPerfil = localStorage.getItem("perfil") || "1";
    updateProfileAvatar(currentPerfil);

    // Interceptador Global de Links para Loader
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && !this.target && !href.startsWith('http')) {
                e.preventDefault();
                triggerLoader(() => { window.location.href = href; });
            }
        });
    });

    if (themeSwitch) {
        themeSwitch.addEventListener("change", () => {
            const newTheme = themeSwitch.checked ? "light" : "dark";
            triggerLoader(() => {
                applyTheme(newTheme);
                localStorage.setItem(THEME_KEY, newTheme);
            }, 800);
        });
    }

    // Dropdown do Perfil
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("show");
        });
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".profile-menu")) profileDropdown.classList.remove("show");
        });
    }

    // Troca de perfil via dropdown
    document.querySelectorAll('.profile-item a[data-perfil]').forEach(link => {
        link.addEventListener('click', function(e) {
            const newPerfil = this.getAttribute('data-perfil');
            if (newPerfil) {
                e.preventDefault();
                triggerLoader(() => {
                    localStorage.setItem("perfil", newPerfil);
                    updateProfileAvatar(newPerfil);
                    if (profileDropdown) profileDropdown.classList.remove("show");
                }, 1500);
            }
        });
    });
});