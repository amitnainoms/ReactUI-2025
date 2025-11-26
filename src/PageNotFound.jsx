import { Container, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#ecf0f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container className="text-center" style={{ maxWidth: '600px' }}>
            <Alert variant="danger" className="shadow-lg border-0" style={{ padding: '3rem' }}>
                <Alert.Heading style={{ fontSize: '3rem', fontWeight: '700', color: '#e74c3c' }}>404</Alert.Heading>
                <Alert.Heading style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2c3e50' }}>Page Not Found</Alert.Heading>
                <p style={{ fontSize: '1.1rem', color: '#7f8c8d' }}>The page you are looking for does not exist.</p>
            </Alert>
            <Button variant="primary" size="lg" onClick={() => navigate('/')} style={{ backgroundColor: '#3498db', borderColor: '#3498db', fontWeight: '600', padding: '0.75rem 2rem' }}>Go to Home</Button>
        </Container>
        </div>
    );
}