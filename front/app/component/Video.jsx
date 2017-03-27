import React from 'react'
import Radium from 'radium'

const styles = {
  wrapper: {
    border: '1px solid #b3b3b3',
    borderRadius: '5px',
    padding: '10px 20px',
    marginBottom: '10px',
    fontFamily: 'sans-serif',
    color: 'floralwhite'
  },
  title: {
    color: 'floralwhite'
  }
};

const VideoComponent = function({ video }) {
  return (
    <div style={styles.wrapper}>
      <span style={styles.title}>{video.title}</span>
    </div>
  )
}

VideoComponent.propTypes = {
  video: React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.string,
  }),
}

export default new Radium(VideoComponent)
