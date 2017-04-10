module.exports = {
  paths: {
    public: './dist',
    watched: ['src']
  },

  files : {
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(?!src)/,
        'js/app.js': /^src/
      }
    },
    stylesheets: {
      joinTo: 'css/styles.css'
    },
  },

  plugins : {
    sass : {
      options: {
       includePaths: ['node_modules']
     }
    },
    postcss: {
      processors: [
        require('autoprefixer')(['last 3 versions']),
      ]
    },
    uglify: {
      mangle: false,
      compress: {
        global_defs: {
          DEBUG: false
        }
      }
    },
    babel: {presets: ['latest']}
  },

  overrides: {
    production: {
      sourceMaps: true,
      plugins: {autoReload: {enabled: false}}
    }
  },

  modules : {
    autoRequire: {
      'js/app.js': ['js/app']
    },
    nameCleaner: path => path.replace(/^src\//, '')
  }
};
