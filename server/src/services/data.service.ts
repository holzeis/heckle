import { Configuration } from './configuration';
import * as Nano from 'nano';
import { Heckle } from '../models/heckle';

export class DataService {

    private nano = Nano('http://' + Configuration.instance().couchdbAdminUser + ':' + Configuration.instance().couchdbAdminPassword + '@' +
        Configuration.instance().couchdbEndpoint + ':' + Configuration.instance().couchdbPort);

    public async initialize(): Promise<DataService> {
        try {
            const response = await this.nano.db.create('heckle');
            if (response.ok) {
                console.info('[DataService] Data store has been successfully created.');
            } else {
                throw new Error(response.error + ': ' + response.reason);
            }
        } catch (error) {
            if (error.statusCode === 412) {
                console.info('[DataService] Data store has already been created.');
                return this;
            }

            throw new Error(error.statusCode + ': ' + error.reason);
        }

        return this;
    }

    /**
     * Persists a given document to the off chain store.
     * @param document the document to be persisted to the off chain store
     */
    public async persist<T extends Nano.MaybeDocument>(document: T): Promise<T> {
        const heckle = this.nano.use('heckle');
        const response = await heckle.insert(document);
        if (!response.ok) {
            throw new Error('Failed to persist document with id: ' + document._id);
        }

        return document;
    }

    /**
     * Loads the document by a given id
     * @param prefix the prefix of the document
     * @param id the id of the document
     */
    public async load(id: string): Promise<any> {
        try {
            const response = await this.nano.db.use('heckle').get(id);
            return response;
        } catch (error) {
            if (error.statusCode === 404) {
                console.info('Document with id: ' + id + ' could not be found.');
                return null;
            }
            // if any error occured other than not found rethrow the error
            throw error;
        }
    }

    /**
     * Loads all documents by a given partial key.
     * @param ids the partial key of the asset
     * @param prefix the prefix of the documents
     */
    public async loads(id: string): Promise<any[]> {
        try {
            const response = await this.nano.db.use('heckle').list({ include_docs: true, startkey: id, endkey: id + '\uffff' });
            return response.rows.filter(row => row.doc).map(row => row.doc);
        } catch (error) {
            if (error.statusCode === 404) {
                console.info('Documents with partial id: ' + id + ' could not be found.');
                return [];
            }
            // if any error occured other than not found rethrow the error
            throw error;
        }
    }

    /**
     * Register on change events on the couch db.
     * @param onEvent
     */
    public register(onEvent: (heckle: Heckle) => void): void {
        const feed = this.nano.db.use('heckle').follow({ since: 'now', feed: 'continuous', include_docs: true }, () => { /* empty callback */ });
        feed.on('change', (event) => {
            console.log(JSON.stringify(event));
            // break joined key to partial keys.
            const keys = event.id.split('/');
            // remove asset prefix
            if (keys.shift() === 'heckle') {
                onEvent(event);
            }
        });
    }
}
