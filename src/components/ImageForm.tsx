"use client";
import { useRouter } from "next/navigation";

export default function ImageForm() {

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const files = e.target.image.files;
        console.log(e.target.image.value);
        const formData = new FormData();
        for (const file of files) {
            // console.log(file);
            formData.append('file', file);
        }
        const data = await fetch('http://localhost:3000/api/image', {
            method: 'POST', 
            body: formData
        }).then(r => r.json());
        // console.log(data);
        e.target.image.value = "";
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="image">Choose image</label>
            <input type="file" id="image" name="image" />
            <button>Submit</button>
        </form>
    )
}
