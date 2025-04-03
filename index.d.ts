export interface IdosellAplicationConfig {
    applicationId: number,
    applicationKey: string;
    developerId: string;
    iv?: string;
}

export class IdosellApplicationDriver {
    constructor(configs: IdosellAplicationConfig)
    generateSign()
    signalInstallationDone(data: IdosellApplicationEnableRequest): Promise<IdosellApplicationResponse>
    getLicenses(apiLicense: string | null = null, active: boolean | null = null): Promise<IdosellAplicationLicenseRespose>
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

type OkOrError = 'ok' | 'error';


export interface IdosellApplicationResponse {
    status: OkOrError;
    sign: string;
}

export interface IdosellApplicationLaunchResponse extends IdosellApplicationResponse {
    redirect: string
}

export interface IdosellApplicationGetLicencesRequest {
    application_id: int // application id
    developer: string // developer login
    sign: string // communication signature
    api_license?: string // license number
    active?: bool // [optional] only active or deactive  
}

type PricingType = 'payAsYouGo' | 'fix_price';

interface IdosellAplicationLicenseClient {
    id: number; // IdoSell client id
    name: string; // client company name
    lang: string; // client language
}

interface IdosellAplicationLicensePricing {
    type: PricingType; // application price model
    price: number; // price for next invoice
    price_limit: number; // current price limit
    last_price: number|null; // last invoiced amount
    last_price_date: string|null; // last invoiced date
    currency: string; // price currency
    next_invoice_day: string; // date for next invoice
}

interface IdosellAplicationLicenseTechnical {
    installation_completed: boolean; // is installation completed
    installation_completed_date: string; // date of installation
    ordered_date: string; // date of order license
    termination_date: string; // planned date of shutdown
}

export interface IdosellAplicationLicense {
    number: string; // license number
    application_id: number; // application id
    active: boolean; // is active
    trial: boolean; // is trial (demo) version
    test: boolean; // is test version
    client: IdosellAplicationLicenseClient;
    pricing: IdosellAplicationLicensePricing;
    technical: IdosellAplicationLicenseTechnical;
}

export interface IdosellAplicationLicenseRespose {
    status: OkOrError; // status
    errors?: string[]; // list of errors
    sign: string; // communication signature
    license: IdosellAplicationLicense[];
}
