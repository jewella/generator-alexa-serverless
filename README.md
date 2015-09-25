# Alexa Skill generator for AWS Lambda

Get up and running with everything you need to create an Alexa Skill to run on
AWS Lambda.

This is an alexa-skill generator for [Yeoman](http://yeoman.io).

## Recommended setup

Install `yo` and `generator-alexa-skill` globally using `npm`.

```
$ npm install -g yo generator-alexa-skill
```

Make a new directory, and `cd` into it:

```
$ mkdir alexa-skill-hello-world && cd $_
```

You're now ready to generate a skill!

## The generator

To generate a new skill:

```
$ yo alexa-skill <package-name>
```

Example:

```
$ yo alexa-skill hello-world
$ npm install
```

Produces a package named `alexa-skill-hello-world` with the following output:

```
.
├── lib
│   └── hello-world.js
├── node_modules
├── test
│   └── hello-world.spec.js
├── .gitignore
├── index.js
├── LICENSE.md
├── package.json
├── README.md
└── webpack.config.js
```

Add your skill logic into `lib/<package-name>.js`. It's an ES6 class and each
function is an intent on your alexa skill. See [alexa-lambda-skill](https://github.com/cameronhunter/alexa-lambda-skill)
for more details.

## Building for AWS Lambda

To build your skill for AWS Lambda:

```
$ npm run build
```

This creates a file `dist/<package-name>.js` which is the compiled and minified
skill. You can copy and paste the contents of this file directly into the AWS
Lambda console.
