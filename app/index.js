'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var BasicAppGenerator = module.exports = function BasicAppGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.cowsay = this.readFileAsString(path.join(__dirname, '../COWSAY'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BasicAppGenerator, yeoman.generators.Base);

BasicAppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'projectName',
    message: 'Qual o nome do projeto?',
    default: 'Projeto'
  }, {
    name: 'projectDescription',
    message: 'Qual a descrição do projeto?',
    default: 'Apenas um projeto interessante'
  }, {
    name: 'projectAuthor',
    message: 'Qual o nome do desenvolvedor do projeto?',
    default: 'Thiago Lagden'
  }];

  this.prompt(prompts, function(props) {
    this.projectName = props.projectName;
    this.projectDescription = props.projectDescription;
    this.projectAuthor = props.projectAuthor;
    this.format = 'css';
    this.installProjectDependencies = true;
    cb();
  }.bind(this));
};

BasicAppGenerator.prototype.app = function app() {
  this.template('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('README.md', 'README.md');
  this.copy('index.html', 'index.html');
  this.copy('_Gruntfile.coffee', 'Gruntfile.coffee');
  this.directory('css', 'css');
  this.directory('js', 'js');
};

BasicAppGenerator.prototype.writePackage = function writePackage() {
  var _packageFile = path.join(__dirname, './templates/_package.json');
  var _package = JSON.parse(this.readFileAsString(_packageFile));
  _package.name = this._.slugify(this.projectName);
  _package.description = this.projectDescription;
  _package.author.name = this.projectAuthor;
  this.write('package.json', JSON.stringify(_package));
};

BasicAppGenerator.prototype.bootstrapFiles = function bootstrapFiles() {
  var packages = {
    css: 'bootstrap'
  };
  this.bowerInstall(packages[this.format], {
    save: true
  });
};

BasicAppGenerator.prototype.end = function end() {
  process.stdout.write(this.cowsay);
};
