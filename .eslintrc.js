module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["plugin:react/recommended", "airbnb", "prettier"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	globals: {
		NodeJS: "readonly",
		chrome: "readonly",
		browser: "readonly",
		location: "readonly",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"react/react-in-jsx-scope": "off",
		indent: ["error", "tab"],
		"no-restricted-syntax": "off",
		"import/prefer-default-export": "off",
		"react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
		"import/no-unresolved": "off",
		"import/extensions": "off",
		"no-console": "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "error",
	},
};
