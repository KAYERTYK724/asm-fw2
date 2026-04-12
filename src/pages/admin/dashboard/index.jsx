/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { FaChartLine, FaChartBar, FaChartArea, FaChartPie } from 'react-icons/fa';
/* Import thư viện biểu đồ */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './style.css';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Dashboard = () => {
    // Dữ liệu cho Biểu đồ cột (Worldwide Sales)
    const barData = {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
            { label: 'USA', data: [15, 30, 55, 65, 60, 80, 95], backgroundColor: 'rgba(235, 22, 22, .7)' },
            { label: 'UK', data: [8, 35, 40, 60, 70, 55, 75], backgroundColor: 'rgba(235, 22, 22, .5)' },
            { label: 'AU', data: [12, 25, 45, 55, 65, 70, 60], backgroundColor: 'rgba(235, 22, 22, .3)' },
        ],
    };

    // Dữ liệu cho Biểu đồ đường/vùng (Sales & Revenue)
    const lineData = {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
            {
                fill: true,
                label: 'Doanh số',
                data: [100, 130, 170, 150, 190, 180, 270],
                borderColor: '#EB1616',
                backgroundColor: 'rgba(235, 22, 22, .5)',
            },
            {
                fill: true,
                label: 'Doanh thu',
                data: [20, 35, 55, 45, 70, 65, 85],
                borderColor: '#000',
                backgroundColor: 'rgba(235, 22, 22, .3)',
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, labels: { color: '#6C7293' } } },
        scales: {
            y: { grid: { color: '#000' }, ticks: { color: '#6C7293' } },
            x: { grid: { color: '#000' }, ticks: { color: '#6C7293' } }
        }
    };

    const stats = [
        { title: 'Doanh thu hôm nay', value: '$1234', icon: <FaChartLine size={40} /> },
        { title: 'Tổng doanh thu', value: '$1234', icon: <FaChartBar size={40} /> },
        { title: 'Lợi nhuận hôm nay', value: '$1234', icon: <FaChartArea size={40} /> },
        { title: 'Tổng lợi nhuận', value: '$1234', icon: <FaChartPie size={40} /> }
    ];

    return (
        <Container fluid className="pt-4 px-4">
            {/* Thẻ thống kê */}
            <Row className="g-4">
                {stats.map((item, idx) => (
                    <Col key={idx} sm={6} xl={3}>
                        <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4 box-card">
                            <div className="text-primary">{item.icon}</div>
                            <div className="ms-3 text-end text-white">
                                <p className="mb-2">{item.title}</p>
                                <h6 className="mb-0 fw-bold">{item.value}</h6>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* PHẦN BIỂU ĐỒ MỚI THÊM */}
            <Row className="g-4 mt-2">
                <Col sm={12} xl={6}>
                    <div className="bg-secondary text-center rounded p-4 h-100">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0 text-white">Doanh số thế giới</h6>
                            <a href="#" className="text-primary text-decoration-none">Xem tất cả</a>
                        </div>
                        <div style={{ height: '230px' }}>
                            <Bar data={barData} options={options} />
                        </div>
                    </div>
                </Col>
                <Col sm={12} xl={6}>
                    <div className="bg-secondary text-center rounded p-4 h-100">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0 text-white">Doanh số & Doanh thu</h6>
                            <a href="#" className="text-primary text-decoration-none">Xem tất cả</a>
                        </div>
                        <div style={{ height: '230px' }}>
                            <Line data={lineData} options={options} />
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Bảng doanh số */}
            <div className="bg-secondary text-center rounded p-4 mt-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0 text-white">Doanh số gần đây</h6>
                    <a href="#" className="text-primary text-decoration-none">Xem tất cả</a>
                </div>
                <Table responsive hover className="text-start align-middle table-dark mb-0 custom-table">
                    <thead>
                        <tr className="text-white border-bottom border-dark">
                            <th><Form.Check type="checkbox" /></th>
                            <th>Ngày</th>
                            <th>Hóa đơn</th>
                            <th>Khách hàng</th>
                            <th>Số tiền</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <tr key={i} className="border-bottom border-dark">
                                <td><Form.Check type="checkbox" /></td>
                                <td>01 Jan 2045</td>
                                <td>INV-0123</td>
                                <td>Jhon Doe</td>
                                <td>$123</td>
                                <td>Đã thanh toán</td>
                                <td><Button size="sm" className="btn-primary">Chi tiết</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default Dashboard;