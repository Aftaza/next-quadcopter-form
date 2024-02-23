"use client"
import { checkFileValid, formSchema } from '@/utils/formSchema'
import { saveFile } from '@/utils/saveFile'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'

type FormScheme = z.infer<typeof formSchema>

const FormInput = () => {
    const [file, setFile] = useState<File>()
    const [fileErr, setFileErr] = useState("")
    const [formErr, setFormErr] = useState<z.ZodFormattedError<
        FormScheme,
        string
    > | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const loading = toast.loading("Loading...")
        const formData: any = new FormData(e.target as HTMLFormElement)
        formData.append('file', file)
        // console.log(formData.get("files"))
        const formValues = {
            "name": formData.get("name"),
            "nim": formData.get("nim")
        }
        try{
            // validate form
            const parseFormValues = formSchema.safeParse(formValues)
            if (!parseFormValues.success){
                const err = parseFormValues.error.format()
                console.log(err)
                setFormErr(err)
                return
            }else{
                setFormErr(null)
            }
            // validate file
            const statusFile = checkFileValid(formData.get("files"))
            if (statusFile.status === 500){
                setFileErr(statusFile.msg)
                toast.error("Error Uploaded", {
                    id: loading
                })
                return
            }else{
                setFileErr("")
            }
            const dataSend = {
                "name": parseFormValues.data.name as string,
                "nim": parseFormValues.data.nim as string,
                "files": formData.get("files") as File
            }
            console.log("Send Form Data", dataSend)
            const api = await fetch("/api/v1/upload", {
                method: "POST",
                body: formData
            })
            const res: any = await api.json()
            console.log(res)
            if (res.success){
                toast.success("Successfully Uploaded", {
                    id: loading
                })
            }else{
                toast.error("Error Uploaded", {
                    id: loading
                })
            }
        }catch (error){
            toast.error("Error Uploaded", {
                id: loading
            })
            console.log(error)
        }
    }
    
    return (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#" method='post' onSubmit={handleSubmit}>
                <h5 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Submit your code</h5>
                <div className="flex flex-col gap-1">
                    <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Your name" required />
                    {
                        formErr?.name && (
                            <>
                                {formErr?.name?._errors.map((err) => (
                                    <p key={err} className='text-sm text-red-500'>
                                        {err}
                                    </p>
                                ))}
                            </>
                        )
                    }
                </div>
                <div className="flex flex-col gap-1">
                    <input type="text" name="nim" placeholder="Your NIM" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    {
                        formErr?.nim && (
                            <>
                                {formErr?.nim?._errors.map((err) => (
                                    <p key={err} className='text-sm text-red-500'>
                                        {err}
                                    </p>
                                ))}
                            </>
                        )
                    }
                </div>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">.py or.cpp (MAX. 5mb)</p>
                            <input id="dropzone-file" name='files' onChange={(e) => setFile(e.target.files?.[0])} type="file" className="text-xs text-gray-500 dark:text-gray-400" required/>
                            {
                                fileErr != "" && (
                                    <p className='text-sm text-red-500'>
                                        {fileErr}
                                    </p>
                                )
                            }
                        </div>
                    </label>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default FormInput