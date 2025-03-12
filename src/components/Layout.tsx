import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Dumbbell, FileText, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NavDashboard from './ui/NavDashboard';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container fluid>
      <Row>
        <NavDashboard />
      </Row>  
      <Row className='bg-primary-custom'>
        <Col md={3} className='px-4'>
        </Col>
        <Col md={9} className="px-4 pt-4">
          <h4 className="mb-4 text-white">Laporan</h4>
        </Col>
      </Row>
      <Row>
        <div className='px-4 sidebar-wrapper'>
          <div className="sidebar p-0">
            <div className="p-3 profile">
              <div className='d-flex justify-content-center align-items-center flex-column'>
                <h4 className="text-black">{user.name}</h4>
                <span className='badge'>Admin</span>
              </div>
            </div>
            <Nav className="flex-column">
              <Nav.Link 
                href="/personal-trainer"
                active={location.pathname === '/personal-trainer'}
                className="d-flex align-items-center gap-2 text-black"
              >
                <Dumbbell size={20} />
                Personal Trainer
              </Nav.Link>
              <Nav.Link 
                href="/members"
                active={location.pathname === '/members'}
                className="d-flex align-items-center gap-2 text-black"
              >
                <Users size={20} />
                Data Anggota
              </Nav.Link>
              <Nav.Link 
                href="/transactions"
                active={location.pathname === '/transactions'}
                className="d-flex align-items-center gap-2 text-black"
              >
                <FileText size={20} />
                Transaksi
              </Nav.Link>
              <Nav.Link 
                href="/courses"
                active={location.pathname === '/courses'}
                className="d-flex align-items-center gap-2 text-black"
              >
                <BookOpen size={20} />
                Course
              </Nav.Link>
              <Nav.Link 
                onClick={handleLogout}
                className="d-flex align-items-center gap-2 mt-4 text-black"
              >
                <LogOut size={20} />
                Logout
              </Nav.Link>
            </Nav>
          </div>
        </div>
        <div className='content-wrapper'>
          <div className='content'>
            {children}
          </div>
        </div>
      </Row>
    </Container>
  );
}