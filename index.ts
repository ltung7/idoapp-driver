import crypto, { BinaryLike, CipherKey } from 'crypto';
import { IdosellAplicationConfig, IdosellAplicationLicenseRespose, IdosellApplicationGetLicencesRequest, IdosellApplicationIncomingRequest, IdosellApplicationInstallationRequest, IdosellApplicationLaunchResponse, IdosellApplicationResponse } from '.';

const PATHS = {
    INSTALLATION_DONE: 'https://apps.idosell.com/api/application/installation/done',
    GET_LICENCES: 'https://apps.idosell.com/api/application/license'
}

const DEFAULT_IV = 'ce069db2f9a9cb1f';

export class IdosellApplicationDriver {
    private configs: IdosellAplicationConfig | null = null;

    constructor(configs: IdosellAplicationConfig) {
        this.configs = configs;
        if (!configs.iv) this.configs
    }

    generateSign() {
        if (!this.configs) {
            throw new Error('Configs not found');
        } 
        const currentDate = new Date().toISOString().split('T')[0];
        
        return crypto.createHash('sha256').update(this.configs.developerId + '|' + currentDate + '|' + this.configs.applicationKey).digest('hex');
    }

    decryptIdosellKey(encryptedKey: string) {
        if (!this.configs) {
            throw new Error('Configs not found');
        }
        const b64 = Buffer.from(encryptedKey, 'base64').toString('utf-8');
        const key: CipherKey = this.configs.applicationKey;
        const iv: BinaryLike = new Uint8Array(Buffer.from(this.configs.iv ?? DEFAULT_IV, "utf8"));
        const algorithm: string = "aes-256-cbc";
        
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(b64, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
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

    async getLicenses(apiLicense: string|null = null, active: boolean|null = null): Promise<IdosellAplicationLicenseRespose> {
        if (!this.configs) {
            throw new Error('Configs not found');
        }

        const request: IdosellApplicationGetLicencesRequest = {
            application_id: this.configs.applicationId,
            developer: this.configs.developerId,
            sign: this.generateSign()
        }
        if (apiLicense !== null) request.api_license = apiLicense;
        if (active !== null) request.active = active;

        const fetchResponse = await fetch(PATHS.GET_LICENCES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        return fetchResponse.json() as Promise<IdosellAplicationLicenseRespose>;
    }

    getSingedResponse(): IdosellApplicationResponse {
        return {
            status: 'ok',
            sign: this.generateSign()
        }
    }

    getSingedRedirectResponse(url: string): IdosellApplicationLaunchResponse {
        return {
            status: 'ok',
            sign: this.generateSign(),
            redirect: url
        }
    }
}