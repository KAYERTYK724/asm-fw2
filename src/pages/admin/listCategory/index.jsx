/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import AdminLayout from '../../../layout/admin/admin-layout';
import './style.css';

const defaultCategories = [
  { id: 1, name: 'Điện tử', description: 'Thiết bị điện tử và phụ kiện', status: 'Active', createdAt: '2024-01-10' },
  { id: 2, name: 'Thời trang', description: 'Quần áo nam và nữ', status: 'Active', createdAt: '2024-01-12' },
  { id: 3, name: 'Sách', description: 'Tất cả các loại sách', status: 'Inactive', createdAt: '2024-01-15' },
  { id: 4, name: 'Thực phẩm', description: 'Thực phẩm tươi và đồ ăn vặt', status: 'Active', createdAt: '2024-01-18' },
  { id: 5, name: 'Thể thao', description: 'Dụng cụ thể thao', status: 'Active', createdAt: '2024-01-20' },
];

const ListCategory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editErrors, setEditErrors] = useState({});

  // Load từ localStorage, nếu chưa có thì dùng default
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  // Mỗi khi categories thay đổi → lưu vào localStorage
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này không?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleEditOpen = (cat) => {
    setEditData({ ...cat });
    setEditErrors({});
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
    setEditData(null);
    setEditErrors({});
  };

  const validateEdit = () => {
    const errs = {};
    if (!editData.name.trim()) errs.name = 'Tên danh mục không được để trống';
    else if (editData.name.trim().length < 2) errs.name = 'Tên danh mục phải có ít nhất 2 ký tự';
    if (!editData.description.trim()) errs.description = 'Mô tả không được để trống';
    else if (editData.description.trim().length < 10) errs.description = 'Mô tả phải có ít nhất 10 ký tự';
    return errs;
  };

  const handleEditSave = () => {
    const errs = validateEdit();
    if (Object.keys(errs).length > 0) {
      setEditErrors(errs);
      return;
    }
    setCategories(categories.map((c) => (c.id === editData.id ? editData : c)));
    handleEditClose();
  };

  return (
    <AdminLayout title="Danh sách danh mục">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Tất cả danh mục ({categories.length})</h6>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/admin/category/add')}>
                <FaPlus className="me-2" />Thêm danh mục
              </button>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-dark border-0 text-light"
                placeholder="Tìm kiếm danh mục..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-white">
                    <th>#</th>
                    <th>Tên danh mục</th>
                    <th>Mô tả</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((cat, i) => (
                      <tr key={cat.id}>
                        <td>{i + 1}</td>
                        <td>{cat.name}</td>
                        <td>{cat.description}</td>
                        <td>
                          <span className={`badge ${cat.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                            {cat.status === 'Active' ? 'Hoạt động' : 'Ẩn'}
                          </span>
                        </td>
                        <td>{cat.createdAt}</td>
                        <td>
                          <button className="btn btn-sm btn-info me-2" onClick={() => handleEditOpen(cat)}>
                            <FaEdit />
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">Không tìm thấy danh mục</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-light">Hiển thị {filtered.length} / {categories.length} danh mục</small>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <a className="page-link bg-secondary border-0" href="#">Trước</a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link bg-primary border-0" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link bg-secondary border-0" href="#">Sau</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Sửa */}
      {editModal && editData && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-secondary text-light">
              <div className="modal-header border-0">
                <h5 className="modal-title">Sửa danh mục</h5>
                <button className="btn btn-sm btn-outline-light" onClick={handleEditClose}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Tên danh mục <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control bg-dark border-0 text-light ${editErrors.name ? 'is-invalid' : ''}`}
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                  {editErrors.name && <div className="invalid-feedback">{editErrors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Mô tả <span className="text-danger">*</span></label>
                  <textarea
                    className={`form-control bg-dark border-0 text-light ${editErrors.description ? 'is-invalid' : ''}`}
                    rows={3}
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  />
                  {editErrors.description && <div className="invalid-feedback">{editErrors.description}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Trạng thái</label>
                  <select
                    className="form-select bg-dark border-0 text-light"
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  >
                    <option value="Active">Hoạt động</option>
                    <option value="Inactive">Ẩn</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-outline-secondary" onClick={handleEditClose}>
                  <FaTimes className="me-1" />Hủy
                </button>
                <button className="btn btn-primary" onClick={handleEditSave}>
                  <FaSave className="me-1" />Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ListCategory;