import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import chatbotAvatar from '@/assets/chatbot-avatar.png';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Bonjour ! 👋 Je suis l\'assistant virtuel des Écoles Melrose. Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Merci pour votre message ! Pour plus d\'informations, veuillez remplir notre formulaire de contact ou nous appeler au +212 6525-61659. 📞' 
      }]);
    }, 1000);
    setInput('');
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full shadow-neo-lg bg-gradient-to-br from-melrose-purple to-melrose-blue p-1 hover:shadow-glow-rainbow transition-all"
      >
        <img src={chatbotAvatar} alt="Assistant" className="w-full h-full rounded-full object-cover" />
      </motion.button>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 right-6 z-50 w-[340px] max-w-[calc(100vw-3rem)]"
          >
            <Card variant="glass" className="overflow-hidden glow-rainbow">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-melrose-purple to-melrose-blue flex items-center gap-3">
                <img src={chatbotAvatar} alt="Assistant" className="w-12 h-12 rounded-full border-2 border-white/50" />
                <div className="flex-1 text-white">
                  <p className="font-bold">Assistant Melrose</p>
                  <p className="text-xs opacity-80">En ligne</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3 bg-background/80">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-melrose-purple text-white rounded-br-none' 
                        : 'bg-muted rounded-bl-none shadow-neo-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border/50 flex gap-2 bg-background/90">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Votre message..."
                  className="flex-1 h-10"
                />
                <Button variant="gradient" size="icon" onClick={handleSend} className="h-10 w-10">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
