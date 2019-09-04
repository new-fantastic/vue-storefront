export const divideProduct = (
  product,
  generator = null,
  limit: number = Infinity,
  spread: number = -1,
  leaveConfigurableChildren: Boolean = false
) => {
  if (!product) {
    throw new Error('ProductColorTiles not received "product" props');
  }

  if (!product.hasOwnProperty("configurable_options")) {
    // No colors fallback
    return {
      ...product,
      photo_plan: generator ? generator.next().value : 1
    };
  }
  const colorObj = product.configurable_options.find(
    v => v.attribute_code === "color"
  );

  if (!colorObj || !colorObj.values) {
    // No colors fallback
    return {
      ...product,
      photo_plan: generator ? generator.next().value : 1
    };
  }

  const color_options = colorObj.values;

  const products = {};
  for (let curr of product.configurable_children) {
    if (!products.hasOwnProperty(curr.color)) {
      const colorObj = color_options.find(v => v.value_index === curr.color);
      if (colorObj === -1 || colorObj === undefined) {
        throw new Error(
          'Badly configured product "' +
            curr.name +
            "\", Product's color: " +
            curr.color +
            " !== Each color option in parent"
        );
      }

      const baseProduct = {
        ...product,
        ...curr,
        name: `${product.name.trim()} / ${colorObj.label}`,
        baseName: product.name.trim(),
        photo_plan: generator ? generator.next().value : 1
      };
      if (!leaveConfigurableChildren) {
        baseProduct.configurable_children = [curr];
      }
      products[curr.color] = baseProduct;
    } else if (!leaveConfigurableChildren) {
      products[curr.color].configurable_children.push(curr);
    }
  }

  if (spread === -1) {
    return Object.values(products);
  } else {
    return Object.values(products).slice(spread * -1);
  }
};

export const count = product => {
  if (!product) {
    throw new Error('ProductColorTiles not received "product" props');
  }

  if (!product.hasOwnProperty("configurable_options")) {
    // No colors fallback
    return 1;
  }
  const colorsObject = product.configurable_options.find(
    v => v.attribute_code === "color"
  );

  if (!colorsObject) {
    // No colors fallback
    return 1;
  }

  // const colors = colorsObject.values.map(v => v.label);

  const products = product.configurable_children.reduce((total, curr) => {
    const parts = curr.name.split("/");
    parts.pop();
    const name = parts.join("/");

    if (!total.hasOwnProperty(name)) {
      total[name] = 1;
    }

    return total;
  }, {});

  return Object.keys(products).length;
};
