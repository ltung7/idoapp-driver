export interface IdosellApplicationIncomingRequest {
    api_license: string; //license number
    application_id: int; // application id
    sign: string; // communication signature
}

export interface IdosellApplicationInstallationRequest extends IdosellApplicationIncomingRequest {
    developer: string; // developer login
}

export interface IdosellApplicationDisableRequest extends IdosellApplicationIncomingRequest {
    client_id: int; //client id
    api_url: string; //address to api admin
}

export interface IdosellApplicationLaunchRequest {
    client_id: int; //client number
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
    application_id: string,
    developer: string,
    sign: string
}