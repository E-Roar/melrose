import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteContent } from '@/contexts/SiteContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    Settings,
    Image,
    MessageCircle,
    Users,
    GraduationCap,
    Phone,
    Home,
    Eye,
    Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
    const { content } = useSiteContent();
    const { t } = useLanguage();

    const quickLinks = [
        { label: t.admin.siteSettings, href: '/admin/site', icon: Settings, color: 'melrose-purple' },
        { label: t.admin.hero, href: '/admin/hero', icon: Home, color: 'melrose-blue' },
        { label: t.admin.about, href: '/admin/about', icon: Users, color: 'melrose-green' },
        { label: t.admin.programs, href: '/admin/programs', icon: GraduationCap, color: 'melrose-yellow' },
        { label: t.admin.gallery, href: '/admin/gallery', icon: Image, color: 'melrose-red' },
        { label: t.admin.contact, href: '/admin/contact', icon: Phone, color: 'melrose-orange' },
        { label: t.admin.chatbot, href: '/admin/chatbot', icon: MessageCircle, color: 'melrose-purple' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display">
                        {t.admin.dashboard}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {t.admin.welcome}
                    </p>
                </div>
                <Button variant="gradient" asChild>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 rtl:ml-2 rtl:-mr-1" />
                        {t.common.backToSite}
                    </a>
                </Button>
            </div>

            {/* Site Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        {t.admin.siteSettings}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 rounded-2xl bg-muted/50">
                            <p className="text-sm text-muted-foreground">{t.settings.title}</p>
                            <p className="font-semibold mt-1">{content.siteInfo.name}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/50">
                            <p className="text-sm text-muted-foreground">{t.admin.email}</p>
                            <p className="font-semibold mt-1">{content.siteInfo.email}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/50">
                            <p className="text-sm text-muted-foreground">{t.admin.phone}</p>
                            <p className="font-semibold mt-1">{content.siteInfo.phone}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/50">
                            <p className="text-sm text-muted-foreground">{t.admin.city}</p>
                            <p className="font-semibold mt-1">{content.siteInfo.city}, {content.siteInfo.country}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Links */}
            <div>
                <h2 className="text-xl font-bold font-display mb-4">
                    {t.admin.quickLinks}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {quickLinks.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link to={item.href}>
                                <Card className="h-full hover:-translate-y-1 transition-all cursor-pointer group">
                                    <CardContent className="p-6">
                                        <div className={`w-12 h-12 rounded-2xl bg-${item.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            <item.icon className={`w-6 h-6 text-${item.color}`} />
                                        </div>
                                        <h3 className="font-semibold">{item.label}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {t.common.edit}
                                        </p>
                                        <div className="flex items-center gap-1 mt-3 text-sm text-melrose-purple">
                                            <Edit className="w-4 h-4" />
                                            {t.common.edit}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>{t.admin.stats}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 rounded-2xl shadow-neo-sm">
                            <div className="text-3xl font-bold gradient-text">{content.gallery.images.length}</div>
                            <p className="text-sm text-muted-foreground mt-1">{t.admin.gallery}</p>
                        </div>
                        <div className="text-center p-4 rounded-2xl shadow-neo-sm">
                            <div className="text-3xl font-bold gradient-text">{content.programs.programs.length}</div>
                            <p className="text-sm text-muted-foreground mt-1">{t.admin.programs}</p>
                        </div>
                        <div className="text-center p-4 rounded-2xl shadow-neo-sm">
                            <div className="text-3xl font-bold gradient-text">{content.about.features.length}</div>
                            <p className="text-sm text-muted-foreground mt-1">{t.settings.features}</p>
                        </div>
                        <div className="text-center p-4 rounded-2xl shadow-neo-sm">
                            <div className="text-3xl font-bold gradient-text">{content.hero.stats.length}</div>
                            <p className="text-sm text-muted-foreground mt-1">{t.admin.statsHero}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
