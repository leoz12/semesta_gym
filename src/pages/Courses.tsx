import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { Search, Plus } from 'lucide-react';
import { api } from '../services/api';
import CreateModal from '../components/courses/CreateModal';
import logo from '../assets/images/logo.png';
import EditModal from '../components/courses/EditModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import numeral from 'numeral';

interface Course {
  id: number;
  picture: string;
  name: string;
  TrainingFocu: any;
  numberOfPractices: number;
}

export default function Courses() {
  const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [createModalShow, setCreateModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [priceCourse, setPriceCourse] = useState(0);
  const [price, setPrice] = useState('');

  useEffect(() => {
    api.get('/courses/data-course').then(res => {
      setCourses(res)
    }).catch(error => {
      console.error(error);
    });

    api.get('/pricelist/courses').then(res => {
      setPriceCourse(res.price);
      setPrice(res.price);
    }).catch(error => {
      console.error(error);
    });
  }, [createModalShow, editModalShow]);

  const filteredCourses = courses.filter((course) => {
    return course.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEditCourse = (e: any) => {
    api.get(`/courses/data-course/${e}`).then(res => {
      setCourse(res);
    }).catch(error => {
      console.error(error);
    });
  }

  const handleUpdatePrice = () => {
    if(priceCourse === 0) {
      api.post('/pricelist', { 
        name: 'courses',
        price: price.replace(/,/g, '')
      }).then(res => {
        showSwal('Harga Course berhasil diupdate');
        console.log(res);
      }).catch(error => {
        console.error(error);
      });
    } else {
      api.put('/pricelist/courses', {
        price: price.replace(/,/g, '')
      }).then(res => {
        showSwal('Harga Course berhasil diupdate');
        console.log(res);
      }).catch(error => {
        console.error(error);
      });
    }
  }

  const showSwal = (text:string) => {
    withReactContent(Swal).fire({
      title: "Berhasil",
      text: text,
      icon: "success",
    })
  }

  const formatNumber = (value: any) => {
    const numberValue = value.replace(/[^0-9]/g, '');
    return new Intl.NumberFormat().format(numberValue);
  };

  const handlePriceChange = (e:any) => {
    const formattedValue = formatNumber(e.target.value);
    setPrice(formattedValue);
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data Course</h2>
        <Button variant="primary" className="d-flex align-items-center gap-2 rounded-pill px-3" onClick={() => setCreateModalShow(true)}>
          Tambah Course
          <Plus size={20} />
        </Button>
      </div>

      <div className="mb-4 d-flex justify-content-between">
        <div className='d-flex gap-3 align-items-end'>
          <Form.Group style={{ width: '300px' }}>
            <Form.Label>Harga Course</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="0" 
              value={numeral(price).format('0,0')}
              onChange={handlePriceChange}
            />
          </Form.Group>
          <Button 
            variant="primary"
            onClick={handleUpdatePrice}
          >
            Save
          </Button>
        </div>
        <Form.Group style={{ width: '300px' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Cari course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text>
              <Search size={20} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </div>

      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nama Course</th>
            <th>Fokus Pelatihan</th>
            <th>Jumlah Praktik</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course, index) => (
            <tr key={course.id}>
              <td>{index + 1}</td>
              <td>
                <img src={course.picture !== null ? `${BASE_URL}/${course.picture}` : logo} alt={course.name} width={50} height={50}/>
              </td>
              <td>{course.name}</td>
              <td>{course.TrainingFocu.name}</td>
              <td>{course.numberOfPractices}</td>
              <td>
                <Button 
                  variant="link" 
                  className="p-0"
                  onClick={() => {
                    setEditModalShow(true);
                    handleEditCourse(course.id);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CreateModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />

      <EditModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        course={course}
      />
    </Layout>
  );
}