import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!fullName || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            const usersData = localStorage.getItem('users');
            const users = usersData ? JSON.parse(usersData) : [];
            if (users.find(u => u.email === email)) {
                setError('Email already registered.');
                return;
            }
            const newUser = {
                id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                name: fullName,
                email: email,
                password: password
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            navigate('/register-successful', { state: { fullName, email } });
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#ecf0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
        <Container style={{maxWidth: '400px'}}>
            <Card className="shadow-lg border-0">
                <Card.Body className="p-5">
                    <h2 className="text-center mb-4" style={{ color: '#2c3e50', fontWeight: '700' }}>Register</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Full Name</Form.Label>
                            <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Confirm Password</Form.Label>
                            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="success" size="lg" className="w-100 mt-2" onClick={handleRegister} style={{ backgroundColor: '#27ae60', borderColor: '#27ae60', fontWeight: '600' }}>Register</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
}