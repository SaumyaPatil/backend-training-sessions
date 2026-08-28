// cookies are not sent when you request different origin
// cred: include

// Access-Control-Allow-Origin: '<specify kro origin you cant have \*>'

// CORS is for security vulnarability
// Server cant allow any domain, so the access is given to the server to decide which domain it wants to allow to access it.
// It happens in get/post

// what about put/patch/delete -
// preflight request to check if it is given access-control-allow-origin then only it resolves normal request

// POSTMAN doesnt throw cors issue, cause its server to server communication, cookies are stored in browser so its concept of browser
// \* means all origin - public apis allow all origin
