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
                    'dist/styles/roulette.min.css' : 'src/styles/roulette.less',
                }
            }
        },
        watch: {
            less: {
                files:['src/styles/**/*.less'],
                tasks:['less:development']
            },
            replace:{
                files:['src/*.html'],
                tasks: ['replace:dev']
            },
            // uglify: {
            //     files:['src/scripts/**/*.js'],
            //     tasks:['uglify:targetDev']
            // }
        },
        uglify:{
            targetDist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files:{
                    'dist/scripts/main.min.js':'src/scripts/main.js',
                    'dist/scripts/roulette.min.js':'src/scripts/roulette.js',
                }
            },
            // targetDev:{
            //     options:{
            //         removeComments: true,
            //     },
            //     files:{
            //         'dev/scripts/main.js':'src/scripts/main.js',
            //         'dev/scripts/roulette.js':'src/scripts/roulette.js',
            //     }
            // }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files:{
                    'dist/index.html':'src/index.html',
                    'dist/roulette.html':'src/roulette.html',
                    
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
                            match: 'ENDERECO_DO_ROULETTE_JS',
                            replacement: '../src/scripts/roulette.js'
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
                        src:['src/index.html','src/index_roulette.html'],
                        dest:'dev',
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
                        {
                            match: 'ENDERECO_DO_ROULETTE_JS',
                            replacement: './scripts/roulette.min.js'
                        }
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default',['watch'])
    grunt.registerTask('build',['less:production','htmlmin:dist','replace:dist','uglify'])
}