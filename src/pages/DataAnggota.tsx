import { useState } from "react";
import Layout from "../components/Layout";
import { Dropdown } from "react-bootstrap";
import Anggota from "../components/data-anggota/Anggota";
import Member from "../components/data-anggota/Member";
import Course from "../components/data-anggota/Course";

export default function DataAnggota() {
  const [filter, setFilter] = useState('anggota');

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data {filter === 'anggota' ? 'Anggota' : filter === 'members' ? 'Members' : 'Course'}</h2>

        <div className='d-flex gap-4'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className='px-4 rounded-pill '>
              {filter === 'anggota' ? 'Anggota' : filter === 'members' ? 'Members' : 'Course'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilter('anggota')}>
                Anggota
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('members')}>
                Members
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('course')}>
                Course
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {filter === 'anggota' ? (
        <Anggota/>
      ) : filter === 'members' ? (
        <Member/>
      ) : (
        <Course/>
      )}
    </Layout>
  )
}