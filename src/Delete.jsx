import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import UserList from './UserList';

export default function Delete() {
    const navigate = useNavigate();

    const confirmDelete = () => {
        const deleteUserId = parseInt(localStorage.getItem("deleteUserId"));
        const usersData = localStorage.getItem("users");
        if (usersData && deleteUserId) {
            const users = JSON.parse(usersData);
            const deletedUser = users.find(user => user.id === deleteUserId);
            const updatedUsers = users.filter(user => user.id !== deleteUserId);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            
            if (deletedUser) {
                const uploadsData = localStorage.getItem("uploads");
                if (uploadsData) {
                    const uploads = JSON.parse(uploadsData);
                    const updatedUploads = uploads.filter(upload => upload.sharedBy !== deletedUser.email);
                    localStorage.setItem("uploads", JSON.stringify(updatedUploads));
                }
            }
            
            localStorage.removeItem("deleteUserId");
        }
        navigate("/manageusers");
    };

    const closeModal = () => {
        localStorage.removeItem("deleteUserId");
        navigate("/manageusers");
    };

    return (
        <>
            <UserList />
            <Modal show={true} onHide={closeModal} centered backdrop="static">
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Confirm User Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
