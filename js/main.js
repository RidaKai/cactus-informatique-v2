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

// EFFET DE LUMIÈRE SUR BACKGROUND 

document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.page-header');
    
    headers.forEach(header => {
        header.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x', x + '%');
            this.style.setProperty('--mouse-y', y + '%');
        });
        
        header.addEventListener('mouseleave', function() {
            this.style.setProperty('--mouse-x', '50%');
            this.style.setProperty('--mouse-y', '50%');
        });
    });
});

// EFFET DE LUMIÈRE SUR CTA (suivi de la souris)

document.addEventListener('DOMContentLoaded', function() {
    const ctaSections = document.querySelectorAll('.cta-section');
    
    ctaSections.forEach(section => {
        section.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x', x + '%');
            this.style.setProperty('--mouse-y', y + '%');
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.setProperty('--mouse-x', '50%');
            this.style.setProperty('--mouse-y', '50%');
        });
    });
});

// CHATBOT WIDGET FLOTTANT

document.addEventListener('DOMContentLoaded', function() {
    
    // --- references ---
    const floatBtn = document.getElementById('chatFloatBtn');
    const widget = document.getElementById('chatWidget');
    const closeBtn = document.getElementById('chatWidgetClose');
    const messages = document.getElementById('chatWidgetMessages');
    const input = document.getElementById('chatWidgetInput');
    const sendBtn = document.getElementById('chatWidgetSendBtn');

    let isFrench = false;
    let showForm = false;

    // --- AJOUT : memoire pour la meteo ---
    let waitingForCity = false;
    let lastWeatherLang = 'en';

    //  BASE DE CONNAISSANCES (ENRICHIE)
    
    const knowledgeBase = {
        en: {
            // --- SALUTATIONS ---
            greetings: {
                keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "bonjour", "salut", "coucou"],
                response: "👋 Hello! Welcome to Cactus Informatique. How can I help you today?"
            },
            // --- COMMENT CA VA ---
            howareyou: {
                keywords: ["how are you", "how are you doing", "how do you do", "how's it going", "how's everything", "how is it going"],
                response: "I'm doing great, thank you for asking! How can I help you today?"
            },
            // --- REMERCIEMENTS ---
            thanks: {
                keywords: ["thank", "thanks", "merci", "thank you", "thanks a lot", "appreciate"],
                response: "🙌 You're welcome! It's my pleasure to help. Feel free to ask if you have any other questions."
            },
            // --- CONFIRMATIONS ---
            acknowledge: {
                keywords: ["ok", "okay", "got it", "understood", "compris", "d'accord", "yes", "yeah", "sure", "alright"],
                response: "👍 Great! Let me know if you need any more details."
            },
            // --- AU REVOIR ---
            goodbye: {
                keywords: ["bye", "goodbye", "see you", "au revoir", "a bientot", "ciao", "good night", "see you later"],
                response: "👋 Goodbye! Have a great day. Don't hesitate to come back if you have more questions."
            },
            // --- DEMANDE D'AIDE ---
            help: {
                keywords: ["help", "aide", "assist", "support", "what can you do", "what do you do", "can you help"],
                response: "💡 I can answer questions about:<br>• Our services (hosting, audit, development)<br>• Our working hours<br>• Contact details (phone, email, address)<br>• Our clients and company<br>• You can also ask for the contact form with 'give me the form'<br>• The current date with 'today'<br>• The weather with 'weather in [city]'"
            },

            // --- QUESTIONS GENERALES SUR L'ENTREPRISE ---
            who: {
                keywords: ["who are you", "who is cactus", "what is cactus", "tell me about cactus", "presentation"],
                response: "🏢 Cactus Informatique is an IT company based in Casablanca, Morocco, founded in 2006. We specialize in IT services, hosting, and software development."
            },
            experience: {
                keywords: ["how long", "years", "experience", "since", "2006", "established", "founded", "age", "how old"],
                response: "📅 We have been in business since 2006, which means over 18 years of experience in the IT industry."
            },
            office: {
                keywords: ["office", "physical office", "visit", "come", "see you", "rendezvous", "meeting"],
                response: "🏢 Yes, we have a physical office in Casablanca. You are welcome to visit us during working hours at 69 Lotissement Halioua, 20001, CASABLANCA AIN SEBAA, MOROCCO."
            },

            // --- QUESTIONS SUR LES SERVICES ---
            hosting_explain: {
                keywords: ["what is hosting", "web hosting explain", "hosting definition", "c'est quoi l'hebergement"],
                response: "🌐 Web hosting is a service that allows you to publish your website on the internet. We offer shared hosting, VPS, and dedicated servers with cPanel, free SSL, and a dedicated technical advisor."
            },
            vps_explain: {
                keywords: ["what is vps", "vps explain", "virtual private server", "vps definition"],
                response: "🖥️ VPS (Virtual Private Server) is a hosting plan that gives you dedicated resources on a shared server. It offers more control and performance than shared hosting."
            },
            audit_explain: {
                keywords: ["what is it audit", "it auditing", "audit definition", "audit informatique"],
                response: "🔍 IT auditing is a process to evaluate your IT infrastructure, security, compliance, and operational workflows. We identify risks and provide recommendations to improve your systems."
            },
            software_explain: {
                keywords: ["what software", "what kind of software", "software development", "develop apps"],
                response: "💻 We develop custom software including commercial management, payroll systems, online declarations, and business management web applications."
            },
            mobile_apps: {
                keywords: ["mobile app", "android", "ios", "phone app", "application mobile"],
                response: "📱 We primarily focus on web applications. For mobile solutions, we can discuss your needs on a case-by-case basis."
            },
            virtualization_explain: {
                keywords: ["what is virtualization", "virtualization definition", "virtualisation definition"],
                response: "☁️ Virtualization allows you to run multiple virtual servers on a single physical server. It helps optimize resources and reduce hardware costs."
            },
            opensource_explain: {
                keywords: ["what is open source", "open source definition", "logiciel libre"],
                response: "🆓 Open source software is free to use, modify, and distribute. We use open source solutions like CRM, ERP, CMS, and databases to reduce costs for our clients."
            },

            // --- QUESTIONS SUR LES TARIFS ET DEVIS ---
            pricing: {
                keywords: ["price", "cost", "tarif", "prix", "how much", "devis", "quote", "tarifs", "coût", "combien", "free trial", "discount", "promotion"],
                response: "💰 Our prices vary depending on the service and your specific needs. Please contact us for a personalized quote via the contact form or call us at (+212) 522-343-545."
            },
            price_list: {
                keywords: ["price list", "catalogue", "tarifs", "grille tarifaire", "pricing page"],
                response: "📋 We prefer to tailor our prices to each client's needs rather than publishing a fixed price list. Contact us for a personalized quote."
            },
            trial: {
                keywords: ["free trial", "trial", "demo", "essai", "démo", "try", "tester"],
                response: "🎯 We don't offer a free trial, but we can provide a demo of our products on request. Contact us to schedule a demonstration."
            },
            long_term_discount: {
                keywords: ["discount", "réduction", "annual", "annuel", "long term", "long terme", "commitment", "engagement"],
                response: "💲 Yes, we offer discounts for annual commitments and long-term contracts. Contact us for more details."
            },

            // --- QUESTIONS TECHNIQUES ---
            technologies: {
                keywords: ["technology", "technologie", "tools", "outils", "tech stack", "stack technique"],
                response: "💻 We use modern technologies including HTML, CSS, JavaScript, PHP, MySQL, Bootstrap, jQuery, and Linux."
            },
            wordpress: {
                keywords: ["wordpress", "wp", "auto installer", "installateur automatique"],
                response: "📝 Yes, we offer hosting with WordPress auto-installer. You can install WordPress with one click from your cPanel."
            },
            ssl: {
                keywords: ["ssl", "certificate", "certificat", "https", "secure", "sécurisé"],
                response: "🔒 Yes, we include free SSL certificates with our hosting plans to secure your website."
            },
            uptime: {
                keywords: ["uptime", "guarantee", "garantie", "availability", "disponibilité", "99.9"],
                response: "⏱️ We guarantee 99.9% uptime for our hosting services to ensure your website is always available."
            },
            backup: {
                keywords: ["backup", "sauvegarde", "restore", "restauration", "data recovery"],
                response: "💾 Yes, we provide regular backups as part of our hosting and security solutions. Your data is automatically backed up."
            },
            migration: {
                keywords: ["migration", "transfer", "transfert", "move", "déplacer", "existing site", "site existant"],
                response: "🔄 Yes, we offer migration assistance for new clients. We can help you transfer your existing website to our hosting services."
            },

            // --- QUESTIONS SUR LE SUPPORT ---
            support: {
                keywords: ["support", "assistance", "help", "aide", "maintenance", "24/7", "response time", "délai", "disponibilité"],
                response: "🛠️ Our support is available Monday to Friday, from 9:00 AM to 5:00 PM. You can reach us by phone at (+212) 522-343-545 or by email at contact@cactus.net.ma."
            },
            response_time: {
                keywords: ["response time", "reply", "réponse", "délai de réponse", "wait", "attente"],
                response: "⏳ We aim to respond to all inquiries within 24 hours. For urgent matters, please call us directly at (+212) 522-343-545."
            },
            post_delivery: {
                keywords: ["after delivery", "post delivery", "after project", "maintenance contract", "contrat de maintenance", "ongoing support"],
                response: "🔧 Yes, we offer maintenance and support contracts after project delivery to ensure your solution continues to run smoothly."
            },

            // --- QUESTIONS SUR LES CLIENTS ET REFERENCES ---
            references: {
                keywords: ["reference", "référence", "clients", "customers", "testimonial", "témoignage", "international"],
                response: "🏢 We work with SMEs, large enterprises, and public institutions. Our clients include Danone, Anapec, Avon, and many others. We can provide references upon request."
            },
            client_list: {
                keywords: ["who are your clients", "list of clients", "liste des clients", "who works with you"],
                response: "🏢 We work with SMEs, large enterprises, and public institutions. Our clients include Danone, Anapec, Avon, and many others."
            },
            international: {
                keywords: ["international", "foreign", "outside morocco", "étranger", "hors maroc"],
                response: "🌍 We primarily work with Moroccan companies but are open to international projects. Contact us to discuss your specific needs."
            },

            // --- DEMANDES SPECIFIQUES ---
            custom: {
                keywords: ["custom", "sur mesure", "specific", "spécifique", "special", "particulier", "besoin", "need", "project", "projet", "personalized"],
                response: "🔧 Yes, we offer custom solutions tailored to your specific needs. Contact us to discuss your project and we'll find the best solution together."
            },
            website_build: {
                keywords: ["build website", "create website", "site web", "créer un site", "website development"],
                response: "🌐 Yes, we offer web development services. Contact us to discuss your project and we'll help you build a website tailored to your needs."
            },
            infrastructure_help: {
                keywords: ["infrastructure", "infrastructure help", "help with it", "IT infrastructure", "réseau", "network"],
                response: "🏗️ Yes, we offer IT consulting and infrastructure services. We can help you design, implement, and manage your IT infrastructure."
            },
            email_migration: {
                keywords: ["email migration", "professional email", "email service", "migration email", "email pro"],
                response: "📧 Yes, we offer email migration services. We can help you set up professional email services for your business."
            },
            training: {
                keywords: ["training", "formation", "learn", "apprendre", "train", "former", "onboarding"],
                response: "📚 Yes, we provide training for our software solutions to ensure your team can use them effectively."
            },

            // --- HORAIRES ---
            hours: {
                keywords: ["hours", "open", "working", "time", "work", "closing", "close", "schedule", "when", "business hours", "opening", "closing time", "what time"],
                response: "🕐 We are open Monday to Friday, from 8:30 AM to 5:00 PM."
            },
            // --- TELEPHONE ---
            phone: {
                keywords: ["phone", "call", "appeler", "numero", "number", "telephone", "contact number", "call you"],
                response: "📞 You can call us at: (+212) 522-343-545"
            },
            // --- EMAIL ---
            email: {
                keywords: ["email", "mail", "contact", "e-mail", "message", "email address", "send email"],
                response: "✉️ Send us an email at: contact@cactus.net.ma"
            },
            // --- ADRESSE ---
            address: {
                keywords: ["address", "where", "location", "localisation", "casablanca", "office", "visit", "physical", "come"],
                response: "📍 We are located at: 70 Allée des Phoenix, 20250, CASABLANCA "
            },
            // --- SERVICES ---
            services: {
                keywords: ["service", "offer", "propose", "do you", "what", "help", "provide", "offre", "proposez", "what services"],
                response: "We offer:<br>• Web Hosting (shared, VPS, dedicated)<br>• Auditing & IT Consulting<br>• Study & Development<br>• Virtualization<br>• Open Source Solutions<br>• Security Systems"
            },
            // --- HEBERGEMENT ---
            hosting: {
                keywords: ["hosting", "hebergement", "server", "serveur", "cpanel", "ssl", "web hosting", "dedicated", "vps"],
                response: "We offer shared hosting, VPS, and dedicated servers with cPanel, free SSL, and a dedicated technical advisor."
            },
            // --- DEVELOPPEMENT ---
            development: {
                keywords: ["development", "develop", "software", "logiciel", "app", "application", "programming", "code", "custom"],
                response: "We develop custom software, web applications tailored to your business needs."
            },
            // --- SECURITE ---
            security: {
                keywords: ["security", "securite", "firewall", "vpn", "backup", "active directory", "secure", "protection", "cyber", "compliance", "gdpr"],
                response: "We provide security systems: firewalls, VPN, Active Directory, backup solutions, and GDPR compliance."
            },
            // --- VIRTUALISATION ---
            virtualization: {
                keywords: ["virtualization", "virtualisation", "hyper-v", "cloud", "vmware", "virtual"],
                response: "We offer server virtualization solutions (Hyper-V, VMware) and cloud migration services."
            },
            // --- OPEN SOURCE ---
            opensource: {
                keywords: ["open source", "opensource", "crm", "erp", "cms", "linux", "free software", "open"],
                response: "We use open source technologies: CRM, ERP, CMS, databases, and Linux-based solutions."
            },
            // --- ENTREPRISE ---
            company: {
                keywords: ["company", "entreprise", "cactus", "about", "a propos", "history", "who are you", "what is cactus"],
                response: "Cactus Informatique is an IT company based in Casablanca, Morocco, founded in 2006. We specialize in IT services, hosting, and software development."
            },
            // --- CLIENTS ---
            clients: {
                keywords: ["client", "customer", "clients", "customers", "danone", "anapec", "avon", "trusted", "who works with you"],
                response: "We work with SMEs, large enterprises, and public institutions. Our clients include Danone, Anapec, Avon, and many others."
            }
        },
        fr: {
            // --- SALUTATIONS ---
            greetings: {
                keywords: ["bonjour", "salut", "coucou", "hello", "hi", "hey", "bonsoir"],
                response: "👋 Bonjour ! Bienvenue chez Cactus Informatique. Comment puis-je vous aider aujourd'hui ?"
            },
            // --- COMMENT CA VA ---
            howareyou: {
                keywords: ["comment allez-vous", "comment vas-tu", "comment ca va", "ca va", "comment va", "comment tu vas"],
                response: "😊 Je vais tres bien, merci de demander ! Comment puis-je vous aider aujourd'hui ?"
            },
            // --- REMERCIEMENTS ---
            thanks: {
                keywords: ["merci", "thank", "thanks", "merci beaucoup", "je vous remercie", "c'est gentil"],
                response: "🙌 De rien ! C'est un plaisir de vous aider. N'hesitez pas si vous avez d'autres questions."
            },
            // --- CONFIRMATIONS ---
            acknowledge: {
                keywords: ["ok", "d'accord", "compris", "yes", "ouais", "parfait", "super"],
                response: "👍 Parfait ! N'hesitez pas si vous avez besoin de plus d'informations."
            },
            // --- AU REVOIR ---
            goodbye: {
                keywords: ["au revoir", "a bientot", "bye", "goodbye", "ciao", "bonne journee", "bonne soiree"],
                response: "👋 Au revoir ! Passez une excellente journee. Revenez si vous avez d'autres questions."
            },
            // --- DEMANDE D'AIDE ---
            help: {
                keywords: ["aide", "help", "assist", "support", "que pouvez-vous faire", "que fais-tu", "peux-tu m'aider"],
                response: "💡 Je peux repondre a vos questions sur :<br>• Nos services (hebergement, audit, developpement)<br>• Nos horaires d'ouverture<br>• Nos coordonnees (telephone, email, adresse)<br>• Nos clients et l'entreprise<br>• Vous pouvez aussi demander le formulaire de contact avec 'give me the form'<br>• La date du jour avec 'today'<br>• La meteo avec 'weather in [ville]'"
            },

            // --- QUESTIONS GENERALES SUR L'ENTREPRISE ---
            who: {
                keywords: ["qui etes-vous", "qui est cactus", "c'est quoi cactus", "parle-moi de cactus", "presentation"],
                response: "🏢 Cactus Informatique est une entreprise IT basee a Casablanca, Maroc, fondee en 2006. Nous sommes specialises dans les services IT, l'hebergement et le developpement logiciel."
            },
            experience: {
                keywords: ["depuis combien de temps", "annees", "experience", "depuis", "2006", "fondee", "age"],
                response: "📅 Nous sommes en activite depuis 2006, ce qui represente plus de 18 ans d'experience dans le secteur IT."
            },
            office: {
                keywords: ["bureau", "visiter", "venir", "rencontre", "rendez-vous"],
                response: "🏢 Oui, nous avons un bureau physique a Casablanca. Vous etes les bienvenus pour nous rendre visite pendant les heures de travail au 69 Lotissement Halioua, 20001, CASABLANCA AIN SEBAA, MAROC."
            },

            // --- QUESTIONS SUR LES SERVICES ---
            hosting_explain: {
                keywords: ["qu'est-ce que l'hebergement", "hebergement definition", "c'est quoi l'hebergement web"],
                response: "🌐 L'hebergement web est un service qui permet de publier votre site internet. Nous proposons de l'hebergement mutualise, VPS et serveurs dedies avec cPanel, SSL gratuit et un conseiller technique dedie."
            },
            vps_explain: {
                keywords: ["qu'est-ce qu'un vps", "vps definition", "c'est quoi un serveur virtuel"],
                response: "🖥️ Un VPS (Virtual Private Server) est un plan d'hebergement qui vous offre des ressources dediees sur un serveur partage. Il offre plus de controle et de performance qu'un hebergement mutualise."
            },
            audit_explain: {
                keywords: ["qu'est-ce qu'un audit it", "audit informatique", "definition audit"],
                response: "🔍 Un audit informatique est un processus d'evaluation de votre infrastructure IT, securite, conformite et processus operationnels. Nous identifions les risques et fournissons des recommandations."
            },
            software_explain: {
                keywords: ["quel logiciel", "quel type de logiciel", "developpement logiciel", "applications"],
                response: "💻 Nous developpons des logiciels sur mesure incluant la gestion commerciale, la paie, les declarations en ligne et des applications web metier."
            },
            mobile_apps: {
                keywords: ["application mobile", "android", "ios", "app phone"],
                response: "📱 Nous nous concentrons principalement sur les applications web. Pour les solutions mobiles, nous pouvons discuter de vos besoins au cas par cas."
            },
            virtualization_explain: {
                keywords: ["qu'est-ce que la virtualisation", "definition virtualisation"],
                response: "☁️ La virtualisation permet de faire fonctionner plusieurs serveurs virtuels sur un seul serveur physique. Cela permet d'optimiser les ressources et de reduire les couts materiels."
            },
            opensource_explain: {
                keywords: ["qu'est-ce que l'open source", "definition open source", "logiciel libre"],
                response: "🆓 Les logiciels open source sont gratuits a utiliser, modifier et distribuer. Nous utilisons des solutions open source comme CRM, ERP, CMS et bases de donnees pour reduire les couts de nos clients."
            },

            // --- QUESTIONS SUR LES TARIFS ET DEVIS ---
            pricing: {
                keywords: ["prix", "cout", "tarif", "combien", "devis", "tarifs", "gratuit", "essai", "promotion", "reduction"],
                response: "💰 Nos tarifs varient selon le service et vos besoins specifiques. Contactez-nous pour un devis personnalise via le formulaire de contact ou par telephone au (+212) 522-343-545."
            },
            price_list: {
                keywords: ["grille tarifaire", "catalogue", "tarifs"],
                response: "📋 Nous preferons adapter nos prix aux besoins de chaque client plutot que de publier une grille tarifaire fixe. Contactez-nous pour un devis personnalise."
            },
            trial: {
                keywords: ["essai gratuit", "demo", "tester", "try"],
                response: "🎯 Nous ne proposons pas d'essai gratuit, mais nous pouvons vous faire une demonstration de nos produits sur demande. Contactez-nous pour planifier une demonstration."
            },
            long_term_discount: {
                keywords: ["reduction", "annuel", "long terme", "engagement"],
                response: "💲 Oui, nous offrons des reductions pour les engagements annuels et les contrats a long terme. Contactez-nous pour plus de details."
            },

            // --- QUESTIONS TECHNIQUES ---
            technologies: {
                keywords: ["technologie", "outils", "stack technique"],
                response: "💻 Nous utilisons des technologies modernes incluant HTML, CSS, JavaScript, PHP, MySQL, Bootstrap, jQuery et Linux."
            },
            wordpress: {
                keywords: ["wordpress", "wp", "installateur automatique"],
                response: "📝 Oui, nous proposons un hebergement avec installateur automatique WordPress. Vous pouvez installer WordPress en un clic depuis votre cPanel."
            },
            ssl: {
                keywords: ["ssl", "certificat", "https", "securise"],
                response: "🔒 Oui, nous incluons des certificats SSL gratuits avec nos plans d'hebergement pour securiser votre site web."
            },
            uptime: {
                keywords: ["uptime", "garantie", "disponibilite", "99.9"],
                response: "⏱️ Nous garantissons une disponibilite de 99.9% pour nos services d'hebergement pour que votre site soit toujours accessible."
            },
            backup: {
                keywords: ["sauvegarde", "restauration", "backup"],
                response: "💾 Oui, nous fournissons des sauvegardes regulieres dans le cadre de nos solutions d'hebergement et de securite. Vos donnees sont automatiquement sauvegardees."
            },
            migration: {
                keywords: ["migration", "transfert", "deplacer", "site existant"],
                response: "🔄 Oui, nous offrons une assistance pour la migration des nouveaux clients. Nous pouvons vous aider a transferer votre site existant vers nos services d'hebergement."
            },

            // --- QUESTIONS SUR LE SUPPORT ---
            support: {
                keywords: ["support", "assistance", "aide", "maintenance", "24/7", "delai", "disponibilite"],
                response: "🛠️ Notre support est disponible du lundi au vendredi, de 9h00 a 17h00. Vous pouvez nous joindre par telephone au (+212) 522-343-545 ou par email a contact@cactus.net.ma."
            },
            response_time: {
                keywords: ["delai de reponse", "reponse", "attente"],
                response: "⏳ Nous nous engageons a repondre a toutes les demandes dans les 24 heures. Pour les urgences, appelez-nous directement au (+212) 522-343-545."
            },
            post_delivery: {
                keywords: ["apres livraison", "apres projet", "contrat de maintenance", "support continu"],
                response: "🔧 Oui, nous proposons des contrats de maintenance et de support apres la livraison du projet pour assurer le bon fonctionnement de votre solution."
            },

            // --- QUESTIONS SUR LES CLIENTS ET REFERENCES ---
            references: {
                keywords: ["reference", "clients", "temoinage", "international"],
                response: "🏢 Nous travaillons avec des PME, grandes entreprises et institutions publiques. Nos clients incluent Danone, Anapec, Avon et bien d'autres. Nous pouvons fournir des references sur demande."
            },
            client_list: {
                keywords: ["qui sont vos clients", "liste des clients", "qui travaille avec vous"],
                response: "🏢 Nous travaillons avec des PME, grandes entreprises et institutions publiques. Nos clients incluent Danone, Anapec, Avon et bien d'autres."
            },
            international: {
                keywords: ["international", "etranger", "hors maroc"],
                response: "🌍 Nous travaillons principalement avec des entreprises marocaines mais sommes ouverts aux projets internationaux. Contactez-nous pour discuter de vos besoins specifiques."
            },

            // --- DEMANDES SPECIFIQUES ---
            custom: {
                keywords: ["sur mesure", "specifique", "particulier", "besoin", "projet", "personnalise"],
                response: "🔧 Oui, nous proposons des solutions sur mesure adaptees a vos besoins specifiques. Contactez-nous pour discuter de votre projet et nous trouverons la meilleure solution ensemble."
            },
            website_build: {
                keywords: ["creer un site", "site web", "developpement web"],
                response: "🌐 Oui, nous proposons des services de developpement web. Contactez-nous pour discuter de votre projet et nous vous aiderons a creer un site adapte a vos besoins."
            },
            infrastructure_help: {
                keywords: ["infrastructure", "aide it", "reseau"],
                response: "🏗️ Oui, nous proposons des services de conseil et d'infrastructure IT. Nous pouvons vous aider a concevoir, mettre en oeuvre et gerer votre infrastructure IT."
            },
            email_migration: {
                keywords: ["migration email", "email pro", "service email"],
                response: "📧 Oui, nous proposons des services de migration email. Nous pouvons vous aider a configurer des services email professionnels pour votre entreprise."
            },
            training: {
                keywords: ["formation", "apprendre", "former"],
                response: "📚 Oui, nous proposons des formations pour nos solutions logicielles afin que votre equipe puisse les utiliser efficacement."
            },

            // --- HORAIRES ---
            hours: {
                keywords: ["horaires", "ouvert", "travail", "fermeture", "quand", "horaire", "jour", "heure", "quand etes-vous ouvert"],
                response: "🕐 Nous sommes ouverts du lundi au vendredi, de 9h00 a 17h00."
            },
            // --- TELEPHONE ---
            phone: {
                keywords: ["telephone", "appeler", "numero", "contact", "phone", "appelez"],
                response: "📞 Vous pouvez nous appeler au : (+212) 522-343-545"
            },
            // --- EMAIL ---
            email: {
                keywords: ["email", "mail", "envoyer", "message", "e-mail", "adresse email"],
                response: "✉️ Envoyez-nous un email a : contact@cactus.net.ma"
            },
            // --- ADRESSE ---
            address: {
                keywords: ["adresse", "ou", "localisation", "casablanca", "bureau", "visiter", "address", "vous trouver"],
                response: "📍 Nous sommes situes au : 69 Lotissement Halioua, 20001, CASABLANCA AIN SEBAA, MAROC"
            },
            // --- SERVICES ---
            services: {
                keywords: ["service", "offre", "proposez", "faites", "aide", "propose", "fournissez", "quels services"],
                response: "Nous proposons :<br>• Hebergement Web (mutualise, VPS, dedie)<br>• Audit & Conseil IT<br>• Etude & Developpement<br>• Virtualisation<br>• Solutions Open Source<br>• Systemes de securite"
            },
            // --- HEBERGEMENT ---
            hosting: {
                keywords: ["hebergement", "hosting", "serveur", "cpanel", "ssl", "web", "dedie", "vps"],
                response: "Nous proposons de l'hebergement mutualise, VPS et serveurs dedies avec cPanel, SSL gratuit et un conseiller technique dedie."
            },
            // --- DEVELOPPEMENT ---
            development: {
                keywords: ["developpement", "development", "logiciel", "app", "application", "programmation", "code", "sur mesure"],
                response: "Nous developpons des logiciels sur mesure et des applications web adaptees a vos besoins."
            },
            // --- SECURITE ---
            security: {
                keywords: ["securite", "security", "firewall", "vpn", "sauvegarde", "backup", "proteger", "protection", "gdpr"],
                response: "Nous fournissons des systemes de securite : pare-feux, VPN, Active Directory, solutions de sauvegarde et conformite RGPD."
            },
            // --- VIRTUALISATION ---
            virtualization: {
                keywords: ["virtualisation", "virtualization", "hyper-v", "cloud", "vmware", "virtuel"],
                response: "Nous proposons des solutions de virtualisation de serveurs (Hyper-V, VMware) et des services de migration cloud."
            },
            // --- OPEN SOURCE ---
            opensource: {
                keywords: ["open source", "opensource", "crm", "erp", "cms", "linux", "libre"],
                response: "Nous utilisons des technologies open source : CRM, ERP, CMS, bases de donnees et solutions Linux."
            },
            // --- ENTREPRISE ---
            company: {
                keywords: ["entreprise", "company", "cactus", "a propos", "about", "history", "qui etes-vous", "c'est quoi cactus"],
                response: "Cactus Informatique est une entreprise IT basee a Casablanca, Maroc, fondee en 2006. Nous sommes specialises dans les services IT, l'hebergement et le developpement logiciel."
            },
            // --- CLIENTS ---
            clients: {
                keywords: ["client", "customer", "clients", "customers", "danone", "anapec", "avon", "confiance", "qui travaille avec vous"],
                response: "Nous travaillons avec des PME, grandes entreprises et institutions publiques. Nos clients incluent Danone, Anapec, Avon et bien d'autres."
            }
        }
    };

    // --- REPONSES PAR DEFAUT ---
    const defaultResponses = {
        en: "🤔 I don't have a specific answer for that. Would you like to use our contact form? Just say <strong>'give me the form'</strong>",
        fr: "🤔 Je n'ai pas de reponse specifique a cela. Souhaitez-vous utiliser notre formulaire de contact ? Dites <strong>'give me the form'</strong>"
    };

    // --- PRIORITE DES CATEGORIES (mise a jour) ---
    const priorityOrder = [
        "greetings", 
        "thanks", 
        "howareyou", 
        "acknowledge", 
        "goodbye", 
        "help",
        "who",
        "experience",
        "office",
        "hosting_explain",
        "vps_explain",
        "audit_explain",
        "software_explain",
        "mobile_apps",
        "virtualization_explain",
        "opensource_explain",
        "pricing",
        "price_list",
        "trial",
        "long_term_discount",
        "technologies",
        "wordpress",
        "ssl",
        "uptime",
        "backup",
        "migration",
        "support",
        "response_time",
        "post_delivery",
        "references",
        "client_list",
        "international",
        "custom",
        "website_build",
        "infrastructure_help",
        "email_migration",
        "training",
        "hours", 
        "phone", 
        "email", 
        "address", 
        "hosting", 
        "development", 
        "security", 
        "virtualization", 
        "opensource", 
        "services", 
        "company", 
        "clients"
    ];

    //  FONCTIONS SPECIALES (DATE & METEO)
    
    // --- Fonction pour la date ---
    function getTodayDate(lang) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateStr = now.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', options);
        return lang === 'fr' 
            ? `📅 Nous sommes aujourd'hui le ${dateStr}.` 
            : `📅 Today is ${dateStr}.`;
    }

    // --- Fonction pour la meteo ---
    async function getWeather(city, lang) {
        // --- correspondance des villes marocaines ---
        const cityMap = {
            'rabat': 'Rabat,MA',
            'casablanca': 'Casablanca,MA',
            'marrakech': 'Marrakech,MA',
            'tanger': 'Tangier,MA',
            'fes': 'Fes,MA',
            'meknes': 'Meknes,MA',
            'agadir': 'Agadir,MA',
            'oujda': 'Oujda,MA',
            'tetouan': 'Tetouan,MA',
            'nador': 'Nador,MA',
            'kenitra': 'Kenitra,MA',
            'safi': 'Safi,MA',
            'el jadida': 'El Jadida,MA',
            'settat': 'Settat,MA'
        };
        
        const lowerCity = city.toLowerCase().trim();
        let searchCity = city;
        
        if (cityMap[lowerCity]) {
            searchCity = cityMap[lowerCity];
        }
        
        const apiKey = '564b2794f532ee55bda2fa1ea4b202b5'; // Ta cle API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchCity)}&units=metric&appid=${apiKey}&lang=${lang === 'fr' ? 'fr' : 'en'}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Ville non trouvee');
            const data = await response.json();
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            const cityName = data.name;
            return lang === 'fr'
                ? `🌤️ A ${cityName}, il fait actuellement ${temp}°C avec ${desc}.`
                : `🌤️ In ${cityName}, it's currently ${temp}°C with ${desc}.`;
        } catch (error) {
            return lang === 'fr'
                ? `❌ Je n'ai pas trouve la meteo pour cette ville. Verifiez le nom ou essayez une autre ville.`
                : `❌ I couldn't find the weather for that city. Please check the name or try another city.`;
        }
    }

    //  FONCTIONS PRINCIPALES
    
    function getBotReply(message, lang) {
        const lowerMsg = message.toLowerCase();
        const kb = knowledgeBase[lang] || knowledgeBase.en;
        for (const category of priorityOrder) {
            const entry = kb[category];
            if (!entry) continue;
            for (const keyword of entry.keywords) {
                if (lowerMsg.includes(keyword)) {
                    return entry.response;
                }
            }
        }
        return null;
    }

    function addMessage(text, type) {
        const div = document.createElement('div');
        div.className = `chat-widget-message ${type}`;
        div.innerHTML = `<div class="chat-widget-message-content">${text}</div>`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    //  GESTION DE L'ENVOI 
    
    async function handleSend() {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<span class="spinner-border spinner-border-sm" style="width:16px;height:16px;"></span>';

        const lowerText = text.toLowerCase();
        const lang = isFrench ? 'fr' : 'en';

        // --- AJOUT : SI ON ATTEND UNE VILLE POUR LA METEO ---
        if (waitingForCity) {
            waitingForCity = false;
            addMessage('⏳ ' + (lang === 'fr' ? 'Je regarde la meteo...' : 'Checking the weather...'), 'bot');
            const weatherResponse = await getWeather(text.trim(), lastWeatherLang);
            addMessage(weatherResponse, 'bot');
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="bi bi-send"></i>';
            return;
        }

        // --- 1. CHANGEMENT DE LANGUE ---
        if (lowerText.includes('change to french') || lowerText.includes('changer en francais') || lowerText.includes('passer en francais')) {
            isFrench = true;
            addMessage('🇫🇷 Langue changee en francais. Comment puis-je vous aider ?', 'bot');
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="bi bi-send"></i>';
            return;
        }
        if (lowerText.includes('change to english') || lowerText.includes('changer en anglais') || lowerText.includes('passer en anglais')) {
            isFrench = false;
            addMessage('🇬🇧 Language changed to English. How can I help you?', 'bot');
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="bi bi-send"></i>';
            return;
        }

        // --- 2. DATE ---
        if (lowerText.includes('today') || lowerText.includes('date') || lowerText.includes('aujourd\'hui') || lowerText.includes('date du jour')) {
            addMessage(getTodayDate(lang), 'bot');
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="bi bi-send"></i>';
            return;
        }

        // --- 3. METEO ---
        const weatherKeywords = ['weather', 'meteo', 'temps', 'meteo', 'climat'];
        const hasWeather = weatherKeywords.some(kw => lowerText.includes(kw));
        
        const cityMatch = lowerText.match(/(?:in|a|pour|à)\s+([a-zA-Z\s\-]+)/);
        
        if (hasWeather) {
            if (cityMatch) {
                const city = cityMatch[1].trim();
                addMessage('⏳ ' + (lang === 'fr' ? 'Je regarde la meteo...' : 'Checking the weather...'), 'bot');
                const weatherResponse = await getWeather(city, lang);
                addMessage(weatherResponse, 'bot');
            } else {
                waitingForCity = true;
                lastWeatherLang = lang;
                addMessage(lang === 'fr' ? '🌤️ Pour quelle ville souhaitez-vous la meteo ?' : '🌤️ For which city would you like the weather?', 'bot');
            }
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="bi bi-send"></i>';
            return;
        }

        // --- 4. FORMULAIRE ---
        if (lowerText.includes('give me the form') || lowerText.includes('formulaire') || lowerText.includes('contact form')) {
            showContactForm();
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="bi bi-send"></i>';
            return;
        }

        // --- 5. REPONSE PAR DEFAUT ---
        const reply = getBotReply(text, lang);
        if (reply) {
            addMessage(reply, 'bot');
        } else {
            addMessage(defaultResponses[lang] || defaultResponses.en, 'bot');
        }

        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="bi bi-send"></i>';
    }

    //  FORMULAIRE DE CONTACT
    
    function showContactForm() {
        if (showForm) return;
        showForm = true;

        const div = document.createElement('div');
        div.className = 'chat-widget-message bot';
        div.innerHTML = `
            <div class="chat-widget-message-content chat-contact-form">
                <p>📩 Contact us</p>
                <form id="chatContactForm">
                    <input type="text" id="chatName" name="name" placeholder="Your name">
                    <input type="email" id="chatEmail" name="email" placeholder="Your email">
                    <textarea id="chatMessage" name="message" rows="2" placeholder="Your message..."></textarea>
                    <button type="submit">Send / Envoyer</button>
                </form>
                <div id="chatFormStatus" style="margin-top:8px;font-size:13px;"></div>
                <p style="font-size:11px;color:#6c757d;margin-top:8px;">Or call us: (+212) 522-343-545</p>
            </div>
        `;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;

        const form = document.getElementById('chatContactForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('chatName').value.trim();
                const email = document.getElementById('chatEmail').value.trim();
                const message = document.getElementById('chatMessage').value.trim();
                const status = document.getElementById('chatFormStatus');
                
                if (!name || !email || !message) {
                    status.innerHTML = '<span style="color:#dc3545;">⚠️ Fill in all fields.</span>';
                    return;
                }
                
                const submitBtn = form.querySelector('button');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                status.innerHTML = '<span style="color:#6c757d;">⏳ Sending...</span>';

                emailjs.sendForm('service_imouxba', 'template_3gyvnre', form)
                    .then(function() {
                        status.innerHTML = '<span style="color:#28a745;">✔ Message sent!</span>';
                        document.getElementById('chatName').value = '';
                        document.getElementById('chatEmail').value = '';
                        document.getElementById('chatMessage').value = '';
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Send / Envoyer';
                    })
                    .catch(function() {
                        status.innerHTML = '<span style="color:#dc3545;">❌ Error. Try again.</span>';
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Send / Envoyer';
                    });
            });
        }
    }

    //  OUVERTURE / FERMETURE
    
    floatBtn.addEventListener('click', function() {
        widget.classList.toggle('open');
        if (widget.classList.contains('open') && messages.children.length === 0) {
            addMessage('👋 Hello! I\'m the Cactus Informatique assistant.<br>💡 Write <strong>"change to French"</strong> to switch language.', 'bot');
        }
        input.focus();
    });

    closeBtn.addEventListener('click', function() {
        widget.classList.remove('open');
    });

    //  ECOUTEURS
    
    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSend();
    });

});