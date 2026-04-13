import type { IManageFileService, FileResponseType} from "./IManageFileServices.js";
import { v2 as cloudinary } from 'cloudinary'

export class ManageFileService implements IManageFileService {
    constructor(
        private readonly _cloud_name: string,
        private readonly _api_key: string,
        private readonly _api_secret: string
    ) {
        cloudinary.config({
            cloud_name: this._cloud_name,
            api_key: this._api_key,
            api_secret: this._api_secret
        })
    }

    async uploadFile(filePath: string, nombre: string): Promise<FileResponseType> {
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                public_id: nombre,
                resource_type: "auto",
                folder: "matrix_erp/files"
            })

            return {
                url: result.secure_url,
                public_id: result.public_id
            }
        } catch (error) {
            console.error("Cloudinary Error:", error);
            throw new Error("Error al subir el archivo a la nube");
        }
    }

    async uploadImage(filePath: string, nombre: string): Promise<FileResponseType> {
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                public_id: nombre,
                resource_type: "auto",
                folder: "matrix_erp/images"
            })

            return {
                url: result.secure_url,
                public_id: result.public_id
            }
        } catch (error) {
            console.error("Cloudinary Error:", error);
            throw new Error("Error al subir la imagen en la nube");
        }
    }



}

const cloudinary_config = async (cloud_name: string, api_key: string, api_secret: string) => {
    return cloudinary.config({
        cloud_name,
        api_key,
        api_secret
    })
}