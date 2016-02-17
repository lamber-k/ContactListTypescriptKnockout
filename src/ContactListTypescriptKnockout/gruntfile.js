/// <binding ProjectOpened='watch:tasks' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            all: [
                'build',
                'wwwroot/core',
                'wwwroot/modules',
                'wwwroot/typings',
                'wwwroot/fonts',
                'wwwroot/styles',
                'wwwroot/*.{css,html,js,js.map,ts}'
            ]
        },

        copy: {
            debug: {
                files: [
                    { expand: true, flatten: false, cwd: 'scripts/app', src: ['**/*.{js,js.map,html,css,ts}'], dest: 'wwwroot' }
                ]
            },
            release: {
                files: [
                    { expand: true, flatten: false, cwd: 'wwwroot/lib', src: ['**/*'], dest: 'build/lib' },
                    { expand: true, flatten: false, cwd: 'scripts/app', src: ['**/*.{js,html}'], dest: 'build/' },
                    { expand: true, flatten: true, src: ['wwwroot/lib/bootstrap/dist/fonts/*'], dest: 'wwwroot/fonts' }
                ]
            }
        },

        cssmin: {
            release: {
                files: {
                    'wwwroot/styles/styles.min.css': [
                        'scripts/app/modules/contacts/contacts.css',
                        'scripts/app/app.css',
                        'wwwroot/lib/bootstrap/dist/css/bootstrap*.min.css'
                    ]
                }
            }
        },

        processhtml: {
            debug: {
                files: {
                    'wwwroot/index.html': ['wwwroot/index.html']
                }
            },
            release: {
                files: {
                    'wwwroot/index.html': ['build/index.html']
                },
                options: {
                    strip: true
                }
            },
        },

        requirejs: {
            release: {
                options: {
                    include: [
                        "core/main",
                        "core/boot",
                        "modules/contacts/viewmodels/contacts",
                        "modules/contacts/viewmodels/contact_details",
                        "modules/contacts/viewmodels/contact_form",
                        'knockout',
                        'text'
                    ].concat(grunt.file.expand({
                        cwd: 'build/modules/contacts/views/'
                    }, '*.html').map(function (path, key) {
                        return ('text!modules/contacts/views/' + path)
                    })),
                    inlineText: true,
                    keepBuildDir: true,
                    optimize: 'uglify2',
                    pragmas: {
                        build: true
                    },
                    wrap: true,
                    baseUrl: 'build',
                    mainConfigFile: 'build/core/main.js',
                    out: 'wwwroot/main.js'
                }
            }
        },

        watch: {
            files: ["scripts/app/**/*.{js,ts,html,css}"],
            tasks: ['debug']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('debug', ['clean:all', "copy:debug", 'processhtml:debug']);
    grunt.registerTask('release', ['clean:all', "copy:release", "cssmin:release", 'processhtml:release', 'requirejs:release']);
};