import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Table, Form, InputGroup, Dropdown, Card, Button, Row, Col } from 'react-bootstrap';
import { Search } from 'lucide-react';
import { api } from '../services/api';
import numeral from 'numeral';

interface Transactions {
  id: number;
  User: any;
  paidAt: string;
  title: string;
  amount: string;
  status: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    api.get('/payments').then(res => {
      setTransactions(res)
    }).catch(error => {
      console.error(error);
    });
  }, [searchTerm, filterMonth, filterYear]);

  const totalAmount = transactions.reduce((acc, transaction) => {
    return acc + parseInt(transaction.amount);
  }, 0);
  
  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.User.name.toLowerCase().includes(searchTerm.toLowerCase());
  })

  const handleFilter = () => {
    setShow(!show)

    const filteredTransactions = transactions.filter((transaction) => {
      const paidDate = new Date(transaction.paidAt);
      const paidMonth = (paidDate.getMonth() + 1).toString();
      const paidYear = paidDate.getFullYear().toString();
      return paidMonth === filterMonth && paidYear === filterYear;
    });
    setTransactions(filteredTransactions);
  }

  const handleResetFilter = () => {
    setShow(!show)
    
    setFilterMonth('');
    setFilterYear('');
    setTransactions(transactions);
  }

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data Transaksi</h2>
      </div>
      <div className="mb-4 d-flex justify-content-between">
        <div className='d-flex gap-4'>
          <Dropdown autoClose={false} className="d-inline">
            <Dropdown.Toggle id="dropdown-autoclose-false" className='px-4 rounded-pill' onClick={() => setShow(!show)}>
              Filter
            </Dropdown.Toggle>

            <Dropdown.Menu show={show}>
              <Card style={{ width: '23rem' }} className='border-0'>
                <Card.Body>
                  <Row>
                    <Col>
                      <Form.Select
                        onChange={(e) => setFilterMonth(e.target.value)}
                        aria-label="Default select example">
                        <option>Bulan</option>
                        <option value="1">Januari</option>
                        <option value="2">Februari</option>
                        <option value="3">Maret</option>
                        <option value="4">April</option>
                        <option value="5">Mei</option>
                        <option value="6">Juni</option>
                        <option value="7">Juli</option>
                        <option value="8">Agustus</option>
                        <option value="9">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select
                        onChange={(e) => setFilterYear(e.target.value)} 
                        aria-label="Default select example">
                        <option>Tahun</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <div className='d-flex justify-content-center mt-4 gap-4'>
                    <Button variant="secondary" onClick={handleResetFilter}>Reset</Button>
                    <Button variant="primary" onClick={handleFilter}>Confirm</Button>
                  </div>
                </Card.Body>
              </Card>
            </Dropdown.Menu>
          </Dropdown>
          <Form.Group style={{ width: '300px' }}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text>
                <Search size={20} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </div>
        <div>
          <h5>Total pembayaran: Rp.{numeral(totalAmount).format('0,0')}</h5>
        </div>
      </div>

      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Jadwal Pembayaran</th>
            <th>Paket Pembayaran</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.User.name}</td>
              <td>{new Date(transaction.paidAt).toLocaleDateString()}</td>
              <td>{transaction.title}</td>
              <td>{numeral(transaction.amount).format('0,0')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
}