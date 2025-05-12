import {
    ConfirmForgotPasswordCommandOutput,
    // ConfirmSignUpCommandOutput,
    ForgotPasswordCommandOutput,
    InitiateAuthCommandOutput,
    ResendConfirmationCodeCommandOutput,
    SignUpCommandOutput,
    UpdateUserAttributesCommandOutput
} from "@aws-sdk/client-cognito-identity-provider";


interface APIResponse {
    message?: string;
    error?: string;
}

export interface SignUpAPIResponse extends APIResponse {
    data?: SignUpCommandOutput;
}

export interface LoginAPIResponse extends APIResponse {
    data?: InitiateAuthCommandOutput;
}

export interface VerifyCodeAPIResponse extends APIResponse {
    // data?: ConfirmSignUpCommandOutput;
    data?: InitiateAuthCommandOutput;
}

export interface ResendCodeAPIResponse extends APIResponse {
    data?: ResendConfirmationCodeCommandOutput;
}

export interface ForgotPasswordAPIResponse extends APIResponse {
    data?: ForgotPasswordCommandOutput;
}

export interface ResetPasswordAPIResponse extends APIResponse {
    data?: ConfirmForgotPasswordCommandOutput;
}

export interface UpdateProfileAPIResponse extends APIResponse {
    data?: UpdateUserAttributesCommandOutput;
}

