// Diet Data from PDF
const DIET_LIST = [
    {
        date: "11.05",
        day: "Pazartesi",
        breakfast: "2 yumurtalı sade omlet + 5 adet zeytin + 2 adet karabuğday patlağı + söğüş sebze ve yeşillik + açık çay",
        snack: "1 adet orta boy meyve üzerine 1 tatlı kaşığı tahin ve bol tarçın + 5 adet çiğ badem",
        dinner: "SINIRSIZ KABAK ÇORBA - salatasız"
    },
    {
        date: "12.05",
        day: "Salı",
        breakfast: "30 gr peynir + 2 tam ceviz + 5 adet zeytin + 1-2 adet taze közlenmiş kapya biber + 2 adet karabuğday patlağı + söğüş sebze ve yeşillik + açık çay",
        snack: "3 adet kuru kayısı veya kuru hurma + 10 adet çiğ fındık",
        dinner: "SINIRSIZ KABAK ÇORBA - salatasız"
    },
    {
        date: "13.05",
        day: "Çarşamba",
        breakfast: "3 yemek kaşığı yoğurt + 3 yemek kaşığı granola/yulaf + ½ adet meyve + 5 adet çiğ badem veya çiğ fındık + 1 çay kaşığı tarçın ve kakao + 1'er tatlı kaşığı chia ve keten tohumu",
        snack: "4 adet esmer kepekli grisini + 2 tam ceviz",
        dinner: "Tonbalığı / 150 gr ızgara-fırında balık + mevsim salata"
    },
    {
        date: "14.05",
        day: "Perşembe",
        breakfast: "1 adet haşlanmış yumurta, yeşillik ve 5 adet zeytin ile yapılmış yumurta salatası + 1 yemek kaşığı zeytinyağı, limon + 2 adet karabuğday patlağı + açık çay",
        snack: "1 adet orta boy meyve + 10 adet çiğ fındık",
        dinner: "6 yemek kaşığı sebze yemeği (istediğiniz sebze) + mevsim salata"
    },
    {
        date: "15.05",
        day: "Cuma",
        breakfast: "2 tekerlek dilim ananas + 10 adet çiğ badem",
        snack: "2 adet karabuğday patlağı + 30 gr peynir veya 2 tatlı kaşığı labne peynir + yeşillik, salatalık, kapya biber",
        dinner: "4 adet köfte + mevsim salata"
    },
    {
        date: "16.05",
        day: "Cumartesi",
        breakfast: "4 yemek kaşığı lor ve 2-3 yemek kaşığı kuru üzüm eklenmiş bol yeşillikli kahvaltı salatası + limon ve 1 yemek kaşığı zeytinyağı + 2 adet karabuğday patlağı + açık çay",
        snack: "2 tekerlek dilim ananas + 2 tam ceviz",
        dinner: "6 yemek kaşığı sebze yemeği (istediğiniz sebze) + mevsim salata"
    },
    {
        date: "17.05",
        day: "Pazar",
        breakfast: "1 yumurtalı bol sebzeli menemen + 5 adet zeytin + 1 tam ceviz + 2 adet karabuğday patlağı + domates, salatalık, biber + açık çay",
        snack: "1 paket züber bar / fellas kuruyemiş bar",
        dinner: "5 yemek kaşığı haşlanmış yeşil mercimek veya nohut eklenmiş renkli salata"
    },
    {
        date: "18.05",
        day: "Pazartesi",
        breakfast: "1 yumurtalı omlet + 5 adet zeytin veya ½ adet avokado + 2 tam ceviz + 2 adet karabuğday patlağı + açık çay",
        snack: "4 adet esmer kepekli grisini + 5-6 adet çiğ fındık",
        dinner: "2 parça ızgara tavuk/hindi göğüs (120-150 gr) + mevsim salata"
    },
    {
        date: "19.05",
        day: "Salı",
        breakfast: "2 tepeleme tatlı kaşığı labne peynir + ½ adet avokado + 2 tam ceviz ve dereotunu ezip sos yapalım. 2 adet karabuğday patlağı üzerine sürelim. Bol domates, salatalık, biber ve yeşillik + açık çay",
        snack: "3 adet hurma + 10 adet çiğ badem",
        dinner: "6 yemek kaşığı mantar sote + mevsim salata"
    },
    {
        date: "20.05",
        day: "Çarşamba",
        breakfast: "2 adet haşlanmış yumurta + bol maydanoz, roka, kapya biber + 10 adet zeytin + 1 adet karabuğday patlağı + açık çay",
        snack: "1 adet havuç + 2 tam ceviz",
        dinner: "3 yemek kaşığı yoğurt + 1 adet küçük boy meyve + 1 yemek kaşığı granola/yulaf + 1 çay kaşığı tarçın + 5 adet çiğ badem veya çiğ fındık"
    }
];

// Storage Helper
const storage = {
    get: (key, fallback) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch (e) {
            console.warn("LocalStorage access failed:", e);
            return fallback;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn("LocalStorage saving failed:", e);
        }
    }
};

// State Management
const state = {
    currentTab: 'dashboard',
    user: storage.get('diyet_user', { height: '', weight: '', targetWeight: '', gender: 'female', theme: 'theme-default' }),
    water: storage.get('diyet_water', { date: new Date().toLocaleDateString(), count: 0 }),
    logs: storage.get('diyet_logs', [])
};

// Apply theme on load
function applyTheme(themeName) {
    document.body.className = themeName;
}
applyTheme(state.user.theme);

// Reset water if it's a new day
if (state.water.date !== new Date().toLocaleDateString()) {
    state.water = { date: new Date().toLocaleDateString(), count: 0 };
    storage.set('diyet_water', state.water);
}

// UI Elements
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');
const currentDateEl = document.getElementById('current-date');
const modalContainer = document.getElementById('modal-container');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');

// Initialize
// PWA Installation
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('install-btn');
    if (installBtn) installBtn.classList.remove('hidden');
});

// For iOS detection
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

function init() {
    if (!mainContent) return;
    updateDateDisplay();
    renderTab(state.currentTab);
    setupEventListeners();
    registerServiceWorker();

    // Show install button for iOS if not already standalone
    const installBtn = document.getElementById('install-btn');
    if (isIOS && !isStandalone && installBtn) {
        installBtn.classList.remove('hidden');
    }

    // Header Actions
    if (installBtn) {
        installBtn.addEventListener('click', handleInstall);
    }

    document.getElementById('theme-toggle-btn').addEventListener('click', () => {
        document.getElementById('theme-menu').classList.toggle('hidden');
    });

    document.getElementById('info-btn').addEventListener('click', showInfo);
    
    closeModal.addEventListener('click', () => {
        modalContainer.classList.add('hidden');
    });

    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) modalContainer.classList.add('hidden');
    });
}

function handleInstall() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                document.getElementById('install-btn').classList.add('hidden');
            }
            deferredPrompt = null;
        });
    } else if (isIOS) {
        showIOSInstallGuide();
    }
}

function showIOSInstallGuide() {
    modalBody.innerHTML = `
        <div class="ios-install-guide">
            <div class="guide-icon">
                <i class="ph ph-device-mobile-speaker"></i>
            </div>
            <h2>Ana Ekrana Ekle</h2>
            <p>Bu uygulamayı telefonuna yüklemek için:</p>
            <div class="steps">
                <div class="step">
                    <span class="num">1</span>
                    <p>Tarayıcı altındaki <strong>Paylaş <i class="ph ph-export"></i></strong> butonuna dokun.</p>
                </div>
                <div class="step">
                    <span class="num">2</span>
                    <p>Açılan menüde aşağı kaydırıp <strong>Ana Ekrana Ekle <i class="ph ph-plus-square"></i></strong> seçeneğini seç.</p>
                </div>
            </div>
            <button class="btn-primary" onclick="document.getElementById('modal-container').classList.add('hidden')" style="margin-top:20px">Anladım</button>
        </div>
    `;
    modalContainer.classList.remove('hidden');
}

function showInfo() {
    modalBody.innerHTML = `
        <h2>Hakkında</h2>
        <p>Bu uygulama, Uzm. Dyt. Elif Gizem Yılmaz'ın Aralıklı Oruç ve Detoks programı esas alınarak hazırlanmıştır.</p>
        
        <div style="text-align:left; background:var(--bg-color); padding:15px; border-radius:15px; margin-top:15px">
            <strong style="display:block; margin-bottom:10px; color:var(--primary-dark)">📌 Günlük Kurallar:</strong>
            <ul style="font-size:13px; color:var(--text-color); padding-left:20px">
                <li>Akşam yemeğinden sonra kesinlikle bir şey yenmemelidir.</li>
                <li>Günde en az 3 litre su içilmelidir.</li>
                <li>Kahve günde max 2 fincan (sade) olmalıdır.</li>
                <li>Bitki çayları (rezene, melisa, papatya) serbesttir.</li>
                <li>Her gün 1 adet sade maden suyu içilebilir.</li>
            </ul>
        </div>
        <p style="font-weight:600; color:var(--primary-dark); margin-top:15px">Sağlıklı günler dileriz!</p>
        
        <div class="developer-credit-modal">
            <a href="https://fatihpatir.github.io/web" target="_blank">
                <i class="ph ph-code"></i> Fatih PATIR tarafından geliştirildi
            </a>
        </div>
    `;
    modalContainer.classList.remove('hidden');
}

function updateDateDisplay() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateEl.innerText = new Date().toLocaleDateString('tr-TR', options);
}

function setupEventListeners() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.getAttribute('data-tab');
            switchTab(tab);
        });
    });
}

function switchTab(tab) {
    state.currentTab = tab;
    navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-tab') === tab);
    });
    renderTab(tab);
}

function renderTab(tab) {
    mainContent.innerHTML = '';
    
    switch (tab) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'diet':
            renderDietList();
            break;
        case 'stats':
            renderStats();
            break;
        case 'profile':
            renderProfile();
            break;
    }
}

// Global Actions
window.addWater = (amount) => {
    state.water.count = Math.min(3500, Math.max(0, state.water.count + amount));
    storage.set('diyet_water', state.water);
    renderTab('dashboard'); // Refresh UI
};

window.copySummary = () => {
    if (state.logs.length === 0) {
        alert("Henüz kilo kaydı bulunmuyor.");
        return;
    }

    // Improved robust sorting
    const sortedLogs = [...state.logs].sort((a, b) => {
        const d1 = new Date(a.raw || '1970-01-01').getTime();
        const d2 = new Date(b.raw || '1970-01-01').getTime();
        return d1 - d2;
    });
    const latestLog = sortedLogs[sortedLogs.length - 1];
    
    const text = `📊 Diyet Özeti (${latestLog.date})\n💧 Su: ${(state.water.count / 1000).toFixed(2)}L\n⚖️ Kilo: ${latestLog.weight}kg${latestLog.note ? `\n📝 Not: ${latestLog.note}` : ''}\n\n#DiyetAsistanım #SağlıklıYaşam`;
    
    modalBody.innerHTML = `
        <div class="share-preview-box">
            <h2><i class="ph ph-eye"></i> Paylaşım Önizleme</h2>
            <div class="preview-text-area">
                ${text.replace(/\n/g, '<br>')}
            </div>
            <p style="font-size:12px; color:var(--text-light); margin-top:15px">Bu metin panoya kopyalanacak.</p>
            <button class="btn-primary" id="confirm-share-btn" style="margin-top:15px">
                <i class="ph ph-copy"></i> Kopyala ve Paylaş
            </button>
        </div>
    `;
    modalContainer.classList.remove('hidden');

    document.getElementById('confirm-share-btn').onclick = () => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Özet panoya kopyalandı! İstediğin yerde paylaşabilirsin.');
            modalContainer.classList.add('hidden');
        });
    };
};

// --- Dashboard ---
function renderDashboard() {
    const hours = new Date().getHours();
    const now = new Date();
    const todayStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}`;
    const todayDiet = DIET_LIST.find(item => item.date === todayStr) || DIET_LIST[0];

    let activeMeal = '';
    let mealIcon = 'ph-sun';
    let mealName = 'Kahvaltı';
    if (hours >= 10 && hours < 12) { activeMeal = 'breakfast'; mealIcon = 'ph-sun'; mealName = 'Kahvaltı'; }
    else if (hours >= 14 && hours < 15) { activeMeal = 'snack'; mealIcon = 'ph-cookie'; mealName = 'Ara Öğün'; }
    else if (hours >= 17 && hours < 19) { activeMeal = 'dinner'; mealIcon = 'ph-moon'; mealName = 'Akşam Yemeği'; }
    else if (hours >= 19 || hours < 10) { mealName = 'Oruç / Dinlenme'; mealIcon = 'ph-zzz'; }

    const goalReached = state.water.count >= 3000;
    const waterPercent = Math.min(100, (state.water.count / 3000) * 100);

    const quotes = [
        "Başlamak için mükemmel olmana gerek yok, ama mükemmel olmak için başlaman gerek.",
        "Sağlıklı yaşam bir varış noktası değil, bir yolculuktur.",
        "Vücudun senin tek gerçek evin, ona iyi bak.",
        "Bugün yaptığın seçimler, yarınki seni oluşturur.",
        "Zorluklar seni durdurmak için değil, güçlendirmek için vardır."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const remaining = Math.max(0, 3.5 - (state.water.count / 1000)).toFixed(1);

    const dashboardHTML = `
        <div class="dashboard-top-section">
            <div class="card water-card-horizontal">
                <div class="horizontal-bar-container">
                    <div class="bar-fill-horizontal" style="width: ${waterPercent}%"></div>
                    <div class="bar-info-overlay">
                        <i class="ph ph-drop-fill"></i>
                        <div class="bar-text-group">
                            <strong>${(state.water.count / 1000).toFixed(1)}L</strong>
                            <span class="remaining-tag">Kalan: ${remaining}L</span>
                        </div>
                    </div>
                </div>
                
                <div class="water-grid-actions">
                    <button class="water-btn-mini" id="add-200">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 3L5.5 21H18.5L17 3H7Z"/></svg>
                        <span>200ml</span>
                    </button>
                    <button class="water-btn-mini" id="add-500">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2V5H14V2H10Z"/><path d="M9 5C9 5 7 7 7 10V20C7 21.1 7.9 22 9 22H15C16.1 22 17 21.1 17 20V10C17 7 15 5 15 5H9Z"/></svg>
                        <span>500ml</span>
                    </button>
                    <button class="water-btn-mini" id="add-1000">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2H14V5H10V2Z"/><path d="M8 5H16V8C16 10 18 12 18 15V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V15C6 12 8 10 8 8V5Z"/></svg>
                        <span>1 Lt</span>
                    </button>
                    <button class="btn-undo-circle" id="undo-water">
                        <i class="ph ph-arrow-u-up-left"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="card today-menu-card">
            <div class="card-header-main">
                <h2><i class="ph ph-calendar-check"></i> Bugünün Menüsü</h2>
                <span class="date-badge">${todayDiet.date}</span>
            </div>
            <div class="today-diet-list">
                <div class="today-item">
                    <div class="item-icon-circle" style="background: #eef7ee; color: #88af8f;"><i class="ph ph-sun"></i></div>
                    <div class="text"><strong>Kahvaltı:</strong> ${todayDiet.breakfast}</div>
                </div>
                <div class="today-item">
                    <div class="item-icon-circle" style="background: #fff4e5; color: #f7d8ba;"><i class="ph ph-cookie"></i></div>
                    <div class="text"><strong>Ara Öğün:</strong> ${todayDiet.snack}</div>
                </div>
                <div class="today-item">
                    <div class="item-icon-circle" style="background: #fbeeee; color: #e59898;"><i class="ph ph-moon"></i></div>
                    <div class="text"><strong>Akşam:</strong> ${todayDiet.dinner}</div>
                </div>
            </div>
        </div>

        <div class="card quote-card" style="background: var(--accent-color); border: none; padding: 20px;">
            <p style="font-style: italic; font-size: 13px; text-align: center; color: var(--text-color);">"${randomQuote}"</p>
        </div>

        <div class="share-container">
            <button class="share-pill-btn" id="copy-summary-btn">
                <i class="ph ph-share-network"></i> Özetini Paylaş
            </button>
        </div>
    `;
    mainContent.innerHTML = dashboardHTML;

    // Event Listeners for dashboard elements
    document.getElementById('add-200').addEventListener('click', () => window.addWater(200));
    document.getElementById('add-500').addEventListener('click', () => window.addWater(500));
    document.getElementById('add-1000').addEventListener('click', () => window.addWater(1000));
    document.getElementById('undo-water').addEventListener('click', () => window.addWater(-200));
    document.getElementById('copy-summary-btn').addEventListener('click', window.copySummary);
}

// --- Diet List ---
function renderDietList() {
    const now = new Date();
    const todayStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    let dietHTML = `<h2><i class="ph ph-broccoli"></i> 10 Günlük Detoks</h2>`;
    
    DIET_LIST.forEach((item, index) => {
        const isToday = item.date === todayStr;
        dietHTML += `
            <div class="card diet-day-card ${isToday ? 'today expanded' : ''}" id="diet-day-${index}" onclick="this.classList.toggle('expanded')">
                <div class="diet-day-header">
                    <h3>${item.date} - ${item.day} ${isToday ? '<span class="today-tag">BUGÜN</span>' : ''}</h3>
                    <i class="ph ph-caret-down"></i>
                </div>
                <div class="diet-details">
                    <div class="meal-detail-row">
                        <i class="ph ph-sun" style="color:#88af8f"></i>
                        <p><strong>Kahvaltı:</strong> ${item.breakfast}</p>
                    </div>
                    <div class="meal-detail-row">
                        <i class="ph ph-cookie" style="color:#f7d8ba"></i>
                        <p><strong>Ara Öğün:</strong> ${item.snack}</p>
                    </div>
                    <div class="meal-detail-row">
                        <i class="ph ph-moon" style="color:#e59898"></i>
                        <p><strong>Akşam:</strong> ${item.dinner}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    mainContent.innerHTML = dietHTML;

    // Scroll to today if it exists
    if (document.querySelector('.diet-day-card.today')) {
        setTimeout(() => {
            document.querySelector('.diet-day-card.today').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

// --- Stats / Daily Log ---
let weightChart = null;

function renderStats() {
    const statsHTML = `
        <div class="card">
            <h2><i class="ph ph-chart-line-up"></i> Gelişim Grafiği</h2>
            <div class="chart-container" style="position: relative; height:200px; width:100%">
                <canvas id="weightChartCanvas"></canvas>
            </div>
        </div>

        <div class="card">
            <h2><i class="ph ph-note-pencil"></i> Kilo Kaydı</h2>
            <div class="input-row-complex">
                <input type="date" id="log-date" class="input-minimal" value="${new Date().toISOString().split('T')[0]}">
                <input type="number" id="daily-weight" step="0.1" placeholder="Kg" class="input-minimal">
                <button class="btn-primary-small" id="save-log">Kaydet</button>
            </div>
        </div>

        <div id="logs-list" class="logs-list-container">
            ${renderLogs()}
        </div>
    `;
    mainContent.innerHTML = statsHTML;

    document.getElementById('save-log').addEventListener('click', saveLog);
    renderWeightChart();
}

function renderWeightChart() {
    const ctx = document.getElementById('weightChartCanvas');
    if (!ctx) return;

    // Sort logs by date (newest first for your specific R-to-L request)
    const sortedLogs = [...state.logs].sort((a, b) => new Date(b.raw || '2000-01-01') - new Date(a.raw || '2000-01-01'));
    
    const labels = sortedLogs.map(l => l.date);
    const data = sortedLogs.map(l => l.weight);

    if (weightChart) weightChart.destroy();

    weightChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Kilo Progress',
                data: data,
                borderColor: '#88af8f',
                backgroundColor: 'rgba(136, 175, 143, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#88af8f',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: false, grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });
}

function saveLog() {
    const weightInput = document.getElementById('daily-weight');
    const dateInput = document.getElementById('log-date');
    const weight = weightInput.value;
    const rawDate = dateInput.value;
    
    if (!weight || !rawDate) return alert('Lütfen bilgileri girin.');

    // Format date as DD.MM
    const dateObj = new Date(rawDate);
    const dateStr = dateObj.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' });
    
    // Check if entry for this date exists
    const existingIndex = state.logs.findIndex(l => l.date === dateStr);
    if (existingIndex > -1) {
        state.logs[existingIndex].weight = weight;
        state.logs[existingIndex].raw = rawDate; // Make sure the raw date is also updated!
    } else {
        state.logs.push({ date: dateStr, weight, note: '', raw: rawDate });
    }

    // Sort logs by date (newest first for list, oldest first for chart)
    state.logs.sort((a, b) => new Date(b.raw || '2000-01-01') - new Date(a.raw || '2000-01-01'));

    storage.set('diyet_logs', state.logs);
    
    // Surgical update instead of full re-render
    const logsList = document.getElementById('logs-list');
    if (logsList) logsList.innerHTML = renderLogs();
    renderWeightChart();
    
    // Clear weight input but keep the date for convenience
    weightInput.value = '';
    
    // Small feedback
    const saveBtn = document.getElementById('save-log');
    const originalText = saveBtn.innerText;
    saveBtn.innerText = 'Kaydedildi!';
    saveBtn.style.background = 'var(--primary-dark)';
    setTimeout(() => {
        saveBtn.innerText = originalText;
        saveBtn.style.background = '';
    }, 1500);
}

window.editLog = (index) => {
    const newWeight = prompt("Yeni kiloyu girin:", state.logs[index].weight);
    if (newWeight !== null && !isNaN(newWeight)) {
        state.logs[index].weight = newWeight;
        storage.set('diyet_logs', state.logs);
        renderTab('stats');
    }
};

window.deleteLog = (index) => {
    if (confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
        state.logs.splice(index, 1);
        storage.set('diyet_logs', state.logs);
        renderTab('stats');
    }
};

function renderLogs() {
    if (state.logs.length === 0) return '<p style="text-align:center; color:var(--text-light); padding:20px;">Henüz kayıt yok.</p>';
    
    return state.logs.map((log, index) => `
        <div class="log-item-card">
            <div class="log-info">
                <strong>${log.date}</strong>
                <span>${log.weight} kg</span>
            </div>
            <div class="log-actions">
                <button onclick="window.editLog(${index})"><i class="ph ph-pencil-simple"></i></button>
                <button onclick="window.deleteLog(${index})" style="color:#e57373"><i class="ph ph-trash"></i></button>
            </div>
        </div>
    `).join('');
}

// --- Profile ---
function renderProfile() {
    const profileHTML = `
        <div class="card">
            <h2><i class="ph ph-user-circle"></i> Profil Bilgileri</h2>
            
            <div class="input-group">
                <label>Cinsiyet</label>
                <div class="choice-group">
                    <button class="choice-btn ${state.user.gender === 'female' ? 'active' : ''}" onclick="window.setGender('female')">
                        <i class="ph ph-gender-female"></i> Kadın
                    </button>
                    <button class="choice-btn ${state.user.gender === 'male' ? 'active' : ''}" onclick="window.setGender('male')">
                        <i class="ph ph-gender-male"></i> Erkek
                    </button>
                </div>
            </div>

            <div class="input-group">
                <label>Boy (cm)</label>
                <input type="number" id="user-height" value="${state.user.height}" placeholder="175">
            </div>
            <div class="input-group">
                <label>Başlangıç Kilosu (kg)</label>
                <input type="number" id="user-weight" value="${state.user.weight}" placeholder="80">
            </div>
            <div class="input-group">
                <label>Hedef Kilo (kg)</label>
                <input type="number" id="user-target" value="${state.user.targetWeight}" placeholder="70">
            </div>
        </div>

        <div class="card" style="text-align:center">
            <p style="font-size:14px">Vücut Kitle İndeksi (VKİ)</p>
            <h1 style="color:var(--primary-dark); margin:10px 0">${calculateBMI()}</h1>
            <p style="font-size:12px; color:var(--text-light)">${getBMICategory()}</p>
        </div>
        
        <button class="btn-primary" id="save-profile" style="margin-bottom: 20px;">Değişiklikleri Kaydet</button>
        
        <div class="developer-credit-profile">
            <a href="https://fatihpatir.github.io/web" target="_blank">
                Fatih PATIR tarafından geliştirildi
            </a>
        </div>
    `;
    mainContent.innerHTML = profileHTML;

    document.getElementById('save-profile').addEventListener('click', saveProfile);
}

// Global functions for inline onclicks
window.setGender = (gender) => {
    state.user.gender = gender;
    renderTab('profile');
};

window.setTheme = (theme) => {
    state.user.theme = theme;
    applyTheme(theme);
    document.getElementById('theme-menu').classList.add('hidden');
    renderTab(state.currentTab);
};

function saveProfile() {
    state.user.height = document.getElementById('user-height').value;
    state.user.weight = document.getElementById('user-weight').value;
    state.user.targetWeight = document.getElementById('user-target').value;
    
    storage.set('diyet_user', state.user);
    alert('Profiliniz kaydedildi!');
}

function calculateBMI() {
    if (!state.user.height || !state.user.weight) return '--';
    const heightInMeters = state.user.height / 100;
    return (state.user.weight / (heightInMeters * heightInMeters)).toFixed(1);
}

function getBMICategory() {
    const bmi = calculateBMI();
    if (bmi === '--') return 'Bilgi eksik';
    if (bmi < 18.5) return 'Zayıf';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Fazla Kilolu';
    return 'Obez';
}

// Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker Registered'))
            .catch(err => console.log('SW Registration Failed', err));
    }
}

init();
