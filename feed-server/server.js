const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/posts', (req, res, next) => {
  const posts = router.db.get('posts').value();
  const post = {
    ...req.body,
    id: Date.now(),
  };
  posts.unshift(post);
  router.db.set('posts', posts).write();
  res.json(post);
});

server.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:4200'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

server.use(router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
