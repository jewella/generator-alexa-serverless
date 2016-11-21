'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('Alexa Skill') + ' generator! Now with ' + chalk.yellow('Serverless Framework') + ' support!'
    ));

    var prompts = [
      { type: 'input', name: 'name', message: 'Your skill name', default: this.appname },
      { type: 'input', name: 'description', message: 'Description', when: function(props) { return props.description; } }
    ];

    this.prompt(prompts, function(props) {
      this.props = props;

      this.log(chalk.bold.white('\nYou must have AWS credentials configured before deploying. ' + chalk.cyan('(https://serverless.com/framework/docs/providers/aws/guide/credentials/)\n')));

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var data = {
        name: this.props.name,
        fileName: _.kebabCase(this.props.name),
        className: _.capitalize(_.camelCase(this.props.name)),
        description: this.props.description
      };

      this.fs.copy(this.templatePath('_babelrc'), this.destinationPath('.babelrc'));
      this.fs.copy(this.templatePath('_eslintrc.json'), this.destinationPath('.eslintrc.json'));
      this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
      this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), data);
      this.fs.copy(this.templatePath('_travis.yml'), this.destinationPath('.travis.yml'));
      this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), data);
      this.fs.copyTpl(this.templatePath('serverless.yml'), this.destinationPath('serverless.yml'), data);

      // Create in generated 'bin' dir
      this.fs.copy(this.templatePath('bin/utterances'), this.destinationPath('bin/utterances'));

      // Create in generated 'config' dir
      this.fs.copyTpl(this.templatePath('config/webpack.config.babel.js'), this.destinationPath('config/webpack.config.babel.js'), data);

      // Create in generated 'model' dir
      this.fs.copy(this.templatePath('model/dictionary.json'), this.destinationPath('model/dictionary.json'));
      this.fs.copy(this.templatePath('model/schema.json'), this.destinationPath('model/schema.json'));
      this.fs.copy(this.templatePath('model/UTTERANCES'), this.destinationPath('model/UTTERANCES'));

      // Create in generated 'src' dir
      this.fs.copyTpl(this.templatePath('src/index.js'), this.destinationPath('src/index.js'), data);
      this.fs.copyTpl(this.templatePath('src/skill.js'), this.destinationPath('src/' + data.fileName + '.js'), data);

      // Create in generated 'test' dir
      this.fs.copyTpl(this.templatePath('test/index-test.js'), this.destinationPath('test/index-test.js'), data);
    }
  },

  install: function () {
    this.npmInstall();
  }
});
