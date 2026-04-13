const profileMenu = document.querySelector(".profile-menu");
const sidebarLinks = document.querySelectorAll(".sidebar__nav a");
const accountSections = document.querySelectorAll(".account-section");



const bgVideo = document.getElementById("bgVideo");
const bgVideoSource = bgVideo ? bgVideo.querySelector("source") : null;



// APLICAR TEMA E LOADER

function changeBackgroundVideo(videoPath) {
    if (bgVideo) {
        bgVideo.pause();
        if (bgVideoSource) {
            bgVideoSource.src = videoPath;
        } else {
            bgVideo.src = videoPath;
        }
        bgVideo.load();
        bgVideo.play().catch(() => {});
    }
}

function applyTheme(theme) {
    const loaderVideo = document.querySelector("#loader video");
    const currentVideoPath = theme === "light" ? videoLight : videoDark;

    // Sincroniza o vídeo do loader com o tema
    if (loaderVideo) {
        loaderVideo.src = currentVideoPath;
        loaderVideo.load();
    }

    if (theme === "light") {
        document.body.classList.add("light-mode");
        if (themeSwitch) themeSwitch.checked = true;
        if (themeIcon) themeIcon.src = iconLight;
        changeBackgroundVideo(videoLight);
    } else {
        document.body.classList.remove("light-mode");
        if (themeSwitch) themeSwitch.checked = false;
        if (themeIcon) themeIcon.src = iconDark;
        changeBackgroundVideo(videoDark);
    }
}

// Listener para o switch de tema dentro do menu de perfil
if (themeSwitch) {
    themeSwitch.addEventListener("change", () => {
        const newTheme = themeSwitch.checked ? "light" : "dark";
        
        if (loader) loader.classList.add('active');

        setTimeout(() => {
            applyTheme(newTheme);
            localStorage.setItem("theme", newTheme);
            if (loader) loader.classList.remove('active');
        }, 800);
    });
}

// Unificação da Sidebar: Troca de seção com Loader
sidebarLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const targetSection = link.dataset.section;
        if (!targetSection) return;

        if (loader) loader.classList.add("active");

        setTimeout(() => {
            sidebarLinks.forEach(item => item.classList.remove("is-active"));
            link.classList.add("is-active");

            accountSections.forEach(section => {
                section.classList.remove("is-visible");
                if (section.id === targetSection) {
                    section.classList.add("is-visible");
                }
            });

            if (loader) loader.classList.remove("active");
        }, 800); // Tempo ajustado para consistência visual
    });
});