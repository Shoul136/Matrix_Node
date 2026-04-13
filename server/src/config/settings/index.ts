import dotenv from 'dotenv';
dotenv.config()

function getEnv(key: string): string{
    const value = process.env[key];
    if(!value){
        throw new Error(`Config Error: La variable de entorno ${key} es obligatoria`)
    }
    return value
}

export const config = {
    auth: {
        secret: process.env.JWT_SECRET || 'matrix_dev_key',
        expires: '8h'
    },
    mail: {
        host: process.env.MAIL_HOST || 'localhost',
        port: Number(process.env.MAIL_PORT) || 1025
    },
    cloudinary: {
        cloud_name: getEnv('CLOUDINARY_CLOUD_NAME'),
        api_key: getEnv('CLOUDINARY_API_KEY'),
        api_secret: getEnv('CLOUDINARY_API_SECRET')
    }
} as const