//import { APIGatewayProxyResult } from 'aws-lambda';

export const denyAllPolicy = (error?: any) => {
    return {
        principalId: "*",
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    "Action": "*",
                    "Effect": "Deny",
                    "Resource": "*"
                }
            ]
        },
        context: {
            body: JSON.stringify(error),
        }
    }
}

/**
 * @description Creates the IAM policy for the response.
 * @returns APIGatewayProxyResult
 */
export const allowPolicy = (principalId: any, resource: any, data: any): Promise<any> => {
    // @see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html
    let authResponse: any = {
        principalId: principalId,
    };
    if (principalId) {
        if (resource) {
            const policyDocument: any = {
                Version: '2012-10-17',
                Statement: []
            };
            const statement = {
                Action: 'execute-api:Invoke',
                Effect: "Allow",
                Resource: resource
            };
            policyDocument.Statement[0] = statement;
            authResponse.policyDocument = policyDocument;
        }
    } else {
        authResponse = denyAllPolicy();
    }
    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {
        //stringKey: JSON.stringify(data),
        ...data,
    };
    return authResponse;
}
