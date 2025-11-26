import { useState, useEffect } from 'react';
import { Container, Table, Button, ButtonGroup, Modal, Form } from 'react-bootstrap';

export default function DocumentList() {
    const [showModal, setShowModal] = useState(false);
    const [uploads, setUploads] = useState([]);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const userEmail = localStorage.getItem('loggedInUser') || 'user@example.com';

    useEffect(() => {
        const savedUploads = localStorage.getItem('uploads');
        if (savedUploads) {
            try {
                setUploads(JSON.parse(savedUploads));
            } catch (err) {
                console.error('Failed to load uploads');
            }
        }
    }, []);

    const handleUpload = () => {
        if (editIndex !== null ? description : (description && file)) {
            let updated;
            if (editIndex !== null) {
                updated = [...uploads];
                updated[editIndex] = { ...updated[editIndex], label: description };
                setEditIndex(null);
            } else {
                updated = [...uploads, { label: description, filename: file.name, sharedBy: userEmail, deleted: false }];
            }
            setUploads(updated);
            localStorage.setItem('uploads', JSON.stringify(updated));
            setDescription('');
            setFile(null);
            setShowModal(false);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setDescription(uploads[index].label);
        setShowModal(true);
    };

    const handleDelete = (index) => {
        const updated = [...uploads];
        updated[index] = { ...updated[index], deleted: true };
        setUploads(updated);
        localStorage.setItem('uploads', JSON.stringify(updated));
    };

    return (
        <Container className="py-4">
            <h2 className="mb-4" style={{ color: '#2c3e50', fontWeight: '600' }}>My Uploads</h2>
            <Table striped bordered hover className="bg-white shadow-sm">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Filename</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {uploads.filter(upload => upload.sharedBy === userEmail && !upload.deleted).map((upload, index) => {
                        const actualIndex = uploads.indexOf(upload);
                        return (
                            <tr key={index}>
                                <td>{upload.label}</td>
                                <td>{upload.filename}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button variant="primary" size="sm" onClick={() => handleEdit(actualIndex)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(actualIndex)}>Delete</Button>
                                        <Button variant="success" size="sm">Share</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <h2 className="mt-5 mb-4" style={{ color: '#2c3e50', fontWeight: '600' }}>Shared Uploads</h2>
            <Table striped bordered hover className="bg-white shadow-sm">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Filename</th>
                        <th>Shared by</th>
                    </tr>
                </thead>
                <tbody>
                    {uploads.filter(upload => upload.sharedBy !== userEmail).map((upload, index) => (
                        <tr key={index}>
                            <td>{upload.label}</td>
                            <td>{upload.filename}</td>
                            <td>{upload.sharedBy}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="primary" size="lg" className="mt-3" onClick={() => setShowModal(true)} style={{ backgroundColor: '#3498db', borderColor: '#3498db' }}>Add Upload</Button>

            <Modal show={showModal} onHide={() => { setShowModal(false); setEditIndex(null); setDescription(''); setFile(null); }}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? 'Edit Upload' : 'Add Upload'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>File Description</Form.Label>
                            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        {editIndex === null && (
                            <Form.Group>
                                <Form.Label>File Upload</Form.Label>
                                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowModal(false); setEditIndex(null); setDescription(''); setFile(null); }}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpload}>{editIndex !== null ? 'Update' : 'Upload Now'}</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}