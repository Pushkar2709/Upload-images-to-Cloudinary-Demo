import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const API_KEY = process.env.CLOUDINARY_API_KEY || "";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "";
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";

export async function GET() {
    try {
        cloudinary.config({
            cloud_name: CLOUD_NAME, 
            api_key: API_KEY, 
            api_secret: API_SECRET
        });
        const data = await cloudinary.api.resources_by_tag("Demo");
        return Response.json({success: true, data});
    } catch(error) {
        // console.log(error);
        return Response.json({success: false});
    }
}

export async function POST(req: NextRequest) {
    try {
        const folder = 'ImageUploadDemo';
        const tags = 'Demo';
        const timestamp = Math.round((new Date).getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request({ timestamp, folder, tags }, API_SECRET);
        // console.log(signature);
        
        const formData = await req.formData();
        formData.append('api_key', API_KEY);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
        formData.append('folder', folder);
        formData.append('tags', tags);
        
        const data = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST', 
            body: formData
        }).then(r => r.json());
        // console.log(data);

        return Response.json({ success: true });
    } catch (error) {
        console.log(error);
        return Response.json({ success: false });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const formData = await req.formData();
        const public_id = formData.get('public_id');
        
        const timestamp = Math.round((new Date).getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request({ timestamp, public_id }, API_SECRET);
        // console.log(signature);

        formData.append('api_key', API_KEY);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);

        const data = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
            method: 'POST', 
            body: formData
        }).then(r => r.json());
        // console.log(data);

        return Response.json({success: true});
    } catch(error) {
        return Response.json({success: false});
    }
}