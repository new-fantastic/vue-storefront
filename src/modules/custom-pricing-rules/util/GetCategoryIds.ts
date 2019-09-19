const consumeCondition = (condition: any): Array<number> => {
  const categories: Array<number> = [];
  if (condition.attribute_name === 'category_ids' && condition.value) {
    categories.push(+condition.value);
  }
  if (condition.conditions) {
    for (let con of condition.conditions) {
      const answer = consumeCondition(con);
      if (answer && answer.length) {
        categories.push(...answer);
      }
    }
  }

  return categories;
};

export default (rule: any): Array<number> => {
  if (!rule || !rule.action_condition) {
    return null;
  }
  const categories: Array<number> = [];
  for (let condition of rule.action_condition.conditions) {
    const answer = consumeCondition(condition);
    if (answer && answer.length) {
      categories.push(...answer);
    }
  }

  return categories;
};
