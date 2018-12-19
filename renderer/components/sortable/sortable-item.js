'use strict'

// Packages
import { SortableElement } from 'react-sortable-hoc'

// Components
import List from './../../ui/list'

const SortableItem = SortableElement(({ task, onMove, onDelete , onCopy }) => {
  return <List task = {task} icon="drag" onDelete = {onDelete } onCopy = {onCopy}/>  
})

//   <Tasks snips={task} onMove={onMove} onDelete={onDelete} />
export default SortableItem