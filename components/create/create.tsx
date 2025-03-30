"use client"
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { db, storage } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "./editor.css"
import { showMessage } from "@/utils/notify/Alert";
import ClockLoader from "../common/ClockLoader";
import { CustomSelect } from "./CustomSelect";

export const CreateBlogs = () => {
    const [value, setValue] = useState("");
    const [preview, setPreview] = useState(null)
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<any>(null);
    const [category, setCategory] = useState<any>({ value: "web-development", label: "Web Development" })
    const [loading, setLoading] = useState(false)

    const blogCategories = [
        { value: "web-development", label: "Web Development" },
        { value: "mobile-development", label: "Mobile Development" },
        { value: "ai-ml", label: "AI & Machine Learning" },
        { value: "cybersecurity", label: "Cybersecurity" },
        { value: "cloud-computing", label: "Cloud Computing" },
        { value: "data-science", label: "Data Science" },
        { value: "programming", label: "Programming" },
        { value: "tech-news", label: "Tech News" },
        { value: "software-engineering", label: "Software Engineering" },
        { value: "gadgets", label: "Gadgets & Reviews" },
        { value: "gaming", label: "Gaming" },
        { value: "productivity", label: "Productivity & Tools" },
        { value: "entrepreneurship", label: "Entrepreneurship" },
        { value: "marketing", label: "Digital Marketing" },
        { value: "self-improvement", label: "Self-Improvement" },
        { value: "finance", label: "Finance & Investing" },
        { value: "lifestyle", label: "Lifestyle & Wellness" }
    ];


    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl: any = URL.createObjectURL(file);
            setPreview(imageUrl)
            setImage(file);
        }
    };

    const handleCreate = async () => {
        if (!title || !value || !image || !category) {
            showMessage("Please fill all fields and select an image.", "error");
            return;
        }
        setLoading(true)

        try {

            const CLOUDINARY_URL: any = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
            const UPLOAD_PRESET: any = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", UPLOAD_PRESET);

            const response = await axios.post(CLOUDINARY_URL, formData);
            let imageURL = response.data.secure_url


            await addDoc(collection(db, "blogs"), {
                title,
                image: imageURL,
                value,
                category: category?.value || "",
                createdAt: new Date(),
            });

            showMessage("Blog created successfully!", "success");
            setTitle("");
            setImage(null);
            setPreview(null);
            setValue("");
            setImage(null)
            setCategory({ value: "web-development", label: "Web Development" })
            setLoading(false)
        } catch (error) {
            console.error("Error creating blog:", error);
            showMessage("Failed to create blog.", "error");
            setLoading(false)

        }
    };



    return <div className="min-h-screen bg-gray-200  p-6">
        {loading && <ClockLoader />}
        <input
            type="text"
            placeholder="Enter blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-100  border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4 bg-gray-500 p-2 rounded-md border border-gray-700 text-gray-300 cursor-pointer"
        />

        {preview && (
            <div className="mb-4">
                <img
                    src={preview}
                    alt="Uploaded Preview"
                    className="w-full h-64 object-cover rounded-lg border border-gray-700 shadow-md"
                />
            </div>
        )}

        <div className="my-2">
            <div>
                <CustomSelect options={blogCategories} value={category} OnSelect={setCategory} label="Category" placeholder="Select category" />
            </div>
        </div>



        <div className="flex justify-end items-center mb-4">
            <button
                onClick={handleCreate}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
                Create
            </button>
        </div>

        <ReactQuill
            className="w-full bg-white  border border-gray-700 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            value={value}
            onChange={setValue}
        />
    </div>
}