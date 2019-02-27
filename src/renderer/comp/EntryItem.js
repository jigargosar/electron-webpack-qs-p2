import * as PropTypes from 'prop-types'
import React from 'react'

function EntryItem({ note, actions }) {
  const onClick = () => {
    console.table(note)
  }
  return (
    <div className="pv2 code" onClick={onClick}>
      {note.content}
    </div>
  )
}

EntryItem.propTypes = {
  note: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
export default EntryItem
