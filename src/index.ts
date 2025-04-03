import { IdosellAplicationConfig } from "./types";
import { IdosellApplicationGetLicencesRequest, IdosellApplicationIncomingRequest, IdosellApplicationInstallationRequest, IdosellApplicationResponse } from "./types/requests";
import crypto from 'crypto';

const PATHS = {
    INSTALLATION_DONE: 'https://apps.idosell.com/api/application/installation/done',
    GET_LICENCES: 'https://apps.idosell.com/api/application/license'
}

export class IdosellApplicationDriver {
    private configs: IdosellAplicationConfig | null = null;

    constructor(configs: IdosellAplicationConfig) {
        this.configs = configs;
    }

    generateSign() {
        if (!this.configs) {
            throw new Error('Configs not found');
        } 
        const currentDate = new Date().toISOString().split('T')[0];
        
        return crypto.createHash('sha256').update(this.configs.developerId + '|' + currentDate + '|' + this.configs.applicationKey).digest('hex');
    }

    async signalInstallationDone(data: IdosellApplicationIncomingRequest): Promise<IdosellApplicationResponse> {
        if (!this.configs) {
            throw new Error('Configs not found');
        } 

        const response: IdosellApplicationInstallationRequest = {
            api_license: data.api_license,
            application_id: this.configs.applicationId,
            sign: this.generateSign(),
            developer: this.configs.developerId
        }

        const fetchResponse = await fetch(PATHS.INSTALLATION_DONE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
        });

        return fetchResponse.json() as Promise<IdosellApplicationResponse>;
    }

    async getLicenses(): Promise<IdosellApplicationResponse> {
        if (!this.configs) {
            throw new Error('Configs not found');
        }

        const request: IdosellApplicationGetLicencesRequest = {
            application_id: this.configs.applicationId,
            developer: this.configs.developerId,
            sign: this.generateSign()
        }

        const fetchResponse = await fetch(PATHS.INSTALLATION_DONE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        return fetchResponse.json() as Promise<IdosellApplicationResponse>;
    }
}