import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaRedo, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import AdminLayout from '../../../layout/admin/admin-layout';
import './style.css';

const AddCategory = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'Active',
        image: null,
    });

    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Tên danh mục không được để trống';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Tên danh mục phải có ít nhất 2 ký tự';
        } else if (formData.name.trim().length > 100) {
            newErrors.name = 'Tên danh mục không được vượt quá 100 ký tự';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Mô tả không được để trống';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';
        } else if (formData.description.trim().length > 500) {
            newErrors.description = 'Mô tả không được vượt quá 500 ký tự';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors((prev) => ({ ...prev, image: 'Vui lòng chọn file ảnh hợp lệ' }));
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setErrors((prev) => ({ ...prev, image: 'Kích thước ảnh không được vượt quá 2MB' }));
                return;
            }
            setErrors((prev) => ({ ...prev, image: '' }));
            setFormData((prev) => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Lấy danh sách cũ từ localStorage
        const existing = JSON.parse(localStorage.getItem('categories') || '[]');
        const newCategory = {
            id: Date.now(),
            name: formData.name.trim(),
            description: formData.description.trim(),
            status: formData.status,
            createdAt: new Date().toISOString().split('T')[0],
        };

        // Lưu danh mục mới vào localStorage
        localStorage.setItem('categories', JSON.stringify([...existing, newCategory]));

        alert('Thêm danh mục thành công!');
        navigate('/admin/category/list');
    };

    const handleReset = () => {
        setFormData({ name: '', description: '', status: 'Active', image: null });
        setErrors({});
        setPreview(null);
    };

    return (
        <AdminLayout title="Thêm danh mục">
            <div className="row g-4">
                <div className="col-12 col-xl-8">
                    <div className="bg-secondary rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Thêm danh mục mới</h6>
                            <button className="btn btn-sm btn-outline-light" onClick={() => navigate('/admin/category/list')}>
                                <FaArrowLeft className="me-2" />Quay lại
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <label className="form-label text-light">
                                    Tên danh mục <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control bg-dark border-0 text-light ${errors.name ? 'is-invalid' : formData.name ? 'is-valid' : ''}`}
                                    name="name"
                                    placeholder="Nhập tên danh mục"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-light">
                                    Mô tả <span className="text-danger">*</span>
                                </label>
                                <textarea
                                    className={`form-control bg-dark border-0 text-light ${errors.description ? 'is-invalid' : formData.description ? 'is-valid' : ''}`}
                                    name="description"
                                    placeholder="Nhập mô tả danh mục"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                <small className="text-muted">{formData.description.length}/500</small>
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-light">Trạng thái</label>
                                <select
                                    className="form-select bg-dark border-0 text-light"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">Hoạt động</option>
                                    <option value="Inactive">Ẩn</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-light">Ảnh danh mục</label>
                                <input
                                    type="file"
                                    className={`form-control bg-dark border-0 text-light ${errors.image ? 'is-invalid' : ''}`}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                                <small className="text-muted">Chấp nhận: JPG, PNG, GIF. Tối đa: 2MB</small>
                                {preview && (
                                    <div className="mt-3">
                                        <img src={preview} alt="Xem trước" className="rounded"
                                            style={{ width: 120, height: 120, objectFit: 'cover' }} />
                                    </div>
                                )}
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary px-4">
                                    <FaSave className="me-2" />Lưu danh mục
                                </button>
                                <button type="button" className="btn btn-outline-secondary px-4" onClick={handleReset}>
                                    <FaRedo className="me-2" />Nhập lại
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-12 col-xl-4">
                    <div className="bg-secondary rounded p-4">
                        <h6 className="mb-3 text-primary">
                            <FaInfoCircle className="me-2" />Gợi ý
                        </h6>
                        <ul className="text-light ps-3" style={{ fontSize: '0.9rem' }}>
                            <li className="mb-2">Tên danh mục nên rõ ràng và dễ nhớ.</li>
                            <li className="mb-2">Mô tả tốt giúp người dùng tìm sản phẩm dễ hơn.</li>
                            <li className="mb-2">Đặt trạng thái <strong>Ẩn</strong> để tạm thời ẩn khỏi cửa hàng.</li>
                            <li className="mb-2">Kích thước ảnh đề xuất: <strong>300x300px</strong>.</li>
                            <li className="mb-2">Dung lượng ảnh tối đa: <strong>2MB</strong>.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddCategory;