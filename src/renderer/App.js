import React from 'react'
import NoteItem from './comp/NoteItem'
import { getDisplayEntries, useAppModel } from './useAppModel'
import Button from './comp/Button'

function App() {
  const [model, actions] = useAppModel()


  return (
    <div className="sans-serif lh-title measure-wide center">
      <header className="flex items-center">
        <div className="f4 pv2" onClick={actions.onNoteListHeadingClick}>
          Journal Entries
        </div>
        <div className="flex-grow-1" />
        <Button onClick={actions.onAddClicked}>add new</Button>
        <Button onClick={actions.onDeleteAllClicked}>delete all</Button>
      </header>
      <div className="pv2" />
      {getDisplayEntries(model).map(note => (
        <NoteItem key={note._id} note={note} actions={actions} />
      ))}
    </div>
  )
}

export default App

