export interface IEmailService{
    send(to: string, subject: string, body: string): Promise<void>;
    sendPasswordReset(to: string, subject: string, body: string, token: string) : Promise<void>
}