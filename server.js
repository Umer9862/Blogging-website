// Import required modules
import express from 'express';

// Create an instance of Express
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Array to store blog posts (each post has an 'id' field)
const blogPosts = [];

// Define a route to render the "index.ejs" file and pass the blog posts
app.get('/', (req, res) => {
  res.render('index', { blogPosts });
});

// Define a route to render the "create-blog.ejs" file
app.get('/create-blog', (req, res) => {
  res.render('create-blog');
});

// Handle the POST request to "/create"
app.post('/create', (req, res) => {
  const { heading, content } = req.body;

  // Generate a unique 'id' for the new blog post
  const id = Date.now().toString();

  // Store the new blog post in the array
  blogPosts.push({ id, heading, content });

  // Redirect back to the index page after creating the blog
  res.redirect('/');
});

// Define a route to view a full blog post
app.get('/view/:id', (req, res) => {
  const postId = req.params.id;
  console.log(postId)
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    // Handle the case where the specified post ID is not found
    res.status(404).send('Blog post not found.');
  } else {
    // Pass the blogPosts array to the "view-blog.ejs" template
    res.render('view-blog', { blogPosts, post });
  }
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
