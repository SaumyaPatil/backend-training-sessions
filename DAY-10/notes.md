- Middleware functions
  Middleware is a special kind of function in Express JS which accepts the request from

        the user (or)
        the previous middleware

  After processing the request the middleware function

        sends the response to another middleware (or)
        calls the API Handler (or)
        sends response to the user

        app.method(Path, middleware1, handler);

  const jsonMiddleware = express.json();
  app.use(jsonMiddleware);

  It is a built-in middleware function it recognizes the incoming request object as a JSON object, parses it, and then calls handler in every API call

- Multiple Middleware functions
  We can pass multiple middleware functions

        app.method(Path, middleware1, middleware2, handler);

- MVC architecture
  https://medium.com/@harshc0707/mvc-architecture-building-scalable-web-applications-a7dd55610583
