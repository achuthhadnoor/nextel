'use strict'

// Components
import SortableList from './sortable-list'

const SortableComponent = ({ tasks, onSortEnd, onDelete, onMove, onCopy }) => {
  return (
    <SortableList
      tasks={tasks}
      onSortEnd={onSortEnd}
      onDelete={onDelete}
      onCopy={onCopy}
      onMove={onMove}
      useDragHandle={true}
    />
  )
}

export default SortableComponent