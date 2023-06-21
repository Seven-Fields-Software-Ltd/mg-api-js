import {
  GeotabApiOptions,
  GeotabCall,
  GeotabCredentials,
  GeotabMultiCallParams,
  GeotabSession,
} from "./";

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
  constructor(authentication: GeotabCredentials, newOptions?: GeotabApiOptions);
  /**
   * Authenticates the user against the server. Gets the sessionId and other relevant session information
   *
   * @param {function} callbackSuccess optional callback for successful authentications
   * @param {function} callbackError optional callback for unsuccessful authentications
   * @returns {promise} Call promise - result will be either response.data.error or response.data.result
   */
  authenticate(
    callbackSuccess: Function,
    callbackError: Function
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
    callbackSuccess: Function,
    callbackError: Function
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
    callbackSuccess: Function,
    callbackError: Function
  ): Promise<any>;
  /**
   * Gets a stored or new session
   * @param {function} callbackSuccess optional callback for successes
   * @param {boolean} newSession override any stored credentials and fetch a new session
   * @returns {promise} returns call promise
   */
  getSession(
    callbackSuccess: Function,
    newSession: boolean
  ): Promise<GeotabSession>;
  /**
   * Forgets the session in local storage
   * Resets session with already provided credentials
   */
  forget(): Promise<any>;
}
