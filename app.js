// =======================================
// DJIZZ'S CUT - LOGIQUE APPLICATION
// ======================================= 

let panier = JSON.parse(localStorage.getItem('djizz_panier')) || [];
let selectedPayment = 'online';
let services = []; // Sera chargé depuis localStorage ou valeurs par défaut

// ========== CHARGER SERVICES (localStorage ou défaut) ==========
function chargerServices() {
    const servicesStockage = JSON.parse(localStorage.getItem('djizz_services'));
    if (servicesStockage) {
        services = servicesStockage;
    } else {
        // Services par défaut
        services = [
    // Coupes
    { id: 1, name: 'Coupe Homme', price: 2500, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 2, name: 'Coupe Enfant (0-12 ans)', price: 1500, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 3, name: 'Coupe Senior', price: 2000, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 4, name: 'Coupe avec Dégradé', price: 3000, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 5, name: 'Coupe Style (Moderne)', price: 3500, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    
    // Barbe
    { id: 6, name: 'Taille de Barbe Simple', price: 1500, image: 'https://images.unsplash.com/photo-1654097803253-d481b6751f78?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 7, name: 'Rasage à l\'ancienne', price: 2000, image: 'https://images.unsplash.com/photo-1654097803253-d481b6751f78?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 8, name: 'Design de Barbe', price: 2500, image: 'https://images.unsplash.com/photo-1654097803253-d481b6751f78?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 9, name: 'Taille Barbe Complète', price: 2000, image: 'https://images.unsplash.com/photo-1654097803253-d481b6751f78?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 10, name: 'Soin Barbe (Huile + Lotion)', price: 1500, image: 'https://images.unsplash.com/photo-1654097803253-d481b6751f78?ixlib=rb-4.1.0&q=85&fm=jpg' },
    
    // Soins
    { id: 11, name: 'Soin Visage (Facial)', price: 2500, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 12, name: 'Gommage Visage', price: 1800, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 13, name: 'Massage Visage & Cou', price: 2000, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 14, name: 'Masque Purifiant', price: 2000, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    
    // Colorations
    { id: 15, name: 'Coloration (Teinture)', price: 3000, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 16, name: 'Coloration Barbe', price: 2500, image: 'https://images.unsplash.com/photo-1654097803253-d481b6751f78?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 17, name: 'Éclaircissement', price: 3500, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    
    // Formules Combinées
    { id: 18, name: 'Formule Complète (Coupe + Barbe + Soin)', price: 3500, image: 'https://images.unsplash.com/photo-1608869776252-33ff061fabf2?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 19, name: 'Formule Premium (Coupe + Design Barbe + Soin + Massage)', price: 4500, image: 'https://images.unsplash.com/photo-1608869776252-33ff061fabf2?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 20, name: 'Formule Rasage (Rasage à l\'ancienne + Soin Visage)', price: 3500, image: 'https://images.unsplash.com/photo-1608869776252-33ff061fabf2?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 21, name: 'Forfait Homme Complet', price: 5000, image: 'https://images.unsplash.com/photo-1608869776252-33ff061fabf2?ixlib=rb-4.1.0&q=85&fm=jpg' },
    
    // Épilation
    { id: 22, name: 'Épilation Nez/Oreilles', price: 1000, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 23, name: 'Threading Sourcils', price: 1200, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    
    // Services Supplémentaires
    { id: 24, name: 'Coupe + Teinture Cheveux', price: 4000, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 25, name: 'Soin Cheveux (Traitement)', price: 2500, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' },
    { id: 26, name: 'Brushing/Coiffage', price: 1500, image: 'https://images.unsplash.com/photo-1514336977383-e12182fdf82e?ixlib=rb-4.1.0&q=85&fm=jpg' }
        ];
    }
}

// ========== AJOUTER AU PANIER ==========
function ajouter(id) {
    const service = services.find(s => s.id === id);
    const existant = panier.find(item => item.id === id);
    
    if (existant) {
        existant.qty++;
    } else {
        panier.push({...service, qty: 1});
    }
    
    sauvegarderPanier();
    afficherNotification(`✅ ${service.name} ajouté au panier!`);
    mettreAJourBadge();
}

// ========== RETIRER DU PANIER ==========
function retirer(id) {
    panier = panier.filter(item => item.id !== id);
    sauvegarderPanier();
    afficherCartModal();
    mettreAJourBadge();
}

// ========== METTRE À JOUR QUANTITÉ ==========
function changerQuantite(id, diff) {
    const item = panier.find(item => item.id === id);
    if (item) {
        item.qty += diff;
        if (item.qty <= 0) {
            retirer(id);
        } else {
            sauvegarderPanier();
            afficherCartModal();
        }
    }
}

// ========== SAUVEGARDER PANIER ==========
function sauvegarderPanier() {
    localStorage.setItem('djizz_panier', JSON.stringify(panier));
}

// ========== AFFICHER NOTIFICATION ==========
function afficherNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #d4af37, #f0c856);
        color: #1a1a1a;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 3000;
        animation: slideIn 0.4s ease;
        font-weight: 700;
        box-shadow: 0 8px 25px rgba(212,175,55,0.3);
    `;
    
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// ========== METTRE À JOUR BADGE ==========
function mettreAJourBadge() {
    const total = panier.reduce((s, item) => s + item.qty, 0);
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
    }
}

// ========== AFFICHER MODAL PANIER ==========
function afficherCartModal() {
    const overlay = document.getElementById('cart-modal-overlay');
    const modal = document.getElementById('cart-modal');
    
    if (!modal) return;
    
    let html = '';
    let subtotal = 0;
    
    if (panier.length === 0) {
        html = '<p style="text-align:center; color:#999; padding:40px;">Aucun service dans votre panier</p>';
    } else {
        panier.forEach(item => {
            const sousTotal = item.price * item.qty;
            subtotal += sousTotal;
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <div class="cart-item-price">${item.price} HTG × ${item.qty}</div>
                    </div>
                    <div class="cart-controls">
                        <button class="qty-btn" onclick="changerQuantite(${item.id}, -1)">−</button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="changerQuantite(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="retirer(${item.id})">🗑️</button>
                    </div>
                </div>
            `;
        });
    }
    
    modal.querySelector('.cart-list').innerHTML = html;
    afficherSommaire(subtotal);
    
    overlay.classList.add('active');
}

// ========== AFFICHER SOMMAIRE ==========
function afficherSommaire(subtotal) {
    const modal = document.getElementById('cart-modal');
    const total = subtotal;
    
    const sommaire = modal.querySelector('.cart-summary');
    sommaire.innerHTML = `
        <div class="summary-row total">
            <span>Total:</span>
            <span>${total} HTG</span>
        </div>
    `;
}

// ========== CONFIRMER RÉSERVATION ==========
function confirmerReservation() {
    if (panier.length === 0) {
        afficherNotification('❌ Votre panier est vide!');
        return;
    }
    
    const subtotal = panier.reduce((s, item) => s + item.price * item.qty, 0);
    const total = subtotal;
    
    let message = '📋 *RÉSERVATION DJIZZ\'S CUT*\n\n';
    message += '🕐 ' + new Date().toLocaleString('fr-FR') + '\n';
    message += '━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    message += '✂️ *SERVICES SÉLECTIONNÉS:*\n';
    
    panier.forEach(item => {
        const sousTotal = item.price * item.qty;
        message += `• ${item.name}\n  × ${item.qty} = ${sousTotal} HTG\n`;
    });
    
    message += `\n━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `✅ *TOTAL:* ${total} HTG\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `💳 *Méthode de paiement:* ${selectedPayment === 'online' ? '💻 Paiement en ligne' : '💵 Cash à la réception'}\n`;
    message += `\n📍 *Localisation:* Pétion-Ville, Port-au-Prince, Haïti\n`;
    message += `📞 *Horaires:* Lun-Ven 9h-19h | Sam 9h-20h | Dim sur RDV\n\n`;
    message += `⏳ Nous vous appellerons pour confirmer votre créneau horaire!`;
    
    // Envoyer sur WhatsApp
    const whatsappUrl = `https://wa.me/50937000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Sauvegarder la réservation
    sauvegarderReservation(total);
    
    // Réinitialiser
    panier = [];
    sauvegarderPanier();
    mettreAJourBadge();
    fermerCartModal();
    
    afficherNotification('✅ Réservation confirmée! Consultez WhatsApp pour les détails.');
}

// ========== SAUVEGARDER RÉSERVATION ==========
function sauvegarderReservation(total) {
    const reservations = JSON.parse(localStorage.getItem('djizz_reservations')) || [];
    const reservation = {
        id: Date.now(),
        date: new Date().toLocaleString('fr-FR'),
        services: panier,
        total: total,
        payment: selectedPayment
    };
    reservations.push(reservation);
    localStorage.setItem('djizz_reservations', JSON.stringify(reservations));
}

// ========== FERMER MODAL PANIER ==========
function fermerCartModal() {
    const overlay = document.getElementById('cart-modal-overlay');
    if (overlay) overlay.classList.remove('active');
}

// ========== OUVRIR MODAL PANIER ==========
function ouvrirCartModal() {
    afficherCartModal();
}

// ========== SÉLECTIONNER PAIEMENT ==========
function selectionnerPaiement(method) {
    selectedPayment = method;
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    event.target.closest('.payment-option').classList.add('selected');
}

// ========== OUVRIR/FERMER MODAL TOUS LES SERVICES ==========
function ouvrirAllServices() {
    const overlay = document.getElementById('services-modal-overlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function fermerAllServices() {
    const overlay = document.getElementById('services-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// ========== ÉVÉNEMENTS AU CHARGEMENT ==========
document.addEventListener('DOMContentLoaded', function() {
    // Charger les services (localStorage ou défaut)
    chargerServices();
    
    // Mettre à jour badge au démarrage
    mettreAJourBadge();
    
    // Fermer modal panier au clic dehors
    const overlay = document.getElementById('cart-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) fermerCartModal();
        });
    }
    
    // Fermer modal services au clic dehors
    const servicesOverlay = document.getElementById('services-modal-overlay');
    if (servicesOverlay) {
        servicesOverlay.addEventListener('click', function(e) {
            if (e.target === servicesOverlay) fermerAllServices();
        });
    }
    
    // Bouton fermer modal panier
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', fermerCartModal);
    }
    
    // Animation au scroll
    observerSections();
});

// ========== OBSERVER SECTIONS POUR ANIMATION ==========
function observerSections() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.service-card, .testimonial, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

// ========== RECHERCHE DE SERVICES ==========
function rechercherService(query) {
    const results = services.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase())
    );
    return results;
}

// ========== AJOUTER STYLE ANIMATION ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
