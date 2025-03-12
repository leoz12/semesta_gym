import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge, Button, Form, InputGroup, Table } from "react-bootstrap";
import { api } from "../../services/api";
import ModalEditCourse from "./ModalEditCourse";
import ModalCreateCourse from "./ModalCreateCourse";

interface AnggotaCourses {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  Courses: any[];
}

export default function Course() {
  const [searchTerm, setSearchTerm] = useState('');
  const [anggotaCourses, setAnggotaCourses] = useState<AnggotaCourses[]>([]);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [anggotaCourse, setAnggotaCourse] = useState({});

  useEffect(() => {
    api.get('/user').then(res => {
      const member = res.filter((user: any) => {
        return user.role === 'member';
      });
      setAnggotaCourses(member);
    }).catch(error => {
      console.error(error);
    });
  }, [
    createModalShow,
    editModalShow
  ]);

  const listMembers = anggotaCourses.filter((user: any) => {
    return user.Courses.length !== 0;
  }).filter((user: any) => {
    return user.Courses.some((course: any) => new Date(course.endDate) > new Date());
  });

  const filteredMembers = listMembers.filter((member) => {
    const data = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                member.phone.includes(searchTerm);
    return data;
  });

  return (
    <div>
      <div className="mb-4 d-flex justify-content-between">
        <Form.Group style={{ width: '300px' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Cari members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text>
              <Search size={20} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" className="d-flex align-items-center gap-2 rounded-pill px-3" onClick={() => setCreateModalShow(true)}>
          Tambah Member Course
          <Plus size={20} />
        </Button>
      </div>

      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No.Hp</th>
            <th>Pembayaran</th>
            <th>Expired</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{new Date(member.Courses[member.Courses.length - 1].createdAt).toLocaleDateString()}</td>
              <td>{new Date(member.Courses[member.Courses.length - 1].endDate).toLocaleDateString()}</td>
              <td>
                <Badge bg="primary" pill>Course</Badge>
              </td>
              <td>
                <Button 
                  variant="link" 
                  className="p-0"
                  onClick={() => {
                    setAnggotaCourse(member);
                    setEditModalShow(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalCreateCourse
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />

      <ModalEditCourse
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        anggotaCourse={anggotaCourse}
      />
    </div>
  )
}