import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { BsCheckCircleFill } from 'react-icons/bs';

export default function RegisterSuccessful() {
    return (
        <Container style={{maxWidth: '500px', marginTop: '50px'}}>
            <Card className="shadow border-success">
                <Card.Body className="text-center p-5">
                    <div className="mb-4">
                        <BsCheckCircleFill className="text-success" size={64} />
                    </div>
                    <h2 className="text-success fw-bold mb-3">Registration Successful</h2>
                    <p className="lead mb-4">Thank you for Registration</p>
                    <Button as={Link} to="/" variant="primary" size="lg">
                        Click to return to home page
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}