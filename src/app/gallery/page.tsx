import ImageForm from "@/components/ImageForm";
import ImageGrid from "@/components/ImageGrid";

export default async function Page() {

    return (
        <div>
            <div className="text-center text-7xl font-serif font-bold m-2">Image Gallery</div>
            <ImageForm/>
            <ImageGrid/>
        </div>
    )
}
