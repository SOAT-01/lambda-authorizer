import { APIGatewayEvent } from "aws-lambda";
import ApiResponse from "../../utils/ApiResponse";

const generateUserToken = async (event: APIGatewayEvent) => {
  return ApiResponse(200, { token: "Generated token" });
};

module.exports.api = generateUserToken;
