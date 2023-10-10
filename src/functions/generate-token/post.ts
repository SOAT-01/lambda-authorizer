import { APIGatewayEvent } from "aws-lambda";
import ApiResponse from "../../utils/ApiResponse";
import jwt from "jsonwebtoken";

const generateUserToken = async (event: APIGatewayEvent) => {
  const body = JSON.parse(event.body || "{}");
  if (body.cpf) {
    return ApiResponse(400, { error: "Username is required" });
  }
  console.log(
    "🚀 ~ file: post.ts:11 ~ generateUserToken ~ process.env.PRIVATE_KEY:",
    process.env.PRIVATE_KEY
  );
  const token = jwt.sign({ cpf: body.cpf }, process.env.PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
  return ApiResponse(200, { token });
};

module.exports.api = generateUserToken;
