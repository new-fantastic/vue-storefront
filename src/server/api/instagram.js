const Instagram = require('node-instagram').default

module.exports = (expressApp) => {
  expressApp.get('/api/instagram', async (req, res) => {
    const instagram = new Instagram({
      clientId: '09c1ef14041f4a98be217fb756847487',
      clientSecret: '12aebbcb9f914821a17c62d0f4ec770d',
      accessToken: '7698068771.09c1ef1.18fa5664ea82476b96ea2366ad4170cc'
    })

    try {
      let data = await instagram.get('tags/kubota')
      res.end(data)
    } catch (err) {
      console.log('instagram fetch error', err)
    }
  })
}
