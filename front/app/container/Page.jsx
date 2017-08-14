import _ from 'lodash'
import update from 'react-addons-update'
import Radium from 'radium'
import React from 'react'

import Video from '../component/Video.jsx'

const styles = {
  wrapper: {
    margin: '0 auto',
    width: '60%'
  },
}

const isBrowser = typeof window !== 'undefined'
let apiUrl = `http://localhost:5002/graphql/`

if (isBrowser && window.location.hostname == 'gql-front.stan.life') {
  apiUrl = `https://gql-api.stan.life/graphql/`
}

class Page extends React.Component {
  constructor () {
    super()
    this.state = { loaded: false, error: false, talk: null }
  }

  componentDidMount() {
    console.log('Fetch videos from GraphQL API')
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
        {
          videos {
            id
            title
          }
        }
        `,
        variables: null,
        operationName: null
      })
    })
    .then(res => {
      if (!res.ok) {
        throw "An error occured"
      }
      return res.json()
    })
    .then((payload) => {
      this.setState(update(this.state, {
        loaded: { $set: true },
        videos: { $set: payload.data.videos },
      }))
    })
    .catch((err) => {
      this.setState(update(this.state, {
        loaded: { $set: false },
        error: { $set: true },
        videos: { $set: null },
      }))
    })
  }

  render () {
    if (!this.state.loaded) {
      return <div>{'loading ...'}</div>
    }

    if (!_.isArray(this.state.videos) || this.state.videos.length == 0) {
      return <div>{'There is no video'}</div>
    }

    return (
      <div style={styles.wrapper}>
      {this.state.videos.map(v => <Video video={v} />)}
      </div>
    )
  }
}

export default new Radium(Page)
