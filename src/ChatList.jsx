import { useState, useEffect } from 'react';
import { Container, Card, Alert, Form, Button, InputGroup } from 'react-bootstrap';
import { BsChatDotsFill, BsSendFill, BsArrowClockwise } from 'react-icons/bs';

export default function ChatList() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        loadMessages();
        loadLoggedInUser();
    }, []);

    const loadLoggedInUser = () => {
        const loggedInEmail = localStorage.getItem('loggedInUser');
        if (loggedInEmail) {
            const usersData = localStorage.getItem('users');
            if (usersData) {
                const users = JSON.parse(usersData);
                const user = users.find(u => u.email === loggedInEmail);
                if (user) {
                    setCurrentUser(user.name);
                }
            }
        }
    };

    const loadMessages = () => {
        const chatData = localStorage.getItem('chatMessages');
        if (chatData) {
            setMessages(JSON.parse(chatData));
        }
    };

    const formatDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleSend = () => {
        if (newMessage.trim()) {
            const message = {
                id: Date.now(),
                user: currentUser,
                text: newMessage,
                timestamp: formatDateTime()
            };
            const updatedMessages = [...messages, message];
            setMessages(updatedMessages);
            localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
            setNewMessage('');
        }
    };

    const handleRefresh = () => {
        loadMessages();
    };

    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Header className="bg-primary text-white">
                    <h4 className="mb-0">
                        <BsChatDotsFill className="me-2" size={24} />
                        Group Chat
                    </h4>
                </Card.Header>
                <Card.Body>
                    <Alert variant="info" className="mb-3">
                        <strong>Logged in as:</strong> {currentUser || 'Not logged in'}
                    </Alert>
                    <div className="chat-messages mb-3" style={{height: '400px', overflowY: 'auto', border: '1px solid #dee2e6', borderRadius: '5px', padding: '15px', backgroundColor: '#f8f9fa'}}>
                        {messages.length === 0 ? (
                            <p className="text-muted text-center">No messages yet. Start the conversation!</p>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg.id} className="mb-3">
                                    <div className="bg-white p-2 rounded shadow-sm">
                                        <div className="text-muted small mb-1">
                                            <strong>{msg.user}</strong> - {msg.timestamp}
                                        </div>
                                        <div>{msg.text}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <InputGroup>
                        <InputGroup.Text>
                            <strong>{currentUser || 'Guest'}</strong>
                        </InputGroup.Text>
                        <Form.Control 
                            type="text" 
                            placeholder="Type your message..." 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <Button variant="primary" onClick={handleSend}>
                            <BsSendFill className="me-1" /> Send
                        </Button>
                        <Button variant="secondary" onClick={handleRefresh}>
                            <BsArrowClockwise className="me-1" /> Refresh
                        </Button>
                    </InputGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}