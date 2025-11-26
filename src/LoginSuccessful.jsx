import { useLocation } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';

export default function LoginSuccessful() {
    const location = useLocation();
    const email = location.state?.email;

    return (
        <Container className="py-5" style={{maxWidth: '500px'}}>
            <Alert variant="success" className="text-center shadow-lg border-0" style={{ padding: '3rem' }}>
                <Alert.Heading style={{ fontSize: '2rem', fontWeight: '700', color: '#27ae60' }}>Login Successful</Alert.Heading>
                <p className="mb-0" style={{ fontSize: '1.2rem', color: '#2c3e50', fontWeight: '500' }}>Welcome, {email}!</p>
            </Alert>
        </Container>
    );
}