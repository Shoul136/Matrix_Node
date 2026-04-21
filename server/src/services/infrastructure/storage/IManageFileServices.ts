export type FileResponseType = {
    url: string,
    public_id: string
}

export interface IManageFileService{
    uploadFile(filePath: string, nombre: string) : Promise<FileResponseType>
    uploadImage(filePath: string, nombre: string) : Promise<FileResponseType>
}