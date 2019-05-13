// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    backendUrl: "http://localhost:5000",
    eventApiUrl: "http://localhost:8080",
    taskApiUrl: "http://localhost:5000",
    userApiUrl: "http://localhost:5000",
    memberApiUrl: "http://localhost:5000",
    poolData: {
        UserPoolId: "ca-central-1_ZBpO9AVc6",
        ClientId: "3ee8od3smf4ghostv4jdvafjrv"
    }
};
