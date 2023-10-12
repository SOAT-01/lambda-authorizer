import { Callback, Context } from "aws-lambda";
import jwt from "jsonwebtoken";
import { getClienteByCpf } from "@/gateway/clienteGateway";
import { generatePolicy } from "@/utils/generatePolicy";

const validateUserToken = async (
  event: any,
  _: Context,
  callback: Callback
) => {
  const [tokenType, token] = event.headers.Authorization.split(" ");
  if (tokenType !== "Bearer") {
    return callback("Unauthorized");
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.PUBLIC_KEY) as {
      cpf?: string;
    };

    if (!!verifiedToken?.cpf) {
      const results = await getClienteByCpf(verifiedToken?.cpf);
      if (results[0].length === 0) {
        return callback("Unauthorized");
      }
    }
    return callback(
      null,
      generatePolicy(verifiedToken.cpf, "Allow", event.methodArn)
    );
  } catch (error) {
    console.log(error);
    return callback("Unauthorized");
  }
};

module.exports.handler = validateUserToken;
