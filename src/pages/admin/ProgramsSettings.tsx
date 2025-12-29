import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSiteContent } from '@/contexts/SiteContext';
import { GraduationCap, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProgramsSettings = () => {
    const { content, updatePrograms } = useSiteContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState(content.programs);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProgramChange = (index: number, field: string, value: string | string[]) => {
        const newPrograms = [...formData.programs];
        newPrograms[index] = { ...newPrograms[index], [field]: value };
        setFormData({ ...formData, programs: newPrograms });
    };

    const handleSave = () => {
        updatePrograms(formData);
        toast({
            title: "Section Programmes sauvegardée",
            description: "Les modifications ont été enregistrées.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 text-melrose-yellow" />
                        Section Programmes
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Gérez vos programmes éducatifs
                    </p>
                </div>
                <Button variant="gradient" onClick={handleSave}>
                    <Save className="w-4 h-4" />
                    Sauvegarder
                </Button>
            </div>

            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Titre de section</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Titre</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Mot clé</label>
                                <Input
                                    name="highlight"
                                    value={formData.highlight}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Bouton CTA</label>
                                <Input
                                    name="ctaText"
                                    value={formData.ctaText}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="text-sm font-medium mb-2 block">Sous-titre</label>
                            <Textarea
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                rows={2}
                            />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Programs */}
            <div className="grid md:grid-cols-2 gap-6">
                {formData.programs.map((program, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">{program.title || `Programme ${index + 1}`}</CardTitle>
                                <CardDescription>
                                    Tranche d'âge: {program.age}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Titre</label>
                                        <Input
                                            value={program.title}
                                            onChange={(e) => handleProgramChange(index, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Âge</label>
                                        <Input
                                            value={program.age}
                                            onChange={(e) => handleProgramChange(index, 'age', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Description</label>
                                    <Textarea
                                        value={program.description}
                                        onChange={(e) => handleProgramChange(index, 'description', e.target.value)}
                                        rows={2}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Points clés (séparés par virgule)</label>
                                    <Input
                                        value={program.features.join(', ')}
                                        onChange={(e) => handleProgramChange(index, 'features', e.target.value.split(', '))}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProgramsSettings;
