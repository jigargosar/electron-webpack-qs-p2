import * as PropTypes from 'prop-types'
import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

function EntryItem({ entry, actions }) {
  const onClick = () => {
    console.table(entry)
  }
  return (
    <div className="pv2 code" onClick={onClick}>
      <div>{entry.content}</div>
      <div>{dayjs(entry.createdAt).format()}</div>
      <div>{dayjs(entry.createdAt).fromNow()}</div>
    </div>
  )
}

EntryItem.propTypes = {
  entry: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
export default EntryItem
