# Local Development Hosts Setup

To test the app subdomain locally, you need to configure your hosts file to map `app.localhost` to your local machine.

## Step 1: Edit your hosts file

### On macOS/Linux:

1. Open Terminal
2. Run the following command to edit the hosts file:
   ```bash
   sudo nano /etc/hosts
   ```
3. Enter your password when prompted

### On Windows:

1. Open Notepad as Administrator (right-click Notepad and select "Run as administrator")
2. Open the file: `C:\Windows\System32\drivers\etc\hosts`

## Step 2: Add the following line to your hosts file

```
127.0.0.1 app.localhost
```

## Step 3: Save the file

- On macOS/Linux: Press `Ctrl+O` to save, then `Ctrl+X` to exit
- On Windows: Save the file (you may need to save it to your desktop first, then copy it to the original location)

## Step 4: Verify the setup

1. Start the Next.js development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   - Main site: http://localhost:3000
   - App subdomain: http://app.localhost:3000

3. You should see different content for each URL, confirming that the subdomain routing is working correctly.

## Troubleshooting

If the subdomain routing is not working:

1. Make sure your hosts file is correctly configured
2. Restart your browser
3. Try accessing the app subdomain with the port number: `http://app.localhost:3000`
4. Clear your browser cache
5. Restart the Next.js development server

## Note

The `localhost` domain and its subdomains are special and don't require additional DNS configuration. Modern browsers automatically resolve `*.localhost` to `127.0.0.1`. 