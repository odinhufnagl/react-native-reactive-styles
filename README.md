# react-native-reactive-styles
Eslint rule for react native reactive styles in typescript


pluginname: react-native-reactive-styles
rulename: no-unused-reactive-styles

used for styles structured as 
const styles = () => {
StyleSheet.create({property1: {}, property2: {}})
}

props structured as prop={styles().property1}

Notice: You must run npm install on the folder to get it to work in your project

Not that wellmade so it will not detect certain cases, so all cases should be looked upon so you do not remove a style when it is in fact used.
