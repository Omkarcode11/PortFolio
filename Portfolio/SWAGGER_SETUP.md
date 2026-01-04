# Swagger/OpenAPI Documentation Setup

Complete Swagger UI integration for the Portfolio API.

## 📍 Access Swagger UI

Once your development server is running, access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

## 🚀 Features

- **Interactive API Documentation**: Test endpoints directly from the browser
- **Request/Response Examples**: Comprehensive examples for all endpoints
- **Schema Definitions**: Full data models with validation rules
- **Authentication Support**: Documented authentication via session cookies
- **Try It Out**: Execute API calls directly from the documentation

## 📋 Included Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/{id}` - Get project by ID
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Articles
- `GET /api/articles` - Get all articles
- `POST /api/articles` - Create new article
- `GET /api/articles/{id}` - Get article by ID
- `PUT /api/articles/{id}` - Update article
- `DELETE /api/articles/{id}` - Delete article

### Resume
- `GET /api/resume` - Get resume data
- `PUT /api/resume` - Update resume data

## 📝 Request Examples

The Swagger UI includes multiple example payloads for each endpoint:

### Project Examples
- **Full Project**: Complete project with all fields
- **Minimal Project**: Only required fields

### Article Examples
- **Full Article**: Complete article with Markdown content
- **Minimal Article**: Only required fields

### Update Examples
- **Update Single Field**: Example of updating just one field
- **Update Multiple Fields**: Example of updating multiple fields

## 🔐 Authentication

To use authenticated endpoints in Swagger UI:

1. **Login via Browser**
   - Go to `http://localhost:3000/admin/login`
   - Login with your admin credentials

2. **Get Session Token**
   - Open Browser DevTools (F12)
   - Go to Application → Cookies (Chrome) or Storage → Cookies (Firefox)
   - Copy the value of `next-auth.session-token`

3. **Use in Swagger UI**
   - Click "Authorize" button at the top of Swagger UI
   - Paste your session token
   - Click "Authorize"
   - All authenticated endpoints will now work

## 📁 File Structure

```
portfolio/
├── public/
│   └── swagger.json          # OpenAPI 3.0 specification
├── src/
│   └── pages/
│       └── api-docs.tsx      # Swagger UI page
└── package.json              # Includes swagger-ui-react
```

## 🛠️ Customization

### Update API Documentation

Edit `public/swagger.json` to update:
- API descriptions
- Request/response examples
- Schema definitions
- Endpoint paths

### Update Swagger UI Page

Edit `src/pages/api-docs.tsx` to customize:
- Page layout
- Swagger UI configuration
- Styling

### Swagger UI Configuration Options

Available in `api-docs.tsx`:
- `docExpansion`: Controls default expansion state ("list", "full", "none")
- `defaultModelsExpandDepth`: Depth for model schemas
- `tryItOutEnabled`: Enable/disable "Try it out" feature

## 📦 Dependencies

- `swagger-ui-react`: React component for Swagger UI
- OpenAPI 3.0 specification format

## 🔄 Updating Documentation

When you add new API endpoints:

1. **Update `public/swagger.json`**
   - Add new endpoint to `paths` section
   - Add request/response schemas to `components/schemas`
   - Add examples to request body

2. **Test in Swagger UI**
   - Navigate to `/api-docs`
   - Verify endpoint appears
   - Test with "Try it out"

## 📚 OpenAPI Specification

The API uses OpenAPI 3.0 specification format. Key sections:

- **info**: API metadata (title, version, description)
- **servers**: Base URLs for API
- **paths**: All API endpoints with operations
- **components**: Reusable schemas, responses, security schemes
- **tags**: Grouping of endpoints

## 🎨 Example Payloads

### Create Project (POST /api/projects)

```json
{
  "slug": "my-awesome-project",
  "title": "My Awesome Project",
  "description": "A detailed description of the project",
  "tags": ["React", "Node.js", "TypeScript"],
  "link": "https://myproject.com",
  "github": "https://github.com/username/repo",
  "image": "/images/projects/my-project.jpg"
}
```

### Create Article (POST /api/articles)

```json
{
  "slug": "understanding-react-hooks",
  "title": "Understanding React Hooks",
  "date": "2024-01-15",
  "description": "A comprehensive guide to React Hooks",
  "tags": ["React", "JavaScript", "Web Development"],
  "content": "# Understanding React Hooks\n\nArticle content in Markdown...",
  "coverImage": "/images/articles/react-hooks.jpg"
}
```

### Update Project (PUT /api/projects/{id})

```json
{
  "title": "Updated Project Title",
  "description": "Updated description",
  "tags": ["React", "Node.js", "Updated Tag"]
}
```

## 🔍 Validation

Swagger UI validates:
- Required fields
- Data types
- String formats (email, URI, date)
- Array structures
- Object schemas

## 💡 Tips

1. **Use Examples**: Click on example dropdowns to see different payload options
2. **Try It Out**: Test endpoints directly from Swagger UI
3. **View Responses**: See actual API responses with status codes
4. **Copy cURL**: Use "Copy cURL" to get command-line requests
5. **Schema Reference**: Expand schemas to see full data structures

## 🐛 Troubleshooting

### Swagger UI not loading
- Check browser console for errors
- Verify `swagger.json` is accessible at `/swagger.json`
- Ensure `swagger-ui-react` is installed

### Authentication not working
- Make sure you're logged in via browser first
- Copy the exact cookie value (no extra spaces)
- Token expires after session timeout

### Examples not showing
- Check `swagger.json` format (valid JSON)
- Verify examples are in correct format
- Clear browser cache and reload

## 📖 Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [OpenAPI Examples](https://github.com/OAI/OpenAPI-Specification/tree/main/examples)

