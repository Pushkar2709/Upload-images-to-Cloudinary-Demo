"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ImageForm() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleChange = (e: any) => {
        if (e.target.value) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const files = e.target.image.files;
        const formData = new FormData();
        for (const file of files) {
            formData.append('file', file);
        }
        
        const data = await fetch(`${process.env.URL}/api/image`, {
            method: 'POST',
            body: formData
        }).then(r => r.json());

        router.refresh();
        setIsLoading(false);
        setButtonDisabled(true);
        e.target.image.value = null;
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-center m-10">
            <input type="file" id="image" name="image" onChange={handleChange}
                className="border-gray-400 border rounded-lg mx-10 cursor-pointer
                            file:rounded-lg file:bg-gray-800 file:hover:bg-gray-900 file:text-white file:p-3 file:mr-5 file:border-none file:cursor-pointer" />
            <button className="rounded-lg p-3 bg-gray-800 hover:bg-gray-900 disabled:opacity-50 disabled:hover:bg-gray-800" disabled={buttonDisabled || isLoading}>
                {isLoading ? "Uploading" : "Upload"}
            </button>
        </form>
    )
}
