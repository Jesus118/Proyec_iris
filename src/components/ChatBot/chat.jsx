import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../services/auth';
import { getChatHistory, sendMessage } from '../../services/chatService';
import './Chatbot.css';

const Chatbot = () => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);  // Nuevo estado para controlar la visibilidad del chat
  const messagesEndRef = useRef(null);

  // Cargar historial al iniciar
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getChatHistory(token);
        if (history.length > 0) {
          setMessages(history);
        } else {
          setMessages([{
            text: "Hola, soy Iris. ¿Cómo estás hoy? Puedes hablarme de lo que necesites.",
            sender: "bot"
          }]);
        }
      } catch (error) {
        setMessages([{
          text: "Hola, soy Iris. Estoy aquí para ayudarte.",
          sender: "bot"
        }]);
      }
    };

    loadHistory();
  }, [token]);

  // Auto-scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;
  
    // Agregar mensaje del usuario
    const userMsg = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);
  
    try {
      // Enviar el mensaje (sin pasar el token, ya está siendo manejado por el interceptor)
      const { reply} = await sendMessage(inputMessage); 
      setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Lo siento, estoy teniendo problemas técnicos. Por favor intenta más tarde.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Función para alternar la visibilidad del chat
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <>
      {/* Botón flotante */}
      <div className="chatbot-float-btn" onClick={toggleChat}>
        <span>💬</span>
      </div>

      {isChatOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Asistente Iris</h3>
            <p>Tu compañero de salud emocional</p>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading || !inputMessage.trim()}
            >
              Enviar
            </button>
          </div>

          <div className="chatbot-disclaimer">
            <p><strong>Importante:</strong> Soy un asistente virtual. Para ayuda profesional, por favor consulta con un especialista.</p>
            <p>Si estás en crisis, contacta a tu línea local de ayuda.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
