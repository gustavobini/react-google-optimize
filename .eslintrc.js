module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true
  },
  plugins: ['prettier'],
  extends: ['react-app', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': [2]
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
        extensions: ['.js', '.jsx']
      }
    }
  }
};
