module.exports.rules = {
  "no-unused-reactive-styles": function (context) {
    var usedStyles = [];
    return {
      JSXElement(node) {
        const { openingElement } = node;
        openingElement.attributes.forEach((attribute) => {
          try {
            if (attribute.value.expression.object.callee.name === "styles") {
              usedStyles.push(attribute.value.expression.property.name);
            }
          } catch {}
          try {
            attribute.value.expression.elements.forEach((member) => {
              if (member.object.callee.name === "styles") {
                usedStyles.push(member.property.name);
              }
            });
          } catch {}
        });
      },
      VariableDeclarator(node) {
        try {
          if (
            node.id &&
            node.id.name === "styles" &&
            node.init.type === "ArrowFunctionExpression"
          ) {
            const arrowFunction = node.init;
            const callExpression = arrowFunction.body;
            const objectExpression = callExpression.arguments[0];
            objectExpression.properties.forEach((property) => {
              const name = property.key.name;
              var nameInList = false;
              usedStyles.forEach((style) => {
                if (style === name) {
                  nameInList = true;
                }
              });

              if (!nameInList) {
                context.report(node, "unused reactive style named " + name);
              }
            });
          }
        } catch {}
      },
    };
  },
};
