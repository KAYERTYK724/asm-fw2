/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import requestAPI from '../RequestAPI';
import './style.css';
import axios from "axios";

const CLOUD_NAME = "dp4vg9juj";
const UPLOAD_PRESET = "products";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const UploadImage = ({ onUploaded }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState("");

    const handleUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", "products");

        try {
            setUploading(true);

            const res = await axios.post(CLOUDINARY_URL, formData);

            const url = res.data.secure_url;

            setPreview(url);
            onUploaded(url);

        } catch (error) {
            console.error(error);
            alert("Upload lỗi!");
        }

        setUploading(false);
    };

    return (
        <div className="upload-wrapper">
            {/* 📦 Drop Zone */}
            <div
                className="upload-box text-center p-4"
                onClick={() => document.getElementById("fileInput").click()}
            >
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleUpload(e.target.files[0])}
                />

                <div className="upload-content">
                    <i className="bi bi-cloud-arrow-up fs-1 text-primary"></i>
                    <p className="mt-2 mb-1 text-white">
                        Kéo thả hoặc <span className="text-info">chọn ảnh</span>
                    </p>
                    <small className="text-muted">
                        PNG, JPG (tối đa ~5MB)
                    </small>
                </div>
            </div>

            {/* 📊 Loading */}
            {uploading && (
                <div className="mt-2 text-warning small">
                    Đang upload...
                </div>
            )}

            {/* 🖼 Preview */}
            {preview && (
                <div className="preview-box mt-3">
                    <img src={preview} className="preview-img" />

                    <button
                        className="btn btn-sm btn-danger remove-btn"
                        onClick={() => {
                            setPreview("");
                            onUploaded(""); // clear form
                        }}
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadImage;