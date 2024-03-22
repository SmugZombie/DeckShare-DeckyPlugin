export class AppContextState implements Context {
    constructor(serverAPI: ServerAPI) {
        this.serverApi = serverAPI
    }
    
}