export class ApiResponse{
    status: string;
    message: string;
    data: any

    constructor(status: string, message: string, data: any) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}