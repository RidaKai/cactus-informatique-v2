// INITIALISATION EMAILJS

console.log('🚀 Démarrage du script EmailJS...');

(function() {
    emailjs.init("Lv_8rEtfSXsh03NtW");
    console.log('✅ EmailJS initialisé avec la clé :', 'Lv_8rEtfSXsh03NtW');
})();

// GESTION DU FORMULAIRE DE CONTACT

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ DOM chargé, recherche du formulaire...');

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    console.log('Formulaire contactForm :', contactForm);
    console.log('Bouton submitBtn :', submitBtn);

    // Vérifier que le formulaire existe sur la page
    if (!contactForm) {
        console.error('❌ Formulaire #contactForm non trouvé !');
        return;
    }

    console.log('✔ Formulaire trouvé, ajout de l\'écouteur...');

    // Écouter l'événement de soumission
    contactForm.addEventListener('submit', function(e) {
        console.log('📩 Formulaire soumis !');
        e.preventDefault(); // Empêche le rechargement de la page

        // Cacher les anciens messages
        if (formSuccess) formSuccess.classList.add('d-none');
        if (formError) formError.classList.add('d-none');

        // Désactiver le bouton pendant l'envoi
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        console.log('📤 Envoi vers EmailJS...');
        console.log('Service ID :', 'service_imouxba');
        console.log('Template ID :', 'template_3gyvnre');

        // Envoyer le formulaire via EmailJS
        emailjs.sendForm(
            'service_imouxba',    
            'template_3gyvnre',    
            contactForm
        )
        .then(function(response) {
            console.log('✔ Succès EmailJS :', response);
            if (formSuccess) {
                formSuccess.classList.remove('d-none');
                formSuccess.textContent = '✔ Your message has been sent successfully! We\'ll get back to you soon.';
            }
            contactForm.reset(); // Vide le formulaire
        })
        .catch(function(error) {
            console.error('❌ Erreur EmailJS :', error);
            if (formError) {
                formError.classList.remove('d-none');
                formError.textContent = '❌ Oops! Something went wrong. Please try again or call us directly.';
            }
        })
        .finally(function() {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    });

    // SUPPORT INFOBULLES SUR MOBILE (TOUCH)

    const featureItems = document.querySelectorAll('.feature-item');
    
    if (featureItems.length > 0) {
        console.log('✔ Infobulles :', featureItems.length, 'éléments trouvés');

        featureItems.forEach(function(item) {
            // Au tap sur mobile, ajoute la classe 'tapped'
            item.addEventListener('touchstart', function(e) {
                // Retire la classe de tous les autres éléments
                featureItems.forEach(function(el) {
                    el.classList.remove('tapped');
                });
                // Ajoute la classe à l'élément tapé
                this.classList.add('tapped');
                
                // Fermer l'infobulle après 3 secondes
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.classList.remove('tapped');
                }, 3000);
            });
        });
    } else {
        console.log('ℹ️ Aucun élément .feature-item trouvé pour les infobulles');
    }

});

// TOGGLE TECHNOLOGIES (version simple avec onclick)

function toggleTech(id) {
    console.log('🔄 toggleTech appelé avec id :', id);
    
    const element = document.getElementById(id);
    console.log('📦 Élément trouvé :', element);
    
    if (element) {
        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = 'block';
            console.log('✅ Technologies affichées');
        } else {
            element.style.display = 'none';
            console.log('✅ Technologies cachées');
        }
    } else {
        console.error('❌ Élément #' + id + ' non trouvé !');
    }
}