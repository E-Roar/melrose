import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Navigation as NavIcon, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useSiteContent } from '@/contexts/SiteContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MCPClient } from '@/lib/mcp-client';
import chatbotAvatar from '@/assets/chatbot-avatar.png';

interface Message {
  role: 'user' | 'bot' | 'system';
  content: string;
  toolCall?: string | null;
  toolResult?: any;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { content } = useSiteContent();
  const { language } = useLanguage();
  const { chatbot } = content;

  // Initialize MCP client for navigation tools
  const mcpClient = new MCPClient(language, content);

  // Load messages from persistent session (shared across tabs)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem('melrose_chat_messages');
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
      // ignore parse errors and fall back to fresh session
    }

    // New session: show initial greeting
    setMessages([{ role: 'bot', content: chatbot.greeting }]);
  }, [chatbot.greeting]);

  // Persist messages for session continuity across reloads/tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('melrose_chat_messages', JSON.stringify(messages));
    } catch {
      // ignore storage errors
    }
  }, [messages]);

  // Clear API error when language or content changes
  useEffect(() => {
    setApiError(null);
  }, [language, content]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setApiError(null);

    // Clear any existing debounce
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Add user message locally
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Build conversation history (last 10 messages)
      // Convert 'bot' to 'assistant' for OpenRouter API
      const history = messages.slice(-10).map(msg => ({
        role: (msg.role === 'bot' ? 'assistant' : msg.role) as 'user' | 'assistant' | 'system',
        content: msg.content,
      }));

      // Update MCP client with latest content/language
      mcpClient.currentLanguage = language;
      mcpClient.content = content;

      // Call MCP client (handles system prompt, tools, etc.)
      const response = await mcpClient.chat(userMessage, history);

      // Add bot response
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: response.content || '',
          toolCall: response.toolCall,
          toolResult: response.toolResult,
        },
      ]);
    } catch (error: any) {
      console.error('Chatbot error:', error);
      
      let errorMessage = chatbot.fallbackResponse;
      let isError = true;

      // Handle specific error types
      if (error?.status === 429) {
        errorMessage = language === 'fr' 
          ? "Désolé, trop de requêtes. Veuillez réessayer dans quelques secondes."
          : "عذراً، هناك طلبات كثيرة جداً. يرجى المحاولة مرة أخرى بعد بضع ثوانٍ.";
        isError = false; // Temporary error, not permanent
      } else if (error?.status === 429 || error?.message?.includes('Too Many Requests')) {
        errorMessage = language === 'fr'
          ? "Je suis un peu occupé. Attendez quelques secondes avant d'essayer."
          : "أنا مشغول قليلاً. انتظر بضع ثوانٍ قبل المحاولة مرة أخرى.";
        isError = false;
      } else if (error?.message?.includes('Rate limit')) {
        errorMessage = language === 'fr'
          ? "Veuillez patienter, nous traitons votre demande."
          : "يرجى الانتظار، نحن نعالج طلبك.";
        isError = false;
      } else if (error?.message?.includes('Network') || error?.message?.includes('fetch')) {
        errorMessage = language === 'fr'
          ? "Erreur de connexion. Vérifiez votre internet."
          : "خطأ في الاتصال. تحقق من اتصال الإنترنت الخاص بك.";
        isError = false;
      } else if (error?.message?.includes('API key')) {
        errorMessage = language === 'fr'
          ? "Erreur de configuration. Veuillez contacter l'administrateur."
          : "خطأ في الإعدادات. يرجى التواصل مع المسؤول.";
      }

      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: errorMessage,
      }]);

      if (isError) {
        setApiError(errorMessage);
        setTimeout(() => setApiError(null), 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    setTimeout(() => handleSend(), 100);
  };

  const quickActions = [
    {
      icon: NavIcon,
      label: language === 'fr' ? 'Découvrir nos programmes' : 'اكتشف برامجنا',
      prompt: language === 'fr' 
        ? 'Quels programmes proposez-vous ?' 
        : 'ما هي البرامج التي تقدمونها؟',
    },
    {
      icon: Phone,
      label: language === 'fr' ? 'Contacter l\'école' : 'اتصل بالمدرسة',
      prompt: language === 'fr' 
        ? 'Je veux contacter l\'école pour plus d\'informations' 
        : 'أريد التواصل مع المدرسة للحصول على مزيد من المعلومات',
    },
    {
      icon: Mail,
      label: language === 'fr' ? 'Inscrire mon enfant' : 'سجل طفلي',
      prompt: language === 'fr' 
        ? 'Comment puis-je inscrire mon enfant ?' 
        : 'كيف يمكنني تسجيل طفلي؟',
    },
  ];

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 md:w-20 md:h-20 rounded-full shadow-neo-lg bg-gradient-to-br from-melrose-purple to-melrose-blue p-1 hover:shadow-glow-rainbow transition-all"
        aria-label="Open chat"
      >
        <img 
          src={chatbotAvatar} 
          alt="Assistant" 
          className="w-full h-full rounded-full object-cover"
          loading="lazy"
        />
      </motion.button>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-2rem)]"
          >
            <Card variant="glass" className="overflow-hidden glow-rainbow">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-melrose-purple to-melrose-blue flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={chatbotAvatar} 
                    alt="Assistant" 
                    className="w-12 h-12 rounded-full border-2 border-white/50"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1 text-white">
                  <p className="font-bold">{chatbot.name}</p>
                  <p className="text-xs opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {language === 'fr' ? 'En ligne' : 'متصل'}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)} 
                  className="text-white hover:bg-white/20"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="p-3 bg-background/50 border-b border-border/50">
                <p className="text-xs text-muted-foreground mb-2">
                  {language === 'fr' ? 'Actions rapides' : 'إجراءات سريعة'}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {quickActions.map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-background shadow-neo-sm hover:shadow-neo transition-all min-h-[50px]"
                    >
                      {action.icon && (
                        <action.icon className="w-5 h-5 text-melrose-purple" />
                      )}
                      <span className="text-xs font-medium text-center">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3 bg-background/80">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-melrose-purple text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-2xl'
                        : 'bg-muted rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-2xl shadow-neo-sm'
                    } font-quicksand rtl:font-tajawal`}>
                      {msg.toolCall && (
                        <div className="flex items-center gap-1 text-xs opacity-70 mb-1">
                          <Sparkles className="w-3 h-3 text-melrose-purple" />
                          <span>
                            {msg.toolCall === 'scrollToSection' 
                              ? (language === 'fr' ? 'Navigation' : 'تنقل')
                              : 'Action'
                            }
                          </span>
                        </div>
                      )}
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted rounded-2xl rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-2xl shadow-neo-sm">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.4,
                              repeat: Infinity,
                              delay: i * 0.12,
                              ease: 'easeInOut',
                            }}
                            className="w-2 h-2 rounded-full bg-melrose-purple"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border/50 flex gap-2 bg-background/90">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder={language === 'fr' ? 'Votre message...' : 'رسالتك...'}
                  className="flex-1 h-10 font-quicksand rtl:font-tajawal"
                  disabled={isLoading}
                />
                <Button
                  variant="gradient"
                  size="icon"
                  onClick={handleSend}
                  className="h-10 w-10"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <Send className="w-4 h-4 rtl:rotate-180" />
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
