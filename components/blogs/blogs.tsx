"use client"

import { db } from "@/config/firebase";
import { showMessage } from "@/utils/notify/Alert";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ClockLoader from "../common/ClockLoader";
import axios from "axios";
import { updateDoc } from "firebase/firestore";
import { CustomSelect } from "../create/CustomSelect";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "../create/editor.css"





export const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState<any>(null)


    const [value, setValue] = useState("");
    const [preview, setPreview] = useState(null)
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<any>(null);
    const [category, setCategory] = useState<any>({ value: "web-development", label: "Web Development" })


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


    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const querySnapshot = await getDocs(collection(db, "blogs"));
            let blogList: any = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(blogList)
            blogList = blogList.sort((a: any, b: any) =>
                (b?.createdAt?.toMillis?.() || 0) - (a?.createdAt?.toMillis?.() || 0)
            );
            setBlogs(blogList);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl: any = URL.createObjectURL(file);
            setPreview(imageUrl)
            setImage(file);
        }
    };

    const handleUpdateInit = (blog: any) => {
        setSelectedBlog(blog)
        setCategory({value: blog?.category || "" , label: blog?.category || ""})
        setTitle(blog.title)
        setPreview(blog.image)
        setValue(blog.value)
        setIsEditOpen(true)
    }


    const handleUpdate = async () => {

        if (!title || !value || !category) {
            showMessage("Please fill all fields and select an image.", "error");
            return;
        }
        setLoading(true)

        try {

            const CLOUDINARY_URL: any = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
            const UPLOAD_PRESET: any = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

            let imageURL;
            if (image) {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("upload_preset", UPLOAD_PRESET);

                const response = await axios.post(CLOUDINARY_URL, formData);
                imageURL = response.data.secure_url
            }else {
                imageURL = preview
            }

            const blogRef = doc(db, "blogs", selectedBlog.id);

            await updateDoc(blogRef, {
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
            setIsEditOpen(false)
            setLoading(false)
            fetchBlogs()
        } catch (error) {
            console.error("Error creating blog:", error);
            showMessage("Failed to create blog.", "error");
            setLoading(false)

        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: any) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;
        setLoading(true)

        try {
            await deleteDoc(doc(db, "blogs", id));
            setBlogs(blogs.filter((blog: any) => blog.id !== id));
            showMessage("Blog deleted successfully!", "success");
            setLoading(false)

        } catch (error) {
            console.error("Error deleting blog:", error);
            showMessage("Failed to delete blog.", "error");
            setLoading(false)
        }
    };

    if (loading) return <ClockLoader />;

    return <>

        <div className="min-h-[800px] mx-auto p-6 bg-gray-100 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Blogs</h2>

            {loading ? (
                <p>Loading blogs...</p>
            ) : blogs.length === 0 ? (
                <p>No blogs found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {blogs.map((blog: any) => (
                        <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
                            {/* Blog Image */}
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover rounded-md border mb-2"
                            />

                            {/* Blog Title */}
                            <h3 className="text-lg font-semibold">{blog.title}</h3>

                            {/* Delete Button */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => {
                                        handleUpdateInit(blog)
                                    }}
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isEditOpen && (
                <div className="z-[999] flex justify-center items-center bg-black/15 w-screen h-screen fixed top-0 left-0 ">
                    <div className="bg-white rounded-md p-5 overflow-y-auto h-[90vh] w-[90vw]">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className=" bg-red-500 text-white p-2 w-6 h-6 flex items-center justify-center rounded-full"
                            >
                                X
                            </button>
                        </div>

                        <div className="my-2">

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
                                    onClick={handleUpdate}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                >
                                    Update
                                </button>
                            </div>

                            <ReactQuill
                                className="w-full bg-white  border border-gray-700 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                                value={value}
                                onChange={setValue}
                            />

                        </div>

                    </div>

                </div>
            )}
        </div>


    </>
}