import { rename, writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path';

function getType(filename: string){
    const isPyFile: boolean = /\.py/.test(filename);
    const isCppFile: boolean = /\.cpp/.test(filename);
    if (isPyFile) return ".py"
    if (isCppFile) return ".cpp"
}

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    return `${hour}-${minute}-${second}+${date}-${month}-${year}`;
}

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const values = {
        name: data.get('name'),
        nim: data.get('nim')
    }
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
        return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = getDate() + "-" + values.name + "-" + values.nim + getType(file.name)
    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const pathFile = path.join(process.cwd(), "public/uploads/")
    await writeFile(pathFile + filename, buffer)
    console.log(`open ${pathFile + filename} to see the uploaded file`)
    
    return NextResponse.json({ success: true })
}