import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

type Message = { role: 'user' | 'assistant' | 'system'; content: string };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY ?? '';

  const appendMessage = (m: Message) => setMessages((s) => [...s, m]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    appendMessage(userMsg);
    setInput('');
    setLoading(true);

    try {
      const body = JSON.stringify({
        model: import.meta.env.VITE_GROQ_MODEL || 'llama-3.3-70b-versatile',
        messages: [
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: userMsg.role, content: userMsg.content },
        ],
      });

      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body,
      });

      const data = await res.json();

      let assistantText = '';
      if (data.output_text) assistantText = data.output_text;
      else if (data.choices && data.choices[0]) {
        assistantText = data.choices[0].text || data.choices[0].message?.content || '';
      } else if (data.result) assistantText = String(data.result);
      else assistantText = JSON.stringify(data);

      appendMessage({ role: 'assistant', content: assistantText });
    } catch (err: any) {
      appendMessage({ role: 'assistant', content: 'Failed to get a response from the AI service.' });
      console.error('Chat error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">IonIoTtech Chat</h1>
        <p className="text-sm text-muted-foreground mt-1"></p>
      </motion.div>

      <div className="space-y-4">
        {/* Chat window with responsive height */}
        <div className="bg-white rounded-xl shadow-sm border p-4 h-[60vh] md:h-[65vh] overflow-y-auto scrollbar-thin">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              Start a conversation...
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`mb-4 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
                m.role === 'user' 
                ? 'bg-primary text-primary-foreground rounded-tr-none' 
                : 'bg-gray-100 text-gray-900 rounded-tl-none'
              }`}>
                <p className="text-sm md:text-base whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-2 md:gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void send(); }}
            placeholder="Ask about IonIoTtech..."
            className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <button 
            onClick={() => void send()} 
            disabled={loading} 
            className="px-4 py-3 md:px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center font-medium disabled:opacity-50 transition-colors"
          >
            <Send className={`w-4 h-4 ${loading ? 'animate-pulse' : ''} md:mr-2`} /> 
            <span className="hidden md:inline">{loading ? '...' : 'Send'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}