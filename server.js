const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const userData = {}

app.post('/analyze-profile', (req, res) => {
  const { username } = req.body
  const mock = {
    username,
    followers: Math.floor(Math.random() * 10000),
    engagementRate: (Math.random() * 10).toFixed(2),
    category: 'comedy',
    bestTimeToPost: '18:00'
  }
  userData[username] = mock
  res.json(mock)
})

app.get('/trending-hashtags', (req, res) => {
  res.json([
    '#foryou', '#viral', '#funny', '#trend', '#tiktokbrasil', '#music', '#lifehacks'
  ])
})

app.post('/schedule-action', (req, res) => {
  const config = req.body
  res.json({ status: 'scheduled', config })
})

app.get('/report', (req, res) => {
  const { username } = req.query
  const data = userData[username] || {}
  const report = {
    username,
    growth: Math.floor(Math.random() * 500),
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 300),
    shares: Math.floor(Math.random() * 200),
    ...data
  }
  res.json(report)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`TikGrow backend rodando na porta ${PORT}`))