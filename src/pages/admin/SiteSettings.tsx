import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSiteContent } from '@/contexts/SiteContext';
import { Settings, Save, RotateCcw, Building2, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SiteSettings = () => {
    const { content, updateSiteInfo, resetToDefaults } = useSiteContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState(content.siteInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        updateSiteInfo(formData);
        toast({
            title: "Paramètres sauvegardés",
            description: "Les modifications ont été enregistrées.",
        });
    };

    const handleReset = () => {
        resetToDefaults();
        setFormData(content.siteInfo);
        toast({
            title: "Réinitialisé",
            description: "Tous les paramètres ont été réinitialisés.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                        <Settings className="w-8 h-8 text-melrose-purple" />
                        Paramètres du site
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Configurez les informations générales de votre site
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="neo" onClick={handleReset}>
                        <RotateCcw className="w-4 h-4" />
                        Réinitialiser
                    </Button>
                    <Button variant="gradient" onClick={handleSave}>
                        <Save className="w-4 h-4" />
                        Sauvegarder
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Identity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                Identité
                            </CardTitle>
                            <CardDescription>
                                Nom et slogan de votre établissement
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Nom du site</label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Les Écoles Melrose"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Slogan</label>
                                <Input
                                    name="tagline"
                                    value={formData.tagline}
                                    onChange={handleChange}
                                    placeholder="Préscolaire & Primaire"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                Contact
                            </CardTitle>
                            <CardDescription>
                                Coordonnées de contact
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Email
                                </label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="contact@example.com"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> Téléphone
                                </label>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+212 6XX-XXXXXX"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                                    <Globe className="w-4 h-4" /> WhatsApp
                                </label>
                                <Input
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="212XXXXXXXXX"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Location */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Adresse
                            </CardTitle>
                            <CardDescription>
                                Localisation de votre établissement
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Adresse</label>
                                    <Input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="123 Rue Example"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Ville</label>
                                    <Input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Casablanca"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Pays</label>
                                    <Input
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Maroc"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default SiteSettings;
