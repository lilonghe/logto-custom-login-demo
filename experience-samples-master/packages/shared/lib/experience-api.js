/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
    constructor(apiConfig = {}) {
        this.baseUrl = "https://[tenant_id].logto.app/";
        this.securityData = null;
        this.abortControllers = new Map();
        this.customFetch = (...fetchParams) => fetch(...fetchParams);
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.contentFormatters = {
            [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.Text]: (input) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
            [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(key, property instanceof Blob
                    ? property
                    : typeof property === "object" && property !== null
                        ? JSON.stringify(property)
                        : `${property}`);
                return formData;
            }, new FormData()),
            [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
        };
        this.createAbortSignal = (cancelToken) => {
            if (this.abortControllers.has(cancelToken)) {
                const abortController = this.abortControllers.get(cancelToken);
                if (abortController) {
                    return abortController.signal;
                }
                return void 0;
            }
            const abortController = new AbortController();
            this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        };
        this.abortRequest = (cancelToken) => {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        };
        this.request = async ({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }) => {
            const secureParams = ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
                {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || ContentType.Json];
            const responseFormat = format || requestParams.format;
            return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
                ...requestParams,
                headers: {
                    ...(requestParams.headers || {}),
                    ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
                },
                signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
                body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
            }).then(async (response) => {
                const r = response.clone();
                r.data = null;
                r.error = null;
                const data = !responseFormat
                    ? r
                    : await response[responseFormat]()
                        .then((data) => {
                        if (r.ok) {
                            r.data = data;
                        }
                        else {
                            r.error = data;
                        }
                        return r;
                    })
                        .catch((e) => {
                        r.error = e;
                        return r;
                    });
                if (cancelToken) {
                    this.abortControllers.delete(cancelToken);
                }
                if (!response.ok)
                    throw data;
                return data.data;
            });
        };
        Object.assign(this, apiConfig);
    }
    encodeQueryParam(key, value) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }
    addQueryParam(query, key) {
        return this.encodeQueryParam(key, query[key]);
    }
    addArrayQueryParam(query, key) {
        const value = query[key];
        return value.map((v) => this.encodeQueryParam(key, v)).join("&");
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
            .join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }
}
/**
 * @title Logto experience API references
 * @version Cloud
 * @baseUrl https://[tenant_id].logto.app/
 *
 * API references for Logto experience interaction.
 *
 * Note: The documentation is for Logto Cloud. If you are using Logto OSS, please refer to the response of `/api/swagger.json` endpoint on your Logto instance.
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        this.experience = {
            /**
             * @description Init a new experience interaction with the given interaction type. Any existing interaction data will be cleared.
             *
             * @tags Experience
             * @name InitInteraction
             * @summary Init new interaction
             * @request PUT:/api/experience
             */
            initInteraction: (data, params = {}) => this.request({
                path: `/api/experience`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
            /**
             * @description Update the current experience interaction event to the given event type. This API is used to switch the interaction event between `SignIn` and `Register`, while keeping all the verification records data.
             *
             * @tags Experience
             * @name UpdateInteractionEvent
             * @summary Update interaction event
             * @request PUT:/api/experience/interaction-event
             */
            updateInteractionEvent: (data, params = {}) => this.request({
                path: `/api/experience/interaction-event`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
            /**
             * @description This API identifies the user based on the verificationId within the current experience interaction: <br/>- `SignIn` and `ForgotPassword` interactions: Verifies the user's identity using the provided `verificationId`. <br/>- `Register` interaction: Creates a new user account using the profile data from the current interaction. If a verificationId is provided, the profile data will first be updated with the verification record before creating the account. If not, the account is created directly from the stored profile data.
             *
             * @tags Experience
             * @name IdentifyUser
             * @summary Identify user for the current interaction
             * @request POST:/api/experience/identification
             */
            identifyUser: (data, params = {}) => this.request({
                path: `/api/experience/identification`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Submit the current interaction. <br/>- Submit the verified user identity to the OIDC provider for further authentication (SignIn and Register). <br/>- Update the user's profile data if any (SignIn and Register). <br/>- Reset the password and clear all the interaction records (ForgotPassword).
             *
             * @tags Experience
             * @name SubmitInteraction
             * @summary Submit interaction
             * @request POST:/api/experience/submit
             */
            submitInteraction: (params = {}) => this.request({
                path: `/api/experience/submit`,
                method: "POST",
                format: "json",
                ...params,
            }),
            /**
             * @description Get the public interaction data.
             *
             * @tags Experience
             * @name GetInteraction
             * @summary Get public interaction data
             * @request GET:/api/experience/interaction
             */
            getInteraction: (params = {}) => this.request({
                path: `/api/experience/interaction`,
                method: "GET",
                format: "json",
                ...params,
            }),
            /**
             * @description Create and verify a new Password verification record. The verification record can only be created if the provided user credentials are correct.
             *
             * @tags Experience
             * @name CreatePasswordVerification
             * @summary Create password verification record
             * @request POST:/api/experience/verification/password
             */
            createPasswordVerification: (data, params = {}) => this.request({
                path: `/api/experience/verification/password`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Create a new `CodeVerification` record and sends the code to the specified identifier. The code verification can be used to verify the given identifier.
             *
             * @tags Experience
             * @name CreateAndSendVerificationCode
             * @summary Create and send verification code
             * @request POST:/api/experience/verification/verification-code
             */
            createAndSendVerificationCode: (data, params = {}) => this.request({
                path: `/api/experience/verification/verification-code`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Verify the provided verification code against the user's identifier. If successful, the verification record will be marked as verified.
             *
             * @tags Experience
             * @name VerifyVerificationCodeVerification
             * @summary Verify verification code
             * @request POST:/api/experience/verification/verification-code/verify
             */
            verifyVerificationCodeVerification: (data, params = {}) => this.request({
                path: `/api/experience/verification/verification-code/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Create a new MFA verification code and send it to the user's bound identifier (email or phone). This endpoint automatically uses the user's bound email address or phone number from their profile for MFA verification. The user must be identified before calling this endpoint.
             *
             * @tags Experience
             * @name CreateAndSendMfaVerificationCode
             * @summary Create and send MFA verification code
             * @request POST:/api/experience/verification/mfa-verification-code
             */
            createAndSendMfaVerificationCode: (data, params = {}) => this.request({
                path: `/api/experience/verification/mfa-verification-code`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Verify the provided MFA verification code. The verification code must have been sent using the MFA verification code endpoint. This endpoint verifies the code against the user's bound identifier and marks the verification as complete if successful.
             *
             * @tags Experience
             * @name VerifyMfaVerificationCode
             * @summary Verify MFA verification code
             * @request POST:/api/experience/verification/mfa-verification-code/verify
             */
            verifyMfaVerificationCode: (data, params = {}) => this.request({
                path: `/api/experience/verification/mfa-verification-code/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Create a new SocialVerification record and return the provider's authorization URI for the given connector.
             *
             * @tags Experience
             * @name CreateSocialVerification
             * @summary Create social verification
             * @request POST:/api/experience/verification/social/{connectorId}/authorization-uri
             */
            createSocialVerification: (connectorId, data, params = {}) => this.request({
                path: `/api/experience/verification/social/${connectorId}/authorization-uri`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Verify the social authorization response data and get the user's identity data from the social provider.
             *
             * @tags Experience
             * @name VerifySocialVerification
             * @summary Verify social verification
             * @request POST:/api/experience/verification/social/{connectorId}/verify
             */
            verifySocialVerification: (connectorId, data, params = {}) => this.request({
                path: `/api/experience/verification/social/${connectorId}/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Create a new EnterpriseSSO verification record and return the provider's authorization URI for the given connector.
             *
             * @tags Experience
             * @name CreateEnterpriseSsoVerification
             * @summary Create enterprise SSO verification
             * @request POST:/api/experience/verification/sso/{connectorId}/authorization-uri
             */
            createEnterpriseSsoVerification: (connectorId, data, params = {}) => this.request({
                path: `/api/experience/verification/sso/${connectorId}/authorization-uri`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Verify the SSO authorization response data and get the user's identity from the SSO provider.
             *
             * @tags Experience
             * @name VerifyEnterpriseSsoVerification
             * @summary Verify enterprise SSO verification
             * @request POST:/api/experience/verification/sso/{connectorId}/verify
             */
            verifyEnterpriseSsoVerification: (connectorId, data, params = {}) => this.request({
                path: `/api/experience/verification/sso/${connectorId}/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Create a new TOTP verification record and generate a new TOTP secret for the user. This secret can be used to bind a new TOTP verification to the user's profile. The verification record must be verified before the secret can be used to bind a new TOTP verification to the user's profile.
             *
             * @tags Experience
             * @name CreateTotpSecret
             * @summary Create TOTP secret
             * @request POST:/api/experience/verification/totp/secret
             */
            createTotpSecret: (params = {}) => this.request({
                path: `/api/experience/verification/totp/secret`,
                method: "POST",
                format: "json",
                ...params,
            }),
            /**
             * @description Verifies the provided TOTP code against the new created TOTP secret or the existing TOTP secret. If a verificationId is provided, this API will verify the code against the TOTP secret that is associated with the verification record. Otherwise, a new TOTP verification record will be created and verified against the user's existing TOTP secret.
             *
             * @tags Experience
             * @name VerifyTotpVerification
             * @summary Verify TOTP verification
             * @request POST:/api/experience/verification/totp/verify
             */
            verifyTotpVerification: (data, params = {}) => this.request({
                path: `/api/experience/verification/totp/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Create a new WebAuthn registration verification record. The verification record can be used to bind a new WebAuthn credential to the user's profile.
             *
             * @tags Experience
             * @name CreateWebAuthnRegistrationVerification
             * @summary Create WebAuthn registration verification
             * @request POST:/api/experience/verification/web-authn/registration
             */
            createWebAuthnRegistrationVerification: (params = {}) => this.request({
                path: `/api/experience/verification/web-authn/registration`,
                method: "POST",
                format: "json",
                ...params,
            }),
            /**
             * @description Verify the WebAuthn registration response against the user's WebAuthn registration challenge. If the response is valid, the WebAuthn registration record will be marked as verified.
             *
             * @tags Experience
             * @name VerifyWebAuthnRegistrationVerification
             * @summary Verify WebAuthn registration verification
             * @request POST:/api/experience/verification/web-authn/registration/verify
             */
            verifyWebAuthnRegistrationVerification: (data, params = {}) => this.request({
                path: `/api/experience/verification/web-authn/registration/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Create a new WebAuthn authentication verification record based on the user's existing WebAuthn credential. This verification record can be used to verify the user's WebAuthn credential.
             *
             * @tags Experience
             * @name CreateWebAuthnAuthenticationVerification
             * @summary Create WebAuthn authentication verification
             * @request POST:/api/experience/verification/web-authn/authentication
             */
            createWebAuthnAuthenticationVerification: (params = {}) => this.request({
                path: `/api/experience/verification/web-authn/authentication`,
                method: "POST",
                format: "json",
                ...params,
            }),
            /**
             * @description Verifies the WebAuthn authentication response against the user's authentication challenge. Upon successful verification, the verification record will be marked as verified.
             *
             * @tags Experience
             * @name VerifyWebAuthnAuthenticationVerification
             * @summary Verify WebAuthn authentication verification
             * @request POST:/api/experience/verification/web-authn/authentication/verify
             */
            verifyWebAuthnAuthenticationVerification: (data, params = {}) => this.request({
                path: `/api/experience/verification/web-authn/authentication/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Create a new BackupCode verification record with new backup codes generated. This verification record will be used to bind the backup codes to the user's profile.
             *
             * @tags Experience
             * @name GenerateBackupCodes
             * @summary Generate backup codes
             * @request POST:/api/experience/verification/backup-code/generate
             */
            generateBackupCodes: (params = {}) => this.request({
                path: `/api/experience/verification/backup-code/generate`,
                method: "POST",
                format: "json",
                ...params,
            }),
            /**
             * @description Create a new BackupCode verification record and verify the provided backup code against the user's backup codes. The verification record will be marked as verified if the code is correct.
             *
             * @tags Experience
             * @name VerifyBackupCode
             * @summary Verify backup code
             * @request POST:/api/experience/verification/backup-code/verify
             */
            verifyBackupCode: (data, params = {}) => this.request({
                path: `/api/experience/verification/backup-code/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Create a NewPasswordIdentity verification record for the new user registration use. The verification record includes a unique user identifier and a password that can be used to create a new user account.
             *
             * @tags Experience
             * @name CreateNewPasswordIdentityVerification
             * @summary Create new password identity verification
             * @request POST:/api/experience/verification/new-password-identity
             */
            createNewPasswordIdentityVerification: (data, params = {}) => this.request({
                path: `/api/experience/verification/new-password-identity`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Verify the provided one-time token against the user's email. If successful, the verification record will be marked as verified.
             *
             * @tags Experience
             * @name VerifyOneTimeTokenVerification
             * @summary Verify one-time token
             * @request POST:/api/experience/verification/one-time-token/verify
             */
            verifyOneTimeTokenVerification: (data, params = {}) => this.request({
                path: `/api/experience/verification/one-time-token/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
            /**
             * @description Adds user profile data to the current experience interaction. <br/>- For `Register`: The profile data provided before the identification request will be used to create a new user account. <br/>- For `SignIn` and `Register`: The profile data provided after the user is identified will be used to update the user's profile when the interaction is submitted. <br/>- `ForgotPassword`: Not supported.
             *
             * @tags Experience
             * @name AddUserProfile
             * @summary Add user profile
             * @request POST:/api/experience/profile
             */
            addUserProfile: (data, params = {}) => this.request({
                path: `/api/experience/profile`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
            /**
             * @description Reset the user's password. (`ForgotPassword` interaction only)
             *
             * @tags Experience
             * @name ResetUserPassword
             * @summary Reset user password
             * @request PUT:/api/experience/profile/password
             */
            resetUserPassword: (data, params = {}) => this.request({
                path: `/api/experience/profile/password`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
            /**
             * @description Skip MFA verification binding flow. If the MFA is enabled in the sign-in experience settings and marked as `UserControlled`, the user can skip the MFA verification binding flow by calling this API.
             *
             * @tags Experience
             * @name SkipMfaBindingFlow
             * @summary Skip MFA binding flow
             * @request POST:/api/experience/profile/mfa/mfa-skipped
             */
            skipMfaBindingFlow: (params = {}) => this.request({
                path: `/api/experience/profile/mfa/mfa-skipped`,
                method: "POST",
                ...params,
            }),
            /**
             * @description Mark the optional additional MFA binding suggestion as skipped for the current interaction. When multiple MFA factors are enabled and only an email/phone factor is configured, a suggestion to add another factor may be shown; this endpoint records the choice to skip.
             *
             * @tags Experience
             * @name SkipMfaSuggestion
             * @summary Skip additional MFA suggestion
             * @request POST:/api/experience/profile/mfa/mfa-suggestion-skipped
             */
            skipMfaSuggestion: (params = {}) => this.request({
                path: `/api/experience/profile/mfa/mfa-suggestion-skipped`,
                method: "POST",
                ...params,
            }),
            /**
             * @description Bind new MFA verification to the user profile using the verificationId.
             *
             * @tags Experience
             * @name BindMfaVerification
             * @summary Bind MFA verification by verificationId
             * @request POST:/api/experience/profile/mfa
             */
            bindMfaVerification: (data, params = {}) => this.request({
                path: `/api/experience/profile/mfa`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
            /**
             * @description Extract the email domain from the provided email address. Returns all the enabled SSO connectors that match the email domain.
             *
             * @tags Experience
             * @name GetEnabledSsoConnectors
             * @summary Get enabled SSO connectors by the given email's domain
             * @request GET:/api/experience/sso-connectors
             */
            getEnabledSsoConnectors: (query, params = {}) => this.request({
                path: `/api/experience/sso-connectors`,
                method: "GET",
                query: query,
                format: "json",
                ...params,
            }),
        };
    }
}
