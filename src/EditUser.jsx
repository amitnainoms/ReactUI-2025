import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { BsPersonGear, BsSave } from 'react-icons/bs';

export default function EditUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const editUserData = localStorage.getItem('editUser');
        if (editUserData) {
            const user = JSON.parse(editUserData);
            setName(user.name);
            setEmail(user.email);
            setUserId(user.id);
            localStorage.removeItem('editUser');
        }
    }, []);

    const handleSave = () => {
        const usersData = localStorage.getItem('users');
        if (usersData && userId) {
            const users = JSON.parse(usersData);
            const updatedUsers = users.map(user => 
                user.id === userId ? { ...user, name, email } : user
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.removeItem('editUser');
            navigate('/manageusers');
        }
    };

    return (
        <Container style={{maxWidth: '500px', marginTop: '50px'}}>
            <Card className="shadow">
                <Card.Header className="bg-primary text-white">
                    <h4 className="mb-0">
                        <BsPersonGear className="me-2" size={24} />
                        Edit User Information
                    </h4>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Full Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </Form.Group>
                        <Button variant="primary" className="w-100" onClick={handleSave}>
                        <BsSave className="me-2" /> Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}