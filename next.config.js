/** @type {import('next').NextConfig} */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Copy the proto files to the server build directory
            config.plugins.push(
                new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.join(
                            __dirname,
                            'node_modules/@zilliz/milvus2-sdk-node/dist'
                        ),
                        to: path.join(__dirname, '.next'),
                    },
                    // {
                    //     from: path.join(
                    //         __dirname,
                    //         'node_modules/@zilliz/milvus2-sdk-node/dist'
                    //     ),
                    //     to: path.join(__dirname, 'static/milvus2-sdk-node'),
                    // }
                ],
                })
            );
        }
        config.resolve.alias.canvas = false;    // For react-pdf
        // Important: return the modified config
        return config;
    },
}

module.exports = nextConfig