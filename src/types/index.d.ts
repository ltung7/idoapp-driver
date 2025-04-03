export interface IdosellAplicationConfig {
    applicationId: string,
    applicationKey: string;
    developerId: string;
    iv?: string;
} 

export const 

export class IdosellApplicationDriver { 
    constructor(configs: IdosellAplicationConfig)
    generateSign()
    async signalInstallationDone(data: IdosellApplicationIncomingRequest): Promise<IdosellApplicationResponse>
    async getLicenses(): Promise<IdosellApplicationResponse>
}