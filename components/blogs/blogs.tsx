"use client"

import { db } from "@/config/firebase";
import { showMessage } from "@/utils/notify/Alert";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ClockLoader from "../common/ClockLoader";


export const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                            <button
                                onClick={() => handleDelete(blog.id)}
                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>


    </>
}