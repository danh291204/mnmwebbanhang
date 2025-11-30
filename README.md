# Mini Electronics Shop (PHP + HTML)

Simple demo project that shows a product list and a basic add-to-cart flow implemented with PHP sessions.

How to run (Windows PowerShell):

1. Open PowerShell and change to the project folder:

```powershell
cd d:\mnm
```

2. Start PHP built-in web server (needs PHP installed and in PATH):

```powershell
php -S localhost:8000
```

3. Open in browser: `http://localhost:8000/index.html`

Notes:
- The backend endpoints are under `api/` and use PHP sessions to store the cart.
- You can inspect JSON endpoints directly, e.g. `http://localhost:8000/api/products.php`.
