import * as PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

function EntryItem({ entry, actions }) {
  const onClick = () => {
    console.table(entry)
  }
  const [displayTimeAgo, setDisplayTimeAgo] = useState(() =>
    dayjs(entry.createdAt).fromNow(),
  )

  useEffect(() => {
    const clearId = setInterval(() => {
      setDisplayTimeAgo(dayjs(entry.createdAt).fromNow())
    }, 1000)
    return () => clearInterval(clearId)
  }, [entry.createdAt])

  return (
    <div className="pv2 code" onClick={onClick}>
      <div>{entry.content}</div>
      <div title={dayjs(entry.createdAt).format()}>{displayTimeAgo}</div>
    </div>
  )
}

EntryItem.propTypes = {
  entry: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
export default EntryItem
