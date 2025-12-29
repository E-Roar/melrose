import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLanguage, Language } from './LanguageContext';

// Types for all site content
export interface SiteInfo {
    name: string;
    tagline: string;
    logo: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    city: string;
    country: string;
}

export interface HeroContent {
    title: string;
    highlight: string;
    subtitle: string;
    bannerText: string;
    stats: { value: string; label: string }[];
    ctaPrimary: string;
    ctaSecondary: string;
}

export interface Feature {
    icon: string;
    title: string;
    description: string;
    color: string;
}

export interface AboutContent {
    title: string;
    highlight: string;
    subtitle: string;
    features: Feature[];
    missionTitle: string;
    missionText: string;
}

export interface Program {
    icon: string;
    title: string;
    age: string;
    description: string;
    features: string[];
    color: string;
}

export interface ProgramsContent {
    title: string;
    highlight: string;
    subtitle: string;
    programs: Program[];
    ctaText: string;
}

export interface GalleryImage {
    id: string;
    src: string;
    title: string;
    description: string;
}

export interface GalleryContent {
    title: string;
    highlight: string;
    subtitle: string;
    images: GalleryImage[];
}

export interface ContactContent {
    title: string;
    highlight: string;
    subtitle: string;
    formTitle: string;
    whatsappCta: string;
    features: string[];
}

export interface ChatbotSettings {
    name: string;
    avatar: string;
    greeting: string;
    systemPrompt: string;
    ragFiles: string[];
    fallbackResponse: string;
}

export interface SiteData {
    siteInfo: SiteInfo;
    hero: HeroContent;
    about: AboutContent;
    programs: ProgramsContent;
    gallery: GalleryContent;
    contact: ContactContent;
    chatbot: ChatbotSettings;
}

export interface SiteContent {
    fr: SiteData;
    ar: SiteData;
}

// Default FR content
const frData: SiteData = {
    siteInfo: {
        name: 'Les Écoles Melrose',
        tagline: 'Préscolaire & Primaire',
        logo: '/src/assets/logo.png',
        email: 'lesecolesmelrose@gmail.com',
        phone: '+212 6525-61659',
        whatsapp: '212652561659',
        address: '',
        city: 'Casablanca',
        country: 'Maroc',
    },
    hero: {
        title: 'Bienvenue à',
        highlight: 'Les Écoles Melrose',
        subtitle: "Un environnement éducatif exceptionnel où chaque enfant s'épanouit, apprend et grandit avec passion et créativité.",
        bannerText: 'Inscriptions ouvertes 2024-2025',
        stats: [
            { value: '15+', label: "Ans d'expérience" },
            { value: '500+', label: 'Élèves diplômés' },
            { value: '100%', label: 'Satisfaction parents' },
        ],
        ctaPrimary: 'Inscrivez votre enfant',
        ctaSecondary: "Découvrir l'école",
    },
    about: {
        title: 'Pourquoi',
        highlight: 'Melrose',
        subtitle: "Depuis plus de 15 ans, nous accompagnons les enfants dans leur épanouissement scolaire et personnel avec amour et dévouement.",
        features: [
            { icon: 'BookOpen', title: 'Pédagogie Innovante', description: "Méthodes d'enseignement modernes adaptées à chaque enfant.", color: 'blue' },
            { icon: 'Users', title: 'Équipe Qualifiée', description: 'Enseignants passionnés et formés aux dernières méthodes pédagogiques.', color: 'purple' },
            { icon: 'Star', title: 'Excellence Académique', description: 'Programme éducatif rigoureux préparant les élèves aux défis de demain.', color: 'yellow' },
            { icon: 'Award', title: 'Suivi Personnalisé', description: 'Accompagnement individuel de chaque élève pour garantir sa réussite.', color: 'green' },
            { icon: 'Palette', title: 'Activités Créatives', description: 'Arts plastiques, théâtre et activités manuelles.', color: 'red' },
            { icon: 'Music', title: 'Éveil Musical', description: 'Initiation à la musique et au chant.', color: 'orange' },
        ],
        missionTitle: 'Notre Mission',
        missionText: "Offrir à chaque enfant un environnement d'apprentissage stimulant et bienveillant.",
    },
    programs: {
        title: 'Nos',
        highlight: 'Programmes',
        subtitle: "Des programmes pédagogiques adaptés à chaque niveau.",
        programs: [
            { icon: 'Baby', title: 'Préscolaire', age: '3 - 5 ans', description: "Un environnement ludique et sécurisé.", features: ['Éveil sensoriel', 'Activités manuelles', 'Initiation aux chiffres', 'Jeux éducatifs'], color: 'yellow' },
            { icon: 'BookOpen', title: 'CP - CE1 - CE2', age: '6 - 8 ans', description: 'Acquisition des fondamentaux.', features: ['Lecture et écriture', 'Calcul mental', 'Découverte du monde', 'Expression orale'], color: 'blue' },
            { icon: 'Calculator', title: 'CM1 - CM2', age: '9 - 11 ans', description: 'Approfondissement des connaissances.', features: ['Sciences', 'Histoire-Géographie', 'Langues vivantes', 'Méthodologie'], color: 'purple' },
            { icon: 'Globe', title: 'Langues', age: 'Tous niveaux', description: 'Apprentissage multilingue.', features: ['Arabe littéraire', 'Français', 'Anglais', 'Communication'], color: 'green' },
        ],
        ctaText: "Demander plus d'informations",
    },
    gallery: {
        title: 'Notre',
        highlight: 'Galerie',
        subtitle: "Découvrez nos espaces d'apprentissage modernes et colorés.",
        images: [
            { id: '1', src: '/src/assets/gallery-1.jpg', title: 'Salle de classe', description: 'Environnement coloré et stimulant' },
            { id: '2', src: '/src/assets/gallery-2.jpg', title: 'Aire de jeux', description: 'Activités en plein air' },
            { id: '3', src: '/src/assets/gallery-3.jpg', title: 'Bibliothèque', description: 'Coin lecture confortable' },
            { id: '4', src: '/src/assets/gallery-4.jpg', title: 'Atelier créatif', description: 'Arts plastiques et créativité' },
            { id: '5', src: '/src/assets/gallery-5.jpg', title: 'Salle de musique', description: 'Éveil musical et expression' },
            { id: '6', src: '/src/assets/gallery-6.jpg', title: 'Laboratoire', description: 'Découverte scientifique' },
        ],
    },
    contact: {
        title: '',
        highlight: 'Contactez',
        subtitle: 'Vous avez des questions ? Nous serons ravis de vous répondre.',
        formTitle: "Demande d'inscription",
        whatsappCta: 'Contactez-nous sur WhatsApp',
        features: ['Réponse sous 24h garantie', "Visite de l'école sur rendez-vous", 'Accompagnement personnalisé'],
    },
    chatbot: {
        name: 'Assistant Melrose',
        avatar: '/src/assets/chatbot-avatar.png',
        greeting: "Bonjour ! 👋 Je suis l'assistant virtuel des Écoles Melrose. Comment puis-je vous aider ?",
        systemPrompt: "Tu es l'assistant virtuel des Écoles Melrose, une école préscolaire et primaire à Casablanca. Réponds en français de manière amicale et professionnelle.",
        ragFiles: [],
        fallbackResponse: "Merci pour votre message ! Pour plus d'informations, veuillez remplir notre formulaire de contact ou nous appeler. 📞",
    },
};

// Default AR content
const arData: SiteData = {
    siteInfo: {
        name: 'مدارس ميلروز',
        tagline: 'روض وحضانة وابتدائي',
        logo: '/src/assets/logo.png',
        email: 'lesecolesmelrose@gmail.com',
        phone: '+212 6525-61659',
        whatsapp: '212652561659',
        address: '',
        city: 'الدار البيضاء',
        country: 'المغرب',
    },
    hero: {
        title: 'مرحباً بكم في',
        highlight: 'مدارس ميلروز',
        subtitle: "بيئة تعليمية استثنائية حيث يزدهر كل طفل، يتعلم وينمو بشغف وإبداع.",
        bannerText: 'التسجيل مفتوح 2024-2025',
        stats: [
            { value: '+15', label: "سنة خبرة" },
            { value: '+500', label: "خريج" },
            { value: '100%', label: "رضا الآباء" },
        ],
        ctaPrimary: 'سجل طفلك',
        ctaSecondary: "اكتشف المدرسة",
    },
    about: {
        title: 'لماذا',
        highlight: 'ميلروز',
        subtitle: "لأكثر من 15 عاماً، نرافق الأطفال في تطورهم الدراسي والشخصي بحب وتفان.",
        features: [
            { icon: 'BookOpen', title: 'طرق تدريس مبتكرة', description: "مناهج حديثة تتكيف مع احتياجات كل طفل.", color: 'blue' },
            { icon: 'Users', title: 'فريق مؤهل', description: 'أساتذة شغوفون ومدربون على أحدث الطرق البيداغوجية.', color: 'purple' },
            { icon: 'Star', title: 'تميز أكاديمي', description: 'برنامج تعليمي قوي يجهز التلاميذ لتحديات المستقبل.', color: 'yellow' },
            { icon: 'Award', title: 'متابعة شخصية', description: 'مرافقة فردية لكل تلميذ لضمان نجاحه.', color: 'green' },
            { icon: 'Palette', title: 'أنشطة إبداعية', description: 'فنون تشكيلية، مسرح وأنشطة يدوية.', color: 'red' },
            { icon: 'Music', title: 'إيقاظ موسيقي', description: 'مبادئ أولية في الموسيقى والغناء.', color: 'orange' },
        ],
        missionTitle: 'رسالتنا',
        missionText: "توفير بيئة تعليمية محفزة وراعية لكل طفل لضمان نموه السليم.",
    },
    programs: {
        title: 'اكتشف',
        highlight: 'برامجنا',
        subtitle: "برامج تعليمية تتناسب مع كل مستوى عمري لضمان التفوق.",
        programs: [
            { icon: 'Baby', title: 'التعليم الأولي', age: '3 - 5 سنوات', description: "بيئة ممتعة وآمنة للتعلم.", features: ['إيقاظ الحواس', 'أنشطة يدوية', 'مبادئ الحساب', 'ألعاب تعليمية'], color: 'yellow' },
            { icon: 'BookOpen', title: 'التعليم الابتدائي (1-3)', age: '6 - 8 سنوات', description: 'اكتساب الأساسيات.', features: ['القراءة والكتابة', 'الحساب الذهني', 'اكتشاف العالم', 'التعبير الشفهي'], color: 'blue' },
            { icon: 'Calculator', title: 'التعليم الابتدائي (4-5)', age: '9 - 11 سنة', description: 'تعميق المعارف.', features: ['العلوم', 'التاريخ والجغرافيا', 'لغات حية', 'منهجية العمل'], color: 'purple' },
            { icon: 'Globe', title: 'اللغات', age: 'جميع المستويات', description: 'تعليم متعدد اللغات.', features: ['العربية الفصحى', 'الفرنسية', 'النتجليزية', 'مهارات التواصل'], color: 'green' },
        ],
        ctaText: "طلب المزيد من المعلومات",
    },
    gallery: {
        title: 'جولة في',
        highlight: 'المعرض',
        subtitle: "اكتشف فضاءات التعلم الحديثة والملونة لدينا.",
        images: [...frData.gallery.images], // Keeping same images for now
    },
    contact: {
        title: '',
        highlight: 'تواصل معنا',
        subtitle: 'لديك أسئلة؟ يسعدنا الإجابة عليها في أقرب وقت.',
        formTitle: "طلب تسجيل",
        whatsappCta: 'تواصل معنا عبر واتساب',
        features: ['رد مضمون خلال 24 ساعة', "زيارة المدرسة بموعد مسبق", 'مرافقة وإرشاد'],
    },
    chatbot: {
        name: 'مساعد ميلروز',
        avatar: '/src/assets/chatbot-avatar.png',
        greeting: "مرحباً! 👋 أنا المساعد الذكي لمدارس ميلروز. كيف يمكنني مساعدتك؟",
        systemPrompt: "أنت المساعد الافتراضي لمدارس ميلروز، مدرسة أولية وابتدائية في الدار البيضاء. أجب باللغة العربية بطريقة ودية ومهنية.",
        ragFiles: [],
        fallbackResponse: "شكراً لرسالتك! للمزيد من المعلومات يرجى ملء استمارة التواصل أو الاتصال بنا. 📞",
    },
};

const defaultContent: SiteContent = {
    fr: frData,
    ar: arData,
};

interface SiteContextType {
    content: SiteData;
    fullContent: SiteContent;
    updateSiteInfo: (info: Partial<SiteInfo>, lang?: Language) => void;
    updateHero: (hero: Partial<HeroContent>, lang?: Language) => void;
    updateAbout: (about: Partial<AboutContent>, lang?: Language) => void;
    updatePrograms: (programs: Partial<ProgramsContent>, lang?: Language) => void;
    updateGallery: (gallery: Partial<GalleryContent>, lang?: Language) => void;
    updateContact: (contact: Partial<ContactContent>, lang?: Language) => void;
    updateChatbot: (chatbot: Partial<ChatbotSettings>, lang?: Language) => void;
    resetToDefaults: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const STORAGE_KEY = 'melrose_site_content_v2';

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { language } = useLanguage();

    const [fullContent, setFullContent] = useState<SiteContent>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Migration check or fallback
                if (parsed.fr && parsed.ar) return { ...defaultContent, ...parsed };
            } catch {
                return defaultContent;
            }
        }
        return defaultContent;
    });

    // Current language content convenience accessor
    const content = fullContent[language];

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fullContent));
    }, [fullContent]);

    const updateSection = <K extends keyof SiteData>(
        section: K,
        data: Partial<SiteData[K]>,
        lang: Language = language
    ) => {
        setFullContent(prev => ({
            ...prev,
            [lang]: {
                ...prev[lang],
                [section]: { ...prev[lang][section], ...data }
            }
        }));
    };

    const updateSiteInfo = (info: Partial<SiteInfo>, lang?: Language) => updateSection('siteInfo', info, lang);
    const updateHero = (hero: Partial<HeroContent>, lang?: Language) => updateSection('hero', hero, lang);
    const updateAbout = (about: Partial<AboutContent>, lang?: Language) => updateSection('about', about, lang);
    const updatePrograms = (programs: Partial<ProgramsContent>, lang?: Language) => updateSection('programs', programs, lang);
    const updateGallery = (gallery: Partial<GalleryContent>, lang?: Language) => updateSection('gallery', gallery, lang);
    const updateContact = (contact: Partial<ContactContent>, lang?: Language) => updateSection('contact', contact, lang);
    const updateChatbot = (chatbot: Partial<ChatbotSettings>, lang?: Language) => updateSection('chatbot', chatbot, lang);

    const resetToDefaults = () => {
        setFullContent(defaultContent);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <SiteContext.Provider value={{
            content,
            fullContent,
            updateSiteInfo,
            updateHero,
            updateAbout,
            updatePrograms,
            updateGallery,
            updateContact,
            updateChatbot,
            resetToDefaults,
        }}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSiteContent = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error('useSiteContent must be used within a SiteProvider');
    }
    return context;
};

export { defaultContent };
