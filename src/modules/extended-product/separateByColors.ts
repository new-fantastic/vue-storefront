export const divideProduct = (
  product,
  generator = null,
  limit: number = Infinity,
  spread: number = -1
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
  const colorsObject = product.configurable_options.find(
    v => v.attribute_code === "color"
  );

  if (!colorsObject) {
    // No colors fallback
    return {
      ...product,
      photo_plan: generator ? generator.next().value : 1
    };
  }

  // const colors = colorsObject.values.map(v => v.label);
  const products = {};
  for (let curr of product.configurable_children) {
    const parts = curr.name.split(" / ");
    parts.pop();
    const name = parts.join(" / ");

    if (
      !products.hasOwnProperty(name) &&
      Object.keys(products).length < limit
    ) {
      const baseProduct = {
        ...product,
        ...curr,
        configurable_children: [curr],
        configurable_options: [],
        photo_plan: generator ? generator.next().value : 1,
        name
      };
      products[name] = baseProduct;
    } else if (products.hasOwnProperty(name)) {
      products[name].configurable_children.push(curr);
    }
  }
  // return Object.values(products)

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
