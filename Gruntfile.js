const { option } = require("grunt");

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            development:{
                files:{
                    'dev/styles/main.css' : 'src/styles/main.less',
                }
            },
            production:{
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css' : 'src/styles/main.less',
                }
            }
        },
        watch: {
            less: {
                files:['src/styles/**/*.less'],
                tasks:['less:development']
            },
            html:{
                files:['src/*.html'],
                tasks: ['replace:dev']
            },
            js: {
                files:['src/scripts/**/*.js'],
                tasks:['uglify:targetDev']
            }
        },
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js':'src/scripts/main.js',
                }
            } 
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    'dist/index.html':'src/index.html',
                }
            }
        },
        replace:{
            dev:{
                options: {
                    patterns:[
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_MAIN_JS',
                            replacement: '../src/scripts/main.js'
                        },                        
                    ]
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src:['src/index.html'],
                        dest:'dev'
                    }
                ]
            },
            dist:{
                options: {
                    patterns:[
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_MAIN_JS',
                            replacement: './scripts/main.min.js'
                        },
                    ]
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src:['src/index.html','index_roulette.html'],
                        dest:'dist'
                    }
                ]
            }
        }
        
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');



    grunt.registerTask('default',['watch'])
    grunt.registerTask('build',['less:production','htmlmin:dist','replace:dist','uglify'])
}