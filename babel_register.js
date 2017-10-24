const babelConfig = {
    presets: [
        [
            'env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
};

require('babel-register')(babelConfig);
require('./babel_es6_syntax.js');

// Try to run `node babel_es6_syntax.js` which will fail
// But run `node babel_register.js` will success as we have loaded the `babel-register` module before we run the code!