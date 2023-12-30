"use client"
import { useRouter } from "next/navigation";

export default function DeleteImage({public_id}: {public_id: string}) {

    const router = useRouter();

    const handleDelete = async () => {

        const formData = new FormData();
        formData.append('public_id', public_id);

        const data = await fetch(`/api/image`, {
            method: 'DELETE', 
            body: formData
        }).then(r => r.json())
        // console.log(data);
        router.refresh();
    }

    return (
        <button onClick={handleDelete} className="p-2 rounded-lg bg-gray-600 hover:bg-red-600">Delete</button>
    )
}
