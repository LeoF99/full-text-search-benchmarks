# Full-Text Search Benchmarks

## Description

Nest.js application to test and benchmark Full-Text Search solutions

## Dependencies

Set node version using:

```bash
$ nvm use
```

To install the projects dependencies, run the following command:

```bash
$ npm install
```

> For M1 Users check [here](###M1-Users)

## Running the app

We need an instance of mySQL running to connect to and also one from RabbitMQ. For that, we have a docker-compose file to help. Just execute the following command to spin it up:

```bash
$ docker-compose up db queue
```

> For M1 Users check [here](###M1-Users)

You also need to have the .env file configured correctly. To do that, just create a copy of `environments/.env.local` named `environments/.env`.

Once that's done, we can run the app with one of these:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Testing

We have several kinds of tests for our application:

```bash
# unit tests
$ npm run test:unit

# integration tests
$ npm run test:int

# to run all tests at once
$ npm run test
```

## Contributing

We encourage small and testable commits. All commits must start with the story card they refer to and a message indicating what exactly that commit changes. If you're pairing with someone, please add that person as a contributor as well. You can add this to your commit message: `Co-authored-by: name <name@example.com>`.

## Database migrations

Before generating a new migration, you must build your ts files into js files. To automatically build and generate a new migration based on our TypeORM entities, simply execute:

```bash
npm run migration:generate --filename=<NameOfTheMigration>
```

If you want to create a new empty migration, run:

```bash
npm run migration:create --filename=<NameOfTheMigration>
```

A migration file with .ts extension will be create in `src/migrations` folder.

```
### M1 Users

Issues you may find while setup:

* [`npm install`] Puppeteer: The chromium binary is not available for arm64. Add to your `~/.zshrc`
```

export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=`which chromium`

````

* [`docker-compose up db`] MySQL image: no matching manifest for linux/arm64/v8 in the manifest list entries. You need to pull the image manually:
```bash
$ docker pull --platform linux/amd64 mysql:8.0.20
````

> In case you're still facing issues running it, try to install rosetta `softwareupdate --install-rosetta`
