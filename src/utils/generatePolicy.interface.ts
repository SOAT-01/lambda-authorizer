export interface Statements {
  Action?: string;
  Effect?: string;
  Resource?: string;
}

export interface PolicyDocument {
  Version?: string;
  Statement?: Statements[];
}

export interface AuthResponse {
  principalId?: string;
  policyDocument?: PolicyDocument;
}
