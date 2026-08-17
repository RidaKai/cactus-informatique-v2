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

    //  BASE DE CONNAISSANCES
    
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
                response: "😊 I'm doing great, thank you for asking! How can I help you today?"
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
            // --- HORAIRES ---
            hours: {
                keywords: ["hours", "open", "working", "time", "work", "closing", "close", "schedule", "when", "business hours", "opening", "closing time", "what time"],
                response: "🕐 We are open Monday to Friday, from 9:00 AM to 5:00 PM."
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
                response: "📍 We are located at: 69 Lotissement Halioua, 20001, CASABLANCA AIN SEBAA, MOROCCO"
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

    // --- PRIORITE DES CATEGORIES ---
    const priorityOrder = ["greetings", "thanks", "howareyou", "acknowledge", "goodbye", "help", "hours", "phone", "email", "address", "hosting", "development", "security", "virtualization", "opensource", "services", "company", "clients"];

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

    // --- Fonction pour la meteo (CORRIGEE avec clé API et villes) ---
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

        // --- 3. METEO (version amelioree avec memoire) ---
        const weatherKeywords = ['weather', 'meteo', 'temps', 'meteo', 'climat'];
        const hasWeather = weatherKeywords.some(kw => lowerText.includes(kw));
        
        // Verifier si une ville est deja mentionnee dans la question
        const cityMatch = lowerText.match(/(?:in|a|pour|à)\s+([a-zA-Z\s\-]+)/);
        
        if (hasWeather) {
            if (cityMatch) {
                // Ville deja donnee dans la question
                const city = cityMatch[1].trim();
                addMessage('⏳ ' + (lang === 'fr' ? 'Je regarde la meteo...' : 'Checking the weather...'), 'bot');
                const weatherResponse = await getWeather(city, lang);
                addMessage(weatherResponse, 'bot');
            } else {
                // On demande la ville et on active la memoire
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