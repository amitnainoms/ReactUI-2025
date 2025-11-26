import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const usersData = localStorage.getItem('users');
            if (!usersData) {
                setError('No users registered. Please register first.');
                return;
            }

            let users;
            try {
                users = JSON.parse(usersData);
            } catch {
                setError('Invalid user data. Please contact support.');
                return;
            }

            const userExists = users.find(user => user.email === email && user.password === password);
            if (userExists) {
                setError('');
                localStorage.setItem('loggedInUser', email);
                navigate('/login-successful', { state: { email } });
            } else {
                setError('Invalid email or password.');
            }
        } catch {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#ecf0f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container style={{maxWidth: '400px'}}>
            <Card className="shadow-lg border-0">
                <Card.Body className="p-5">
                    <h2 className="text-center mb-4" style={{ color: '#2c3e50', fontWeight: '700' }}>Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <Button variant="primary" size="lg" className="w-100 mt-2" onClick={handleLogin} style={{ backgroundColor: '#3498db', borderColor: '#3498db', fontWeight: '600' }}>
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
}