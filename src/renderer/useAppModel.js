import * as R from 'ramda'
import PouchDb from 'pouchdb-browser'
import * as nanoid from 'nanoid'
import faker from 'faker'
import { useEffect, useMemo, useState } from 'react'
import { getCached, setCache } from './cache-helpers'
import { _, it } from 'param.macro'

const db = new PouchDb('journal-entries')

function createNewEntry() {
  return {
    _id: nanoid(),
    content: faker.lorem.paragraph(),
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  }
}

function useLogModelEffect(model) {
  // useEffect(() => {
  //   const allNotes = R.values(model.entryById)
  //   allNotes && console.table(allNotes)
  // }, [model.entryById])
}

function getAllEntries(model) {
  return R.values(model.entryById)
}

export function getDisplayEntries(model) {
  return R.compose(
    R.sortWith([R.descend(R.prop('createdAt'))]),
    R.values,
  )(model.entryById)
}

export function useAppModel() {
  const [model, setModel] = useState(() =>
    R.compose(
      R.mergeDeepRight({
        entryById: {},
        lastErrMsg: null,
      }),
      R.defaultTo({}),
      getCached,
    )('appModel'),
  )

  function wrapWithSetModel(updaters) {
    return R.mapObjIndexed(fn =>
      R.compose(
        setModel,
        fn,
      ),
    )(updaters)
  }

  const actions = useMemo(
    () =>
      wrapWithSetModel({
        setLastErrMsg(err) {
          console.error('setLastErrMsg', err)
          return R.assoc('lastErrMsg')(err.message)
        },
        handleEntryDbChange(change) {
          return model => {
            if (change.deleted) {
              return R.dissocPath(['entryById', change.id])(model)
            } else {
              const doc = change.doc
              return R.assocPath(['entryById', doc._id])(doc)(model)
            }
          }
        },
      }),
    [],
  )

  if (process.env.NODE_ENV !== 'production') {
    window.model = model
  }

  useEffect(() => setCache('appModel', model), [model])

  useLogModelEffect(model)

  useEffect(() => {
    const changes = db
      .changes({ include_docs: true, live: true })
      .on('change', actions.handleEntryDbChange)
      .on('error', actions.setLastErrMsg)
    return () => changes.cancel()
  }, [])

  const effects = useMemo(() => {
    const otherwiseHandlePouchDbError = R.otherwise(actions.setLastErrMsg)

    return {
      onAddClicked: () => {
        const newEntry = createNewEntry()
        R.pipe(
          it.put(newEntry),
          otherwiseHandlePouchDbError,
        )(db)
      },
      onDeleteAllClicked: () =>
        R.pipe(
          it.allDocs({ include_docs: true }),
          R.then(
            R.pipe(
              R.prop('rows'),
              R.pluck('doc'),
              R.map(R.mergeLeft({ _deleted: true })),
              db.bulkDocs(_),
            ),
          ),
          R.then(console.log('bulkDocsResponse', _)),
          otherwiseHandlePouchDbError,
        )(db),
      onEntryListHeadingClicked: () => console.table(getAllEntries(model)),
    }
  }, [])

  return [model, effects]
}
