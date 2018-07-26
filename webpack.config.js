var webpack = require('webpack');
var path = require('path'); //Manipulate file path only.

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        'bootstrap-loader',
        './src'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }

            },
            {
                test: /\.html$/,
                use: { loader: 'raw-loader' }
            },
            {
                test: /\.scss$/, 
                use: [
                    { 
                        loader: 'style-loader' 
                    },
                    { 
                        loader: 'css-loader' 
                    },
                    { 
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded'
                        }
                    },
                    { 
                        loader: 'postcss-loader',
                        options: {
                            browsers: 'last 3 versions'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/, 
                use: [
                    { 
                        loader: 'url-loader',
                        options: {
                            limit: '10000'
                        }
                    }
                ]
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//, 
                use: [
                    { 
                        loader: 'imports-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            jQuery: "jquery"
        })
    ],
    devServer: {
        hot:true,
        proxy: {
            '*' : 'http://127.0.0.1:3000'
        }
    }
};

