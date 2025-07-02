## Local Development

To run the app locally, always use:

    http://localhost:3000

### How to Start

1. Open a terminal in the project root (where `package.json` and `app/` are located).
2. Install dependencies (if not already):
   ```sh
   pnpm install
   ```
3. Start the development server:
   ```sh
   npx next dev
   ```
4. Open your browser and go to:
   [http://localhost:3000](http://localhost:3000)

### Troubleshooting
- If you see "This site can't be reached" or `ERR_CONNECTION_REFUSED`, make sure the server is running and you have not closed the terminal.
- If you see a port in use error, stop other apps using port 3000 or run:
  ```sh
  npx next dev -p 3001
  ```
  and use [http://localhost:3001](http://localhost:3001).
- If you see build or dependency errors, run `pnpm install` again and check the terminal for details.

**All team members should use `http://localhost:3000` as the default local address.** 