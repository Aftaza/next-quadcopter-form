import { z } from "zod"

const MAX_FILE_SIZE = 5000000

export function checkFileValid(file: any){
    if (file?.name){
        // Check valid type
        const isPyFilePresent: boolean = /\.py/.test(file?.name);
        const isCppFilePresent: boolean = /\.cpp/.test(file?.name);
        if (isPyFilePresent || isCppFilePresent){
            const isValidSize: boolean = file?.size < MAX_FILE_SIZE
            if (isValidSize){
                return {status: 200, msg: "Valid File"}
            }else{
                return {status: 500, msg: "File must be less then 5mb"}
            }
        }else{
            return {status: 500, msg: "Only .py or .cpp can be stored"}
        }
    }else{
        return {status: 500, msg: "File not exist"}
    }
}

export const formSchema = z.object({
    name: z
        .string({required_error: "Name is required"})
        .toLowerCase(),
    nim: z
        .string({required_error: "Nim is required"})
        .max(15, {message: "max nim is 15 characters"}),
});