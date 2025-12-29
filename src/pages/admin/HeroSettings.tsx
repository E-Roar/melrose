import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSiteContent } from '@/contexts/SiteContext';
import { Home, Save, Sparkles, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HeroSettings = () => {
    const { content, updateHero } = useSiteContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState(content.hero);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStatChange = (index: number, field: 'value' | 'label', value: string) => {
        const newStats = [...formData.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setFormData({ ...formData, stats: newStats });
    };

    const handleSave = () => {
        updateHero(formData);
        toast({
            title: "Section Hero sauvegardée",
            description: "Les modifications ont été enregistrées.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                        <Home className="w-8 h-8 text-melrose-blue" />
                        Section Accueil (Hero)
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Personnalisez la première section visible de votre site
                    </p>
                </div>
                <Button variant="gradient" onClick={handleSave}>
                    <Save className="w-4 h-4" />
                    Sauvegarder
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Contenu principal
                            </CardTitle>
                            <CardDescription>
                                Titre et texte d'accroche
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Titre</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Bienvenue à"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Texte en surbrillance</label>
                                <Input
                                    name="highlight"
                                    value={formData.highlight}
                                    onChange={handleChange}
                                    placeholder="Les Écoles Melrose"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Sous-titre</label>
                                <Textarea
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Description de l'école..."
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Bannière d'inscription</label>
                                <Input
                                    name="bannerText"
                                    value={formData.bannerText}
                                    onChange={handleChange}
                                    placeholder="Inscriptions ouvertes 2024-2025"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Boutons d'action</CardTitle>
                            <CardDescription>
                                Texte des boutons CTA
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Bouton principal</label>
                                <Input
                                    name="ctaPrimary"
                                    value={formData.ctaPrimary}
                                    onChange={handleChange}
                                    placeholder="Inscrivez votre enfant"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Bouton secondaire</label>
                                <Input
                                    name="ctaSecondary"
                                    value={formData.ctaSecondary}
                                    onChange={handleChange}
                                    placeholder="Découvrir l'école"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Statistiques
                            </CardTitle>
                            <CardDescription>
                                Chiffres clés affichés dans le hero
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {formData.stats.map((stat, index) => (
                                    <div key={index} className="p-4 rounded-2xl bg-muted/50 space-y-3">
                                        <div>
                                            <label className="text-xs text-muted-foreground">Valeur</label>
                                            <Input
                                                value={stat.value}
                                                onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                                placeholder="15+"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-muted-foreground">Label</label>
                                            <Input
                                                value={stat.label}
                                                onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                                placeholder="Ans d'expérience"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSettings;
