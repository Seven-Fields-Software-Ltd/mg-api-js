import { Entity } from "./models/entity";

export { GeotabApi } from "./GeotabApi";

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
