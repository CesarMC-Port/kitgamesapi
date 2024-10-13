declare module 'cloudinary' {
    // Aquí puedes agregar las declaraciones que necesites
    interface CloudinaryConfig {
        cloud_name: string | undefined;
        api_key: string | undefined;
        api_secret: string | undefined;
    }
    
    interface UploadOptions {
        upload_preset?: string; 
    }
    
    interface UploadResponse {
        public_id: string;
        version: number;
        signature: string;
        width: number;
        height: number;
        format: string;
        resource_type: string;
        created_at: string;
    }
    
    interface Uploader {
        upload(
          file: string,
          options?: UploadOptions
        ): Promise<UploadResponse>;
    }

    export function config(config: CloudinaryConfig): void;
    export const uploader: Uploader;
}