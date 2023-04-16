# Componente de seguridad

Componente de seguridad


## Definición de un repo

| DEfinición | Valores | Ejemplo |
| :-------- | :------- | :------------------------- |
| Nombre del proyecto | `any` | **Required**. barbapp |
| Separador | `_` | **Required**. |
| Área | `d = dev \| i = infra \| s = security \| dv = devops` | **Required**. _d_ |
| Separador | `_` | **Required**. |
| Componente | `sv = service \| ms = microservice \| api = api \| lib = library \| webapp = web \| app = app` | **Required**. _d_ |
| Separador | `_` | **Required**. |
| Nombre de repositorio | `any` | **Required**. Token |
| Separador | `_` | **Required**. |
| Operación | `any` | Consultas |

Ejemplo:
> barbapp_d_ms_token_consultas


# API reference

## Instalation

This project require [Node.js](https://nodejs.org/) v10+ to running.

Note: This projet depend of pspc-security-users

- Step #1: Install serverless

```sh
npm install -g serverless@3.19.0
```

- Step #2: Install plugins

```sh
npm install -g serverless-offline
npm install -g serverless-deployment-bucket
npm install -g serverless-iam-roles-per-function
```
- Step #3: Install dependencies

```sh
npm install
```

# Run lambdas with serverless-offline:

For run your source code, follow next steps:

- Step #1:

```sh
set REGION=us-east-1&&\
serverless offline --stage dev --region us-east-1
```

Note: We can also use the following commands:
```sh
serverless offline --httpPort 4000 --stage dev --region us-east-1
or
sls offline --httpPort 4000 --stage dev --region us-east-1
```

https://www.serverless.com/plugins/serverless-offline


# Deploy resources on AWS:

For deploy resources on AWS, follow the next steps:

- Step #1: Compile source code

```sh
npm run build
```

- Step #2: Deploy on AWS with Serverless

```sh
serverless deploy --stage dev --region us-east-1
```

# Delete resources deployed on AWS:

For delete deploy resources on AWS, follow the next steps:

- Step #1: Delete resources

```sh
serverless remove --stage dev --region us-east-1
```

# API Gateway

https://g3xphpg3r8.execute-api.us-east-1.amazonaws.com/


# Example

For test the lambda on aws:

```json
{
  "body": "{\"message\":\"hola\",\"phoneNumber\":\"+573105397699\"}"
}
```

# Other commands:
```ts
//Commands for execute with express
//"@types/express": "4.17.13",
//"express": "4.17.3",

'use strict';
import express from "express";
import { authorizer, unAuthorizer, authorization } from "./src/main/application/routes/index.route";

const app = express();
const port = process.env.SERVER_PORT || 4000;
const stage = process.env.STAGE || "dev";
app.use(express.json());

app.post(`/${stage}/endpoint`, async (req, res) => authorizer(req, res));

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
export { 
    app
};
```

```bash
npm install <package-name> --save-dev
npm install --only=prod

npm install will install both "dependencies" and "devDependencies"
npm install --production will only install "dependencies"
npm install --dev will only install "devDependencies"

If you have already installed all your dependencies, and you want to avoid having to download your production packages from NPM again, you can simply type:

npm prune --production
```



{
  "methodArn":"arn:aws:execute-api:us-east-1:233925838033:boa6f2uvga/ESTestInvoke-stage/GET/",
  "headers": {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IiJ9.eyJ1c2VybmFtZSI6IjYzOTZkYmNmLWI5YjQtNDYzMC05Y2U0LTFlN2YwYWE5YjBjNyIsIm5hbWUiOiJKb3NlIE1lamlhIiwiaWF0IjoxNjc5MzM3NTI2LCJleHAiOjE3MTA4NzM1MjYsImF1ZCI6ImJhcmJhcHAiLCJzdWIiOiI2Mzk2ZGJjZi1iOWI0LTQ2MzAtOWNlNC0xZTdmMGFhOWIwYzciLCJqdGkiOiIxZGViYzlmOS0wZjZjLTRmMjctYjM2Zi0xNDc5YzlkZmQzYjYifQ.sYk_sVarTNC5cATYmwGlb0gErlmzXlrteVvlxjPSTF0"
  }
}


fields @timestamp, @message
| filter 'DEzrdHmeIAMFfAg='
| sort @timestamp desc
| limit 20 