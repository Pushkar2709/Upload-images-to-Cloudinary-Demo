import DeleteImage from "@/components/DeleteImage";
import ImageForm from "@/components/ImageForm";

export default async function Page() {

    const {success, data} = await fetch('http://localhost:3000/api/image', {cache: 'no-store'}).then(r => r.json());
    const images = data.resources;

    return (
        <div>
            <div>Image Gallery</div>
            <ImageForm/>
            {
                images.map((image: any) => <img src={image.url} />)
            }
            {/* <DeleteImage/> */}
        </div>
    )
}
