/**
 * Anuncios Santo Domingo - Módulo JS Principal
 * Manejo de LocalStorage, Avisos, Filtros, Modales y Notificaciones
 */

// Base de Datos Semilla de Avisos Realistas de Huánuco y Santo Domingo
const defaultAds = [
    {
        id: "seed-1",
        categoria: "empleo",
        distrito: "Huánuco Centro",
        titulo: "SE NECESITA MOTORIZADO PARA DELIVERY",
        descripcion: "De preferencia joven proactivo para reparto a domicilio en pollería céntrica. Horario de 3:00 PM a 11:00 PM. Trato directo, buena comisión. Razón Jr. 2 de Mayo N° 435.",
        telefono: "994385288",
        pin: "1234",
        color: "celeste",
        creado_en: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
        id: "seed-2",
        categoria: "alquiler",
        distrito: "Pillco Marca",
        titulo: "SE ALQUILA CUARTOS DE ESTRENO",
        descripcion: "Habitaciones cómodas con baño propio. Acabados modernos, excelente iluminación. Ubicado en Pasaje Los Girasoles, Pillco Marca. Referencia: Altura de Calle Los Ficus.",
        telefono: "948912502",
        pin: "1234",
        color: "verde",
        creado_en: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
    },
    {
        id: "seed-3",
        categoria: "alquiler",
        distrito: "Amarilis",
        titulo: "ALQUILO DEPARTAMENTO AMPLIO",
        descripcion: "Ubicado estratégicamente en el primer piso con fácil acceso. Jr. José Olaya N° 220 frente a EsSalud - Paucarbamba. Cuenta con sala, cocina, 2 habitaciones grandes.",
        telefono: "949900727",
        pin: "1234",
        color: "amarillo",
        creado_en: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    },
    {
        id: "seed-4",
        categoria: "empleo",
        distrito: "Otros",
        titulo: "SE NECESITA UNA SEÑORITA",
        descripcion: "Para trabajar como ayudante en recreo campestre a las afueras de la ciudad. Con o sin experiencia en atención al cliente. Se brinda almuerzo.",
        telefono: "978953505",
        pin: "1234",
        color: "rosado",
        creado_en: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
        id: "seed-5",
        categoria: "empleo",
        distrito: "Huánuco Centro",
        titulo: "NECESITO REMALLADORES URGENTE",
        descripcion: "Con experiencia demostrable en costura y ensamble de prendas. Trabajo inmediato a destajo en taller de confección. Razón Jr. Pachacutec N° 204.",
        telefono: "927236450",
        pin: "1234",
        color: "celeste",
        creado_en: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString()
    },
    {
        id: "seed-6",
        categoria: "alquiler",
        distrito: "Pillco Marca",
        titulo: "SE VENDE CASA CON TERRENO",
        descripcion: "Ocasión especial por viaje, terreno total de 252 mt2 listo para construir o habitar. Todos los documentos en regla. Contacto directo.",
        telefono: "964248432",
        pin: "1234",
        color: "amarillo",
        creado_en: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    }
];

let anuncios = [];
let currentFilterCategory = 'todos';

// Inicializador global
function initApp() {
    const stored = localStorage.getItem('tablerovecino_ads');
    if (stored) {
        anuncios = JSON.parse(stored);
    } else {
        anuncios = [...defaultAds];
        localStorage.setItem('tablerovecino_ads', JSON.stringify(anuncios));
    }

    // Actualizar contadores en páginas si existen los elementos
    updateCounters();

    // Si estamos en la página de avisos (avisos.html)
    if (document.getElementById('flyers-grid')) {
        applyFilters();
    }

    // Si estamos en la página de inicio (index.html)
    if (document.getElementById('recent-ads-grid')) {
        renderRecentAds('recent-ads-grid', 6);
    }

    if (document.getElementById('label-opt-empleo')) {
        updateFormAesthetics('empleo');
    }
}

document.addEventListener('DOMContentLoaded', initApp);

// --- TOAST NOTIFICATIONS ---
function showToast(text, type = 'info') {
    const toast = document.getElementById('toast-msg');
    if (!toast) return;
    const toastText = document.getElementById('toast-text');
    const toastIcon = document.getElementById('toast-icon');
    
    toastText.textContent = text;
    
    if (type === 'error') {
        toastIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-rose-500"></i>';
    } else if (type === 'success') {
        toastIcon.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i>';
    } else {
        toastIcon.innerHTML = '<i class="fa-solid fa-circle-info text-amber-400"></i>';
    }

    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.remove('translate-y-10'), 50);

    setTimeout(() => {
        toast.classList.add('translate-y-10');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 4000);
}

// --- CONTADORES ---
function updateCounters() {
    const emps = anuncios.filter(a => a.categoria === 'empleo').length;
    const alqs = anuncios.filter(a => a.categoria === 'alquiler').length;
    
    const jobCount = document.getElementById('job-count');
    const rentCount = document.getElementById('rent-count');
    const heroJobCount = document.getElementById('hero-job-count');
    const heroRentCount = document.getElementById('hero-rent-count');
    
    if (jobCount) jobCount.textContent = emps;
    if (rentCount) rentCount.textContent = alqs;
    if (heroJobCount) heroJobCount.textContent = emps;
    if (heroRentCount) heroRentCount.textContent = alqs;
}

// --- FORMATO DE FECHA ---
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
        return `Hace ${diffMins < 1 ? 'unos instantes' : `${diffMins} min`}`;
    } else if (diffHours < 24) {
        return `Hace ${diffHours} h`;
    } else if (diffDays === 1) {
        return 'Ayer';
    } else {
        return `Hace ${diffDays} días`;
    }
}

// --- COMPONENTE DE TARJETA ---
function createFlyerHTML(ad) {
    let bgClass = 'bg-sky-100 border-sky-300';
    if (ad.color === 'amarillo') bgClass = 'bg-amber-100 border-amber-300';
    else if (ad.color === 'verde') bgClass = 'bg-emerald-100 border-emerald-300';
    else if (ad.color === 'rosado') bgClass = 'bg-pink-100 border-pink-300';

    const rotations = ['rotate-1', '-rotate-1', 'rotate-0', 'rotate-0.5', '-rotate-0.5'];
    const rotIndex = Math.abs(ad.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % rotations.length;
    const rotationClass = rotations[rotIndex];

    return `
        <div class="relative ${bgClass} border-2 rounded-2xl p-6 shadow-lg transform hover:-translate-y-1.5 hover:rotate-0 hover:scale-[1.02] transition duration-300 flex flex-col justify-between pin-effect ${rotationClass} min-h-[320px]">
            <div>
                <div class="flex justify-between items-start gap-2 mb-3 mt-1">
                    <span class="bg-indigo-950/10 text-indigo-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        ${ad.distrito}
                    </span>
                    <span class="text-[10px] text-slate-500 font-bold">
                        ${formatDate(ad.creado_en)}
                    </span>
                </div>

                <h4 class="flyer-font font-black text-xl sm:text-2xl tracking-tight text-slate-900 leading-none uppercase text-center mb-4 break-words">
                    ${ad.titulo}
                </h4>
                
                <hr class="border-t border-slate-900/10 mb-4">
                
                <p class="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-line mb-6">
                    ${ad.descripcion}
                </p>
            </div>

            <div class="space-y-3 pt-3 border-t border-slate-900/10">
                <div class="text-center">
                    <span class="text-[10px] uppercase font-black text-slate-600 block">Llamar directo:</span>
                    <a href="tel:${ad.telefono}" class="flyer-font text-2xl font-black text-red-600 hover:underline tracking-wider">
                        CEL: ${ad.telefono}
                    </a>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <a href="https://wa.me/51${ad.telefono}?text=Hola!%20Vi%20tu%20anuncio%20de%20%22${encodeURIComponent(ad.titulo)}%22%20en%20Anuncios%20Santo%20Domingo." 
                       target="_blank" 
                       class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition active:scale-95">
                        <i class="fa-brands fa-whatsapp text-sm"></i> WhatsApp
                    </a>
                    <a href="tel:${ad.telefono}" 
                       class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition active:scale-95">
                        <i class="fa-solid fa-phone text-xs"></i> Llamar
                    </a>
                </div>

                <div class="text-center pt-1">
                    <button onclick="openDeleteModal('${ad.id}')" class="text-[10px] text-slate-500 hover:text-rose-600 font-bold transition">
                        <i class="fa-regular fa-trash-can mr-1"></i> Retirar Anuncio
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render para Avisos Recientes (Home)
function renderRecentAds(containerId, limit = 6) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = '';

    const recent = [...anuncios].sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en)).slice(0, limit);
    recent.forEach(ad => {
        grid.innerHTML += createFlyerHTML(ad);
    });
}

// Render para Pizarra Completa con Filtros (avisos.html)
function filterCategory(category) {
    currentFilterCategory = category;
    const btns = {
        todos: document.getElementById('btn-cat-todos'),
        empleo: document.getElementById('btn-cat-empleo'),
        alquiler: document.getElementById('btn-cat-alquiler')
    };

    Object.keys(btns).forEach(key => {
        if (!btns[key]) return;
        if (key === category) {
            btns[key].className = "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition duration-200 bg-indigo-600 text-white border-indigo-600 shadow-sm";
        } else {
            btns[key].className = "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition duration-200 bg-white text-slate-700 border-slate-200 hover:bg-slate-50";
        }
    });

    applyFilters();
}

function applyFilters() {
    const searchInput = document.getElementById('search-input');
    const districtSelect = document.getElementById('district-select');
    const grid = document.getElementById('flyers-grid');
    const emptyState = document.getElementById('empty-state');

    if (!grid) return;

    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const districtFilter = districtSelect ? districtSelect.value : 'todos';

    const filtered = anuncios.filter(ad => {
        if (currentFilterCategory !== 'todos' && ad.categoria !== currentFilterCategory) return false;
        if (districtFilter !== 'todos' && ad.distrito !== districtFilter) return false;
        if (searchQuery) {
            return ad.titulo.toLowerCase().includes(searchQuery) ||
                   ad.descripcion.toLowerCase().includes(searchQuery) ||
                   ad.telefono.includes(searchQuery);
        }
        return true;
    });

    filtered.sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en));

    grid.innerHTML = '';
    if (filtered.length === 0) {
        if (emptyState) {
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
        }
    } else {
        if (emptyState) {
            emptyState.classList.add('hidden');
            emptyState.classList.remove('flex');
        }
        filtered.forEach(ad => {
            grid.innerHTML += createFlyerHTML(ad);
        });
    }

    updateCounters();
}

// Búsqueda directa desde el Home
function performHomeSearch(event) {
    if (event) event.preventDefault();
    const query = document.getElementById('home-search-input')?.value || '';
    const district = document.getElementById('home-district-select')?.value || 'todos';
    
    // Redirigir a avisos.html pasando parámetros en la URL
    window.location.href = `avisos.html?q=${encodeURIComponent(query)}&distrito=${encodeURIComponent(district)}`;
}

// Leer parámetros de URL si venimos del Home
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    const d = urlParams.get('distrito');

    const searchInput = document.getElementById('search-input');
    const districtSelect = document.getElementById('district-select');

    if (q && searchInput) searchInput.value = q;
    if (d && districtSelect) districtSelect.value = d;

    if (q || d) applyFilters();
}

if (window.location.pathname.includes('avisos.html')) {
    window.addEventListener('load', checkUrlParams);
}

// --- MENÚ MÓVIL ---
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.add('hidden');
}

// --- CONTROLADORES DE MODALES ---
function openPublishModal() {
    const modal = document.getElementById('publish-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}
function closePublishModal() {
    const modal = document.getElementById('publish-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        const form = document.getElementById('publish-form');
        if (form) form.reset();
    }
}

function openLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}
function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

function openRegisterModal() {
    const modal = document.getElementById('register-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}
function closeRegisterModal() {
    const modal = document.getElementById('register-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

function openDeleteModal(adId) {
    const adInput = document.getElementById('delete-ad-id');
    const modal = document.getElementById('delete-modal');
    if (adInput && modal) {
        adInput.value = adId;
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}
function closeDeleteModal() {
    const modal = document.getElementById('delete-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        const pinInput = document.getElementById('delete-pin-input');
        if (pinInput) pinInput.value = '';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

// --- SUBMITS ---
function handlePublishSubmit(event) {
    event.preventDefault();
    const category = document.querySelector('input[name="opt-category"]:checked').value;
    const district = document.getElementById('form-district').value;
    const title = document.getElementById('form-title').value.toUpperCase().trim();
    const desc = document.getElementById('form-desc').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const pin = document.getElementById('form-pin').value.trim();
    const color = document.querySelector('input[name="opt-color"]:checked').value;

    if (!district) {
        showToast("Selecciona un distrito válido.", "error");
        return;
    }

    const newAd = {
        id: 'ad-' + Date.now(),
        categoria: category,
        distrito: district,
        titulo: title,
        descripcion: desc,
        telefono: phone,
        pin: pin,
        color: color,
        creado_en: new Date().toISOString()
    };

    anuncios.unshift(newAd);
    localStorage.setItem('tablerovecino_ads', JSON.stringify(anuncios));

    if (document.getElementById('flyers-grid')) applyFilters();
    if (document.getElementById('recent-ads-grid')) renderRecentAds('recent-ads-grid', 6);

    closePublishModal();

    const displayPin = document.getElementById('display-saved-pin');
    const successModal = document.getElementById('success-modal');
    if (displayPin) displayPin.textContent = pin;
    if (successModal) {
        successModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
    showToast("¡Anuncio colgado con éxito!", "success");
}

function handleDeleteSubmit(event) {
    event.preventDefault();
    const adId = document.getElementById('delete-ad-id').value;
    const enteredPin = document.getElementById('delete-pin-input').value.trim();

    const adIndex = anuncios.findIndex(ad => ad.id === adId);
    if (adIndex === -1) {
        showToast("Anuncio no encontrado.", "error");
        closeDeleteModal();
        return;
    }

    if (enteredPin === anuncios[adIndex].pin) {
        anuncios.splice(adIndex, 1);
        localStorage.setItem('tablerovecino_ads', JSON.stringify(anuncios));
        if (document.getElementById('flyers-grid')) applyFilters();
        if (document.getElementById('recent-ads-grid')) renderRecentAds('recent-ads-grid', 6);
        closeDeleteModal();
        showToast("El anuncio ha sido retirado de la pizarra.", "success");
    } else {
        showToast("El PIN de retiro es incorrecto.", "error");
    }
}

function handleLoginSubmit(event) {
    event.preventDefault();
    closeLoginModal();
    showToast("¡Sesión iniciada correctamente!", "success");
}

function handleRegisterSubmit(event) {
    event.preventDefault();
    closeRegisterModal();
    showToast("¡Cuenta de anunciante creada con éxito!", "success");
}

function handleContactSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    if (form) form.reset();
    showToast("Mensaje enviado al equipo de soporte.", "success");
}

function updateFormAesthetics(category) {
    const lblEmpleo = document.getElementById('label-opt-empleo');
    const lblAlquiler = document.getElementById('label-opt-alquiler');
    const titleInput = document.getElementById('form-title');
    const descInput = document.getElementById('form-desc');

    if (!lblEmpleo || !lblAlquiler) return;

    if (category === 'empleo') {
        lblEmpleo.classList.add('border-indigo-600', 'bg-indigo-50/50');
        lblAlquiler.classList.remove('border-indigo-600', 'bg-indigo-50/50');
        if (titleInput) titleInput.placeholder = "ej. SE NECESITA MESERA O AYUDANTE";
        if (descInput) descInput.placeholder = "Describe los requisitos, horarios y sueldo aproximado para el puesto.";
    } else {
        lblAlquiler.classList.add('border-indigo-600', 'bg-indigo-50/50');
        lblEmpleo.classList.remove('border-indigo-600', 'bg-indigo-50/50');
        if (titleInput) titleInput.placeholder = "ej. SE ALQUILA CUARTO O DEPARTAMENTO";
        if (descInput) descInput.placeholder = "Describe los servicios incluidos, baño propio/compartido y precio.";
    }
}
