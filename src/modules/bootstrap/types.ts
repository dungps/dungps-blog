import Bootstrap from '../../models/Bootstrap';

export enum Actions {
    LOADING_DONE = '@bootstrap/loading_done',
    LOAD_BOOTSTRAP = '@bootstrap/load'
}

export interface BootstrapState {
    loading: boolean,
    data: Bootstrap
}