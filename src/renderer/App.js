import React from 'react'
import EntryItem from './comp/EntryItem'
import { getDisplayEntries, useAppModel } from './useAppModel'
import Button from './comp/Button'

function App() {
  const [model, actions] = useAppModel()

  return (
    <div className="sans-serif lh-title measure-wide center">
      <header className="flex items-center">
        <div
          className="f4 pv2"
          onClick={actions.onEntryListHeadingClicked}
        >
          Journal Entries
        </div>
        <div className="flex-grow-1" />
        <Button onClick={actions.onAddClicked}>add new</Button>
        <Button onClick={actions.onDeleteAllClicked}>delete all</Button>
      </header>
      <div className="pv2" />
      {getDisplayEntries(model).map(entry => (
        <EntryItem key={entry._id} entry={entry} actions={actions} />
      ))}
    </div>
  )
}

export default App
