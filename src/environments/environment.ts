// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {

    production: false,
    eventApiUrl: "http://proto-event-service.us-east-1.elasticbeanstalk.com",
    taskApiUrl: "http://proto-task-service.us-east-1.elasticbeanstalk.com",
    userApiUrl: "http://proto-auth-service.us-east-1.elasticbeanstalk.com",
    memberApiUrl: "http://proto-member-service.us-east-1.elasticbeanstalk.com"

};
