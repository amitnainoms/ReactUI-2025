import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Table, Button } from "react-bootstrap";
import { BsPeopleFill, BsPencilSquare, BsTrash } from 'react-icons/bs';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usersData = localStorage.getItem("users");
    if (usersData) {
      setUsers(JSON.parse(usersData));
    }
  }, []);

  const handleEdit = (user) => {
    localStorage.setItem("editUser", JSON.stringify(user));
    navigate("/edituser");
  };

  const handleDeleteClick = (id) => {
    localStorage.setItem("deleteUserId", id);
    navigate("/delete");
  };

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">
            <BsPeopleFill className="me-2" size={24} />
            User Management
          </h4>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 align-middle">
                      <strong>{item.name}</strong>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <span className="text-muted">{item.email}</span>
                    </td>
                    <td className="px-4 py-3 align-middle text-center">
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                        <BsPencilSquare className="me-1" /> Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                        <BsTrash className="me-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
