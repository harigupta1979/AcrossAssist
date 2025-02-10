export class DefaultSearchModel {
    bactive: boolean;
    radioSearch: string;

    constructor(bactive: boolean = false, radioSearch: string = 'Start with') {
        this.bactive = bactive;
        this.radioSearch = radioSearch;
    }
}
export class DefaultSearchModellist {
    bactive: boolean;
    radioSearch: string;
    LoginUserId: number;

    constructor(bactive: boolean = false, radioSearch: string = 'Start with', LoginUserId: number = 0) {
        this.bactive = bactive;
        this.radioSearch = radioSearch;
        this.LoginUserId = LoginUserId;
    }
}

export class DefaultDealerSearchModellist {
    bactive: boolean;
    radioSearch: string;
    LoginUserId: number;
    DealerId: number;

    constructor(bactive: boolean = false, radioSearch: string = 'Start with', LoginUserId: number = 0, DealerId: number = 0) {
        this.bactive = bactive;
        this.radioSearch = radioSearch;
        this.LoginUserId = LoginUserId;
        this.DealerId = DealerId;
    }
}

export class DefaultUserSearchModel {
    ISACTIVE: boolean;
    radioSearch: string;

    constructor(ISACTIVE: boolean = false, radioSearch: string = 'Start with') {
        this.ISACTIVE = ISACTIVE;
        this.radioSearch = radioSearch;
    }
}

export class DefaultTrnsSearchModel {
    dfromdate: Date;
    dtodate: Date;

    constructor(dfromdate: Date = new Date(), dtodate: Date = new Date()) {
        this.dfromdate = dfromdate;
        this.dtodate = dtodate;
    }
}

export class DefaultSearchModellistrto {
    bactive: boolean;
    radioSearch: string;

    constructor(bactive: boolean = false, radioSearch: string = 'Start with') {
        this.bactive = bactive;
        this.radioSearch = radioSearch;
    }
}
