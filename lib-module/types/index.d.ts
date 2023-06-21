import { Entity } from "./models/entity";

declare module "adv-mg-api-js" {
  /**
   * Entrypoint to API. Separate class is used to expose "public"
   * methods only to the user - Babel currently doesn't support
   * ES10 access modifiers
   */
  export class GeotabApi {
    /**
     * Constructor for GeotabApi
     *
     * @param {Object} authentication Holds credentials: {
     *                                  userName: '',
     *                                  password/sessionId: '',
     *                                  database: ''
     *                              }
     *                                  path: '',
     * @param {*} newOptions overrides default options
     */
    constructor(
      authentication?: GeotabAuthentication,
      newOptions?: GeotabApiOptions
    );
    /**
     * Authenticates the user against the server. Gets the sessionId and other relevant session information
     *
     * @param {function} callbackSuccess optional callback for successful authentications
     * @param {function} callbackError optional callback for unsuccessful authentications
     * @returns {promise} Call promise - result will be either response.data.error or response.data.result
     */
    authenticate(
      callbackSuccess?: Function,
      callbackError?: Function
    ): Promise<any>;
    /**
     * Constructs an API call to MyGeotab
     *
     * @param {string} method method name for the API call
     * @param {Object} params method's parameters
     * @param {function} callbackSuccess Optional callback for successful calls
     * @param {function} callbackError Optional callback for unsuccessful calls
     * @returns {promise} an axios promise which will resolve to either data.error or data.result
     */
    call(
      method: string,
      params: GeotabCall,
      callbackSuccess?: Function,
      callbackError?: Function
    ): Promise<any>;
    /**
     *  Constructs a multicall to myGeotab
     *
     * @param {array} calls array of calls to be included in the multicall
     * @param {function} callbackSuccess optional callback function for successful multicalls
     * @param {function} callbackError optional callback function for unsuccessful multicalls
     * @returns {promise} returns call promise
     */
    multiCall(
      calls: GeotabMultiCallParams[],
      callbackSuccess?: Function,
      callbackError?: Function
    ): Promise<any>;
    /**
     * Gets a stored or new session
     * @param {function} callbackSuccess optional callback for successes
     * @param {boolean} newSession override any stored credentials and fetch a new session
     * @returns {promise} returns call promise
     */
    getSession(
      callbackSuccess?: Function,
      newSession?: boolean
    ): Promise<GeotabSession>;
    /**
     * Forgets the session in local storage
     * Resets session with already provided credentials
     */
    forget(): Promise<any>;
  }

  export type TypeName =
    | "Device"
    | "Group"
    | "Trip"
    | "LogRecord"
    | "StatusData"
    | "ExceptionEvent"
    | "Rule"
    | "Diagnostic"
    | "User"
    | "Certificate";

  export interface DeviceSearch {
    id?: string;
    vin?: string;
  }

  export interface GroupSearch {
    id?: string;
  }

  export interface DiagnosticSearch {
    id?: string;
  }

  export interface Search {
    id?: string;
    name?: string;
    deviceSearch?: DeviceSearch;
    groupSearch?: GroupSearch;
    diagnosticSearch?: DiagnosticSearch;
    fromDate?: string;
    toDate?: string;
  }

  export interface FeedSearch {
    fromDate?: string;
  }

  export interface BaseCall {
    typeName: TypeName;
    resultsLimit?: number;
  }

  export interface FeedCall extends GeotabCall {
    fromVersion?: string | null;
    search: FeedSearch;
  }

  export interface FeedResult<T extends Entity> {
    data: T[];
    toVersion: string;
  }

  export interface GeotabCall extends BaseCall {
    entity?: Entity;
    search?: Search;
  }

  export type GeotabMultiCallParams = ["Get", GeotabCall][];

  export interface GeotabSession {
    path: string;
    credentials: GeotabCredentials;
  }

  export interface GeotabAuthentication {
    credentials: GeotabCredentials;
    path?: string;
  }

  export interface GeotabCredentials {
    database: string;
    userName: string;
    password?: string;
    sessionId?: string;
  }

  export interface GeotabApiOptions {
    fullResponse?: boolean;
    rememberMe?: boolean;
    timeout?: number;
    newCredentialsStore?: boolean;
  }
}
