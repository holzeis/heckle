export class Accounts {

    private accounts: any;

    constructor() {
        this.accounts = require('/config/accounts.json');
    }

    public findByEmail(email: string): any {
        for (const key of Object.keys(this.accounts)) {
            let accountConfig = this.accounts[key];
            // check if user organization is managed by hosting node as tenant.
            
            if (accountConfig.email === email) {
                return accountConfig;
            }
        }
    }
}


