import {
  AuthResponse,
  PolicyDocument,
  Statements,
} from "./generatePolicy.interface";

export const generatePolicy = (
  principalId: string,
  effect: string,
  resource: string
) => {
  const authResponse: AuthResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument: PolicyDocument = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    const statementOne: Statements = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};
