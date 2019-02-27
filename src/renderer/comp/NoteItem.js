import * as PropTypes from 'prop-types'
import React from 'react'

function NoteItem({ note, actions }) {
  const onClick = () => {
    console.table(note)
  }
  return (
    <div
      className="pv2 code"
      onClick={onClick}
    >
      {note.content}
    </div>
  )
}

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
export default NoteItem
