export interface IdosellAplicationConfig {
    applicationId: number,
    applicationKey: string;
    developerId: string;
    iv?: string;
} 

export class IdosellApplicationDriver { 
    constructor(configs: IdosellAplicationConfig)
    generateSign()
    signalInstallationDone(data: IdosellApplicationIncomingRequest): Promise<IdosellApplicationResponse>
    getLicenses(): Promise<IdosellApplicationResponse>
    getSingedResponse(): IdosellApplicationResponse
    getSingedRedirectResponse(url: string): IdosellApplicationLaunchResponse
    decryptIdosellKey(encryptedKey: string): string
}

export interface IdosellApplicationIncomingRequest {
    api_license: string; //license number
    application_id: number; // application id
    sign: string; // communication signature
}

export interface IdosellApplicationInstallationRequest extends IdosellApplicationIncomingRequest {
    developer: string; // developer login
}

export interface IdosellApplicationDisableRequest extends IdosellApplicationIncomingRequest {
    client_id: number; //client id
    api_url: string; //address to api admin
}

export interface IdosellApplicationLaunchRequest {
    client_id: number; //client number
    api_key: string; //access key
    api_license: string; //license number
    authorization_type: string; //authorization type (enum: “key”, “OAuth”)
    sign: string; // communication signature
}

export interface IdosellApplicationEnableRequest extends IdosellApplicationLaunchRequest {
    api_url: string;
    api_key: string;
}

export interface IdosellApplicationResponse {
    status: "ok" | "error";
    sign: string;
}

export interface IdosellApplicationLaunchResponse extends IdosellApplicationResponse {
    redirect: string
}

export interface IdosellApplicationGetLicencesRequest {
    application_id: number,
    developer: string,
    sign: string
}