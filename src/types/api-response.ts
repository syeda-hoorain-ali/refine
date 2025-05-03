import {
    ConfirmForgotPasswordCommandOutput,
    // ConfirmSignUpCommandOutput,
    ForgotPasswordCommandOutput,
    InitiateAuthCommandOutput,
    ResendConfirmationCodeCommandOutput,
    SignUpCommandOutput
} from "@aws-sdk/client-cognito-identity-provider";


export interface SignUpAPIResponse {
    message?: string;
    data?: SignUpCommandOutput;
    error?: string;
}

export interface LoginAPIResponse {
    message?: string;
    data?: InitiateAuthCommandOutput;
    error?: string;
}

export interface VerifyCodeAPIResponse {
    message?: string;
    // data?: ConfirmSignUpCommandOutput;
    data?: InitiateAuthCommandOutput;
    error?: string;
}

export interface ResendCodeAPIResponse {
    message?: string;
    data?: ResendConfirmationCodeCommandOutput;
    error?: string;
}

export interface ForgotPasswordAPIResponse {
    message?: string;
    data?: ForgotPasswordCommandOutput;
    error?: string;
}

export interface ResetPasswordAPIResponse {
    message?: string;
    data?: ConfirmForgotPasswordCommandOutput;
    error?: string;
}

