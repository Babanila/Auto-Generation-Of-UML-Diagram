module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    settings: {
        react: {
            pragma: "React",
            version: "detect",
        },
    },
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module",
        ecmaversion: 7,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
            spread: true,
        },
    },
    plugins: ["react", "react-hooks", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:prettier/recommended",
        "prettier/flowtype",
        "prettier/react",
        "prettier/standard",
    ],
    rules: {
        "require-jsdoc": 0,
        "object-curly-spacing": ["error", "always"],
        "padded-blocks": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": 0,
        "no-console": 0,
        "react/no-find-dom-node": 0,
        "no-unused-vars": 0,
        "prettier/prettier": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },
};
