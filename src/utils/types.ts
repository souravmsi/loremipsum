export interface Response {
    success: boolean;
    statusCode: number;
    message: string;
}

////////////////////////////////////////////////////
// Clients Page Types
///////////////////////////////////////////////////

export interface Client {
    id: string;
    portfolioName: string;
    portfolioCode: string;
    isActive: boolean;
}

export interface ClientsReponse extends Response {
    payload: {
        responseData: Client[];
        totalItems: number;
    };
}

////////////////////////////////////////////////////
// Client Details Page Types
///////////////////////////////////////////////////

export interface ClientDetails {
    responseData: ResponseData;
    address: Address;
    bankDetail: BankDetail;
    dam: obligationDetails;
    gdam: obligationDetails;
    tam: obligationDetails;
    gtam: obligationDetails;
    rtm: obligationDetails;
    rec: obligationDetails;
}

export interface ResponseData {
    id: string;
    portfolioName: string;
    portfolioCode: string;
    contactNumber: string;
    type: string;
    role: string;
    sapId: string | null;
    password: string;
    primaryEmail: string;
    nationality: string;
    logoUrl: string;
    nocUrl: string;
    isSezClient: boolean;
    isActive: boolean;
    isValid: boolean;
    isDeleted: boolean;
    updatedAt: string;
    createdAt: string;
}

export interface Address {
    id: string;
    pincode: string;
    faxNumber: string;
    telephone: string;
    panNumber: string;
    stateCode: string;
    state: string;
    clientId: string;
    residentialAddress: string | null;
    updatedAt: string;
    createdAt: string;
}

export type BankDetail = {
    bankName: string;
    holderName: string;
    branchName: string;
    accountNumber: string;
    ifscCode: string;
    cancelCheque: string;
};

export interface obligationDetails {
    id: string;
    tradingMarginMultiplier: string[];
    reportRecipientEmail: string;
    filePrefix: string;
    fileMiddleName: string;
    fileSuffix: string;
    fileName: string;
    clientId: string;
    updatedAt: string;
    createdAt: string;
}

export interface ClientDetailsResponse extends Response {
    payload: ClientDetails;
}
