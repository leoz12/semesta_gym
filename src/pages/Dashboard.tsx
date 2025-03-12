import Layout from '../components/Layout';
import { Card, Row, Col } from 'react-bootstrap';
import { Users, DollarSign, Activity, Calendar } from 'lucide-react';

export default function Dashboard() {
  // Dummy data for dashboard stats
  const stats = [
    {
      title: 'Total Members',
      value: '250',
      icon: <Users size={24} />,
      color: 'primary'
    },
    {
      title: 'Monthly Revenue',
      value: 'Rp 25.000.000',
      icon: <DollarSign size={24} />,
      color: 'success'
    },
    {
      title: 'Active Trainers',
      value: '12',
      icon: <Activity size={24} />,
      color: 'info'
    },
    {
      title: 'Classes Today',
      value: '8',
      icon: <Calendar size={24} />,
      color: 'warning'
    }
  ];

  return (
    <Layout>
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        {stats.map((stat, index) => (
          <Col key={index} md={3} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">{stat.title}</h6>
                    <h3 className="mb-0">{stat.value}</h3>
                  </div>
                  <div className={`text-${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}