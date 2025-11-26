import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { BsPersonCheck, BsPersonPlus } from 'react-icons/bs';

export default function Welcome() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogoutAlert, setShowLogoutAlert] = useState(location.state?.loggedOut);

    useEffect(() => {
        if (showLogoutAlert) {
            const timer = setTimeout(() => setShowLogoutAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showLogoutAlert]);

    return (
        <Container style={{maxWidth: '600px'}}>
            <div className="text-center mt-5 mb-4">
                {showLogoutAlert && (
                    <Alert variant="info" dismissible onClose={() => setShowLogoutAlert(false)}>
                        <i className="bi bi-info-circle me-2"></i>
                        You have been logged out
                    </Alert>
                )}
                <h2 className="fw-bold text-primary mb-4">Welcome to Users Module</h2>
            </div>
            
            <Row className="g-4 mt-3">
                <Col md={6}>
                    <Card className="shadow-sm h-100 border-primary">
                        <Card.Body className="text-center p-4">
                            <div className="mb-3">
                                <BsPersonCheck className="text-primary" size={48} />
                            </div>
                            <h5 className="card-title fw-bold mb-3">Existing User</h5>
                            <Button variant="primary" size="lg" className="w-100" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={6}>
                    <Card className="shadow-sm h-100 border-success">
                        <Card.Body className="text-center p-4">
                            <div className="mb-3">
                                <BsPersonPlus className="text-success" size={48} />
                            </div>
                            <h5 className="card-title fw-bold mb-3">New User</h5>
                            <Button variant="success" size="lg" className="w-100" onClick={() => navigate('/register')}>
                                Register
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}