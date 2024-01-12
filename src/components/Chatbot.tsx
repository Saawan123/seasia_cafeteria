import React, { useState, useEffect } from 'react';
import "../components/chatbox.scss"
interface Message {
    text: string;
    isUser: boolean;
}

const ChatBot: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsChatOpen(true);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);
    useEffect(() => {
        // Initial greeting from the chatbot
        addMessage({ text: 'Hello! How can I help you today?', isUser: false });
    }, []);

    const addMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        addMessage({ text: input, isUser: true });


        setTimeout(async () => {
            const botResponse = await fetchBotResponse(input);
            addMessage({ text: botResponse, isUser: false });
            setInput('');
        }, 1000);
    };

    const fetchBotResponse = async (userInput: string): Promise<string> => {

        return new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve(`Ram Ram bhai: ${userInput}`);
            }, 1000);
        });
    };

    const handleToggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleClearChat = () => {
        setMessages([]);
    };

    return (
        <div>
            <div
                className='chat-box-btn'
                onClick={handleToggleChat}
            >
                <span>{isChatOpen ? '⨯' : '💬'}</span>
            </div>

            {isChatOpen && (
                <div style={{ position: 'fixed', bottom: '80px', right: '20px', width: '300px', zIndex: 999 }}>
                    <div className='chat-box'>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                style={{ marginBottom: '10px', color: message.isUser ? 'blue' : 'green' }}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className=' my-2 gap-2 d-flex' style={{ position: 'absolute', bottom: '0px', left: '3px', width: '100%' }}>
                        <input type="text" value={input} className="input-style mb-1"onChange={handleUserInput} />
                        <button onClick={handleSendMessage} className='chat-btn'>Send</button>
                        <button onClick={handleClearChat} className='chat-btn'>Clear</button>
                    </div>
                </div>
            )}




        </div>
    );
};

export default ChatBot;
