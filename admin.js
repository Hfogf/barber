// ========== ADMIN CODE ==========
const ADMIN_CODE = '1234'; // Code d'accès admin

// ========== VÉRIFIER CODE ADMIN ==========
function verifierCodeAdmin() {
    const password = document.getElementById('admin-password').value;
    
    if (password === ADMIN_CODE) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('admin-interface').style.display = 'grid';
        sessionStorage.setItem('admin_logged', 'true');
        chargerDonnees();
    } else {
        alert('❌ Code incorrect!');
        document.getElementById('admin-password').value = '';
    }
}

// ========== VÉRIFIER SI CONNECTÉ ==========
window.addEventListener('DOMContentLoaded', function() {
    if (!sessionStorage.getItem('admin_logged')) {
        document.getElementById('admin-password').focus();
    } else {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('admin-interface').style.display = 'grid';
        chargerDonnees();
    }
});

// ========== CHARGER TOUTES LES DONNÉES ==========
function chargerDonnees() {
    afficherReservations();
    afficherServicesAdmin();
    mettreAJourStatistiques();
}

// ========== AFFICHER SECTION ==========
function afficherSection(section) {
    // Masquer toutes les sections
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
    
    // Afficher la section sélectionnée
    document.getElementById(`section-${section}`).classList.add('active');
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Rafraîchir les données
    if (section === 'reservations') afficherReservations();
    else if (section === 'services') afficherServicesAdmin();
    else if (section === 'parametres') mettreAJourStatistiques();
}

// ========== AFFICHER RÉSERVATIONS ==========
function afficherReservations() {
    const reservations = JSON.parse(localStorage.getItem('djizz_reservations')) || [];
    const container = document.getElementById('reservations-list');
    
    if (reservations.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Aucune réservation</p>';
        return;
    }
    
    container.innerHTML = reservations.map((res, idx) => {
        const servicesHtml = res.services.map(s => `
            <li><strong>${s.name}</strong> × ${s.qty} = ${s.price * s.qty} HTG</li>
        `).join('');
        
        const subtotal = res.services.reduce((s, item) => s + item.price * item.qty, 0);
        
        return `
            <div class="reservation-item">
                <h3>#${res.id}</h3>
                <p><strong>Date:</strong> ${res.date}</p>
                <p><strong>Paiement:</strong> ${res.payment === 'online' ? '💻 En ligne' : '💵 Cash'}</p>
                <p><strong>Total:</strong> ${res.total} HTG</p>
                <div class="reservation-services">
                    <ul class="reservation-services-list">${servicesHtml}</ul>
                </div>
                <button style="background: #c41e3a; color: white; padding: 8px 15px; border: none; border-radius: 6px; cursor: pointer; margin-top: 10px;" onclick="supprimerReservation(${idx})">🗑️ Supprimer</button>
            </div>
        `;
    }).join('');
}

// ========== SUPPRIMER RÉSERVATION ==========
function supprimerReservation(idx) {
    if (confirm('Êtes-vous sûr?')) {
        const reservations = JSON.parse(localStorage.getItem('djizz_reservations')) || [];
        reservations.splice(idx, 1);
        localStorage.setItem('djizz_reservations', JSON.stringify(reservations));
        afficherReservations();
        mettreAJourStatistiques();
    }
}

// ========== EFFACER TOUTES RÉSERVATIONS ==========
function effacerToutesReservations() {
    if (confirm('⚠️ Effacer TOUTES les réservations? Cette action est irréversible!')) {
        localStorage.setItem('djizz_reservations', '[]');
        afficherReservations();
        mettreAJourStatistiques();
        alert('✅ Toutes les réservations ont été supprimées');
    }
}

// ========== AFFICHER SERVICES (ADMIN) ==========
function afficherServicesAdmin() {
    let servicesArray = JSON.parse(localStorage.getItem('djizz_services'));
    
    // Si pas en localStorage, charger depuis app.js (services par défaut)
    if (!servicesArray) {
        servicesArray = getServicesDefaut();
        localStorage.setItem('djizz_services', JSON.stringify(servicesArray));
    }
    
    const container = document.getElementById('services-list');
    
    container.innerHTML = servicesArray.map(service => `
        <div class="service-card">
            <h3>${service.icon || '✂️'} ${service.name}</h3>
            <p><strong>Catégorie:</strong> ${service.category || '-'}</p>
            <p class="price">${service.price} HTG</p>
            <p style="font-size: 0.9em; color: #999;">${service.description || 'Aucune description'}</p>
            <div class="service-card-actions">
                <button class="btn-edit" onclick="editerService(${service.id})">✏️ Éditer</button>
                <button class="btn-delete" onclick="supprimerService(${service.id})">🗑️ Supprimer</button>
            </div>
        </div>
    `).join('');
}

// ========== OUVRIR FORMULAIRE NOUVEAU SERVICE ==========
function ouvrirFormulairesService() {
    document.getElementById('service-id').value = '';
    document.getElementById('service-name').value = '';
    document.getElementById('service-price').value = '';
    document.getElementById('service-category').value = '';
    document.getElementById('service-icon').value = '';
    document.getElementById('service-image').value = '';
    document.getElementById('service-description').value = '';
    document.getElementById('modal-service').classList.add('active');
}

// ========== ÉDITER SERVICE ==========
function editerService(id) {
    let servicesArray = JSON.parse(localStorage.getItem('djizz_services')) || getServicesDefaut();
    const service = servicesArray.find(s => s.id === id);
    
    if (service) {
        document.getElementById('service-id').value = service.id;
        document.getElementById('service-name').value = service.name;
        document.getElementById('service-price').value = service.price;
        document.getElementById('service-category').value = service.category || '';
        document.getElementById('service-icon').value = service.icon || '';
        document.getElementById('service-image').value = service.image || '';
        document.getElementById('service-description').value = service.description || '';
        document.getElementById('modal-service').classList.add('active');
    }
}

// ========== SAUVEGARDER SERVICE ==========
function sauvegarderService() {
    const id = document.getElementById('service-id').value;
    const name = document.getElementById('service-name').value.trim();
    const price = parseInt(document.getElementById('service-price').value);
    const category = document.getElementById('service-category').value.trim();
    const icon = document.getElementById('service-icon').value.trim();
    const image = document.getElementById('service-image').value.trim();
    const description = document.getElementById('service-description').value.trim();
    
    if (!name || !price || price <= 0) {
        alert('❌ Veuillez remplir les champs obligatoires');
        return;
    }
    
    let servicesArray = JSON.parse(localStorage.getItem('djizz_services')) || getServicesDefaut();
    
    if (id) {
        // Édition
        const serviceIdx = servicesArray.findIndex(s => s.id === parseInt(id));
        if (serviceIdx !== -1) {
            servicesArray[serviceIdx] = {
                id: parseInt(id),
                name,
                price,
                category,
                icon,
                image,
                description
            };
        }
    } else {
        // Nouvelle service
        const newId = Math.max(...servicesArray.map(s => s.id), 0) + 1;
        servicesArray.push({
            id: newId,
            name,
            price,
            category,
            icon,
            image,
            description
        });
    }
    
    localStorage.setItem('djizz_services', JSON.stringify(servicesArray));
    fermerModalService();
    afficherServicesAdmin();
    alert('✅ Service sauvegardé!');
}

// ========== SUPPRIMER SERVICE ==========
function supprimerService(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service?')) {
        let servicesArray = JSON.parse(localStorage.getItem('djizz_services')) || getServicesDefaut();
        servicesArray = servicesArray.filter(s => s.id !== id);
        localStorage.setItem('djizz_services', JSON.stringify(servicesArray));
        afficherServicesAdmin();
        alert('✅ Service supprimé!');
    }
}

// ========== FERMER MODAL SERVICE ==========
function fermerModalService() {
    document.getElementById('modal-service').classList.remove('active');
}

// ========== METTRE À JOUR STATISTIQUES ==========
function mettreAJourStatistiques() {
    const reservations = JSON.parse(localStorage.getItem('djizz_reservations')) || [];
    let servicesArray = JSON.parse(localStorage.getItem('djizz_services')) || getServicesDefaut();
    
    const totalReservations = reservations.length;
    const totalServices = servicesArray.length;
    const totalRevenue = reservations.reduce((s, r) => s + r.total, 0);
    const lastBackup = new Date().toLocaleString('fr-FR');
    
    document.getElementById('total-reservations').textContent = totalReservations;
    document.getElementById('total-services').textContent = totalServices;
    document.getElementById('total-revenue').textContent = totalRevenue + ' HTG';
    document.getElementById('last-backup').textContent = lastBackup;
}

// ========== SAUVEGARDER DONNÉES JSON ==========
function sauvegarderDonnees() {
    const reservations = JSON.parse(localStorage.getItem('djizz_reservations')) || [];
    let servicesArray = JSON.parse(localStorage.getItem('djizz_services')) || getServicesDefaut();
    
    const data = {
        date: new Date().toLocaleString('fr-FR'),
        reservations: reservations,
        services: servicesArray,
        stats: {
            totalReservations: reservations.length,
            totalServices: servicesArray.length,
            totalRevenue: reservations.reduce((s, r) => s + r.total, 0)
        }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `djizz_backup_${Date.now()}.json`;
    a.click();
}

// ========== DÉCONNEXION ==========
function confirmerDeconnexion() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
        sessionStorage.removeItem('admin_logged');
        window.location.reload();
    }
}

// ========== OBTENIR SERVICES PAR DÉFAUT (depuis app.js) ==========
function getServicesDefaut() {
    return [
        // COUPES
        { id: 1, name: 'Coupe Homme', price: 2500, category: 'COUPES', icon: '✂️', image: 'https://images.unsplash.com/photo-1552862750-746b8f6f7f25?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 2, name: 'Coupe Enfant', price: 1500, category: 'COUPES', icon: '✂️', image: 'https://images.unsplash.com/photo-1535313033928-5dce86dbf3c0?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 3, name: 'Coupe Senior', price: 2000, category: 'COUPES', icon: '✂️', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 4, name: 'Coupe Dégradé', price: 3000, category: 'COUPES', icon: '✂️', image: 'https://images.unsplash.com/photo-1552862750-746b8f6f7f25?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 5, name: 'Coupe Style', price: 3500, category: 'COUPES', icon: '✂️', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        
        // BARBE
        { id: 6, name: 'Taille Simple', price: 1500, category: 'BARBE', icon: '⚡', image: 'https://images.unsplash.com/photo-1512310503325-430a63602b4c?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 7, name: 'Rasage Ancienne', price: 2000, category: 'BARBE', icon: '⚡', image: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 8, name: 'Design Barbe', price: 2500, category: 'BARBE', icon: '⚡', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 9, name: 'Taille Complète', price: 2000, category: 'BARBE', icon: '⚡', image: 'https://images.unsplash.com/photo-1514717159244-cb2c14fd50d7?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 10, name: 'Soin Barbe', price: 1500, category: 'BARBE', icon: '⚡', image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        
        // SOINS
        { id: 11, name: 'Facial', price: 2500, category: 'SOINS', icon: '💆', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 12, name: 'Gommage', price: 1800, category: 'SOINS', icon: '💆', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 13, name: 'Massage Visage', price: 2000, category: 'SOINS', icon: '💆', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 14, name: 'Masque Purifiant', price: 2000, category: 'SOINS', icon: '💆', image: 'https://images.unsplash.com/photo-1540975596063-2cf60801d84e?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        
        // COLORATIONS
        { id: 15, name: 'Coloration', price: 3000, category: 'COLORATIONS', icon: '🎨', image: 'https://images.unsplash.com/photo-1522336572468-736cc82bc761?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 16, name: 'Coloration Barbe', price: 2500, category: 'COLORATIONS', icon: '🎨', image: 'https://images.unsplash.com/photo-1579980081993-1c8c2c9a2a09?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 17, name: 'Éclaircissement', price: 3500, category: 'COLORATIONS', icon: '🎨', image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5d0?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        
        // FORMULES COMBINÉES
        { id: 18, name: 'Formule Complète', price: 3500, category: 'FORMULES', icon: '👑', image: 'https://images.unsplash.com/photo-1552862750-746b8f6f7f25?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 19, name: 'Formule Premium', price: 4500, category: 'FORMULES', icon: '👑', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 20, name: 'Formule Rasage', price: 3500, category: 'FORMULES', icon: '👑', image: 'https://images.unsplash.com/photo-1534308983496-4fbb86fcddfc?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 21, name: 'Forfait Complet', price: 5000, category: 'FORMULES', icon: '👑', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        
        // ÉPILATION
        { id: 22, name: 'Épilation Nez/Oreilles', price: 1000, category: 'ÉPILATION', icon: '🧴', image: 'https://images.unsplash.com/photo-1529148091759-c21eba84c3b9?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 23, name: 'Threading Sourcils', price: 1200, category: 'ÉPILATION', icon: '🧴', image: 'https://images.unsplash.com/photo-1570545063916-0e3f7ad8f2b1?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        
        // SUPPLÉMENTAIRES
        { id: 24, name: 'Coupe + Teinture', price: 4000, category: 'SUPPLÉMENTAIRES', icon: '⭐', image: 'https://images.unsplash.com/photo-1495364141862-b3582bcb0aef?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 25, name: 'Soin Cheveux', price: 2500, category: 'SUPPLÉMENTAIRES', icon: '⭐', image: 'https://images.unsplash.com/photo-1552862750-746b8f6f7f25?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' },
        { id: 26, name: 'Brushing', price: 1500, category: 'SUPPLÉMENTAIRES', icon: '⭐', image: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-4.1.0&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300' }
    ];
}
