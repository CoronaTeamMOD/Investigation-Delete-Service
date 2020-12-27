export class DeletingInvestigationsError extends Error {
    constructor (err: string) {
        super('Error in deleting investigations: ' + err);
    }
}