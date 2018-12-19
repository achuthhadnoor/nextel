'use strict'

// Packages
import { SortableContainer } from 'react-sortable-hoc'

// Components
import SortableItem from './sortable-item'

const SortableList = SortableContainer(({ tasks, onDelete, onMove, onCopy }) => {
  let taskz = tasks.map((task, index) => {
    return (
      <SortableItem
          key={`item-${index}`}
          index={index}
          task={task}
          onDelete={onDelete}
          onCopy={onCopy}
          onMove={onMove}
        />
    )
  })
  return (
    <ul>
      {taskz}
    </ul>
  )
})

export default SortableList
