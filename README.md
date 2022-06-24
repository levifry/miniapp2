# **Minesweeper App**

```
Assumptions:
- Npm must be installed
- Node must be installed
- Docker must be installed
- Commands assume a Mac terminal (other OS commands may vary)
```

# Clone the repo, get running in 5 Minutes:

### **Client**
1. Enter the client directory
    - `cd client`
2. Install needed modules
    - `npm install`
3. Start the client
    - `npm start`
```
Client will now be running on http://localhost:3000
```

### **Server**
4. Enter the server directory
    - `cd ../server`
5. Install needed modules
    - `npm install`
6. Start the server
    - `npm start`
```
Server will now be running on http://localhost:3001
```

### **Database**
7. Create a volume to store docker files
    - `mkdir -p $HOME/docker/volumes/miniapp2`
8. Start a docker container with postgres
    - `docker run -e POSTGRES_PASSWORD=miniapp2pwd -d -p 5432:5432 -v $HOME/docker/volumes/miniapp2:/var/lib/postgresql/data --name miniapp2 postgres`
9. Initialize the database
    - `npm run build`
10. Migrate the database up to add the movies table
    - `npx knex migrate:up`
11. Seed the database with initial entries *(Optional)*
    - `npx knex seed:run`
```
Database will now be running on http://localhost:5432
```

### **Enjoy!**
12. Open the app at http://localhost:3000 and begin browsing!