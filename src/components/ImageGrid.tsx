import Image from "next/image";
import DeleteImage from "./DeleteImage";
import Link from "next/link";

export default async function ImageGrid() {

    const { success, data } = await fetch(`${process.env.URL}/api/image`, { cache: 'no-store' }).then(r => r.json());
    const images = data.resources;

    return (
        <div className="flex flex-wrap m-10">
            {
                images.map((image: any) => 
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4" key={image.asset_id}>
                        <ImageCard url={image.secure_url} public_id={image.public_id} />
                    </div>
                )
            }
        </div>
    )
}

function ImageCard({ url, public_id }: { url: string, public_id: string }) {
    return (
        <div className="relative w-auto h-80 overflow-hidden rounded-2xl border border-white m-2 group">
            <Image
                src={url}
                fill
                alt="uploaded-image"
                className="object-cover transition-opacity duration-200 group-hover:opacity-30"
            />
            <div className="flex justify-center flex-wrap gap-10 absolute top-1/2 -translate-y-1/2 invisible group-hover:visible w-full">
                <Link className="p-2 rounded-lg bg-gray-600 hover:bg-gray-800" href={url} target="_blank">View</Link>
                <DeleteImage public_id={public_id}/>
            </div>
        </div>
    )
}