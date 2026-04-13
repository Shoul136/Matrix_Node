export type FileResponseType = {
    url: string,
    public_id: string
}

export interface IManageFileService{
    uploadFile(filePath: string, nombre: string) : Promise<FileResponseType>
    uploadImage(imageStream: string, nombre: string) : Promise<FileResponseType>
}