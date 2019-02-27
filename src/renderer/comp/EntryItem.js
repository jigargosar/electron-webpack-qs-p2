import * as PropTypes from 'prop-types'
import React from 'react'

function EntryItem({ entry, actions }) {
  const onClick = () => {
    console.table(entry)
  }
  return (
    <div className="pv2 code" onClick={onClick}>
      {entry.content}
    </div>
  )
}

EntryItem.propTypes = {
  entry: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
export default EntryItem
