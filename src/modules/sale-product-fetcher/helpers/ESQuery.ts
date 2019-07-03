import config from 'config'

export default ({entity = 'product', start = 0, query = {}}) => {
  let baseUrl = config.elasticsearch.host + '/' +
    config.elasticsearch.index +
    '/' + entity + '/_search?from=' + start
    + '&request=' + JSON.stringify({query})

  return baseUrl
}