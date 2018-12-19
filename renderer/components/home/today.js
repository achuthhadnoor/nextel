'use strict'
// Components
import EmptyState from './../empty-state'
import SortableComponent from './../sortable/sortable-component'

const Snips = ({ tasks, onDelete, onMove, onSortEnd ,onCopy}) => {
  const list =
    tasks.length === 0 ? (
      <EmptyState title="Snips" />
    ) : (
      <SortableComponent
        tasks={tasks}
        onDelete={onDelete}
        onCopy={onCopy}
        onMove={onMove}
        onSortEnd={onSortEnd}
      />
    )
  return <div>{list}</div>
}

Snips.defaultProps = {
  tasks: []
}

export default Snips