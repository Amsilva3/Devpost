module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', 'react', 'react-native'],
  rules: {
    'prettier/prettier': 'error',
    // allow .js files to contain JSX code
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    // prevent eslint to complain about the "styles" variable being used before it was defined
    'no-use-before-define': ['error', { variables: false }],

    // ignore errors for the react-navigation package
    'react/prop-types': ['error', { ignore: ['navigation', 'navigation.navigate'] }],
  },
};
