"use client"
export default function DeleteImage() {

    const handleDelete = async () => {

        const formData = new FormData();
        formData.append('public_id', 'YelpCamp/gk83anwhailicap2ypqb');

        const data = await fetch("http://localhost:3000/api/image", {
            method: 'DELETE', 
            body: formData
        }).then(r => r.json())
        console.log(data);
    }

    return (
        <button onClick={handleDelete}>Delete</button>
    )
}
