export class Logger{
    constructor(private _context : string){ }

    debug(functionName: string, ...args){
        console.debug(`${this._context}.${functionName}`, args.pop(), args);
    }
}