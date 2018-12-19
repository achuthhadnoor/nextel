'use strict'

import Link from 'next/link'
import DragHandle from './../components/sortable/drag-handle'
import Import from './../icons/import'
import Export from './../icons/export'
import Trash from './../icons/delete'
import Copy from './../icons/copy'

const List = ({ children, task, icon, onMove, onDelete ,onCopy }) => {
    const { id, title, snip } = task;
    const description = snip.length >= 30 ? `${snip.substr(0, 35)}...` : snip
    let actionIcon
    switch (icon) {
        case 'drag':
            actionIcon = (<DragHandle />)
            break
        case 'import':
            actionIcon =(<Import />);
            break;
        case 'export':
            actionIcon =(<Export />);
            break;
        case 'trash':
            actionIcon =(<Trash />);
            break;        
        default:
            // code
    }

    return (
          <li className="eachSnip">
            <span className="red"></span>
                <Link href= {`/edit?id=${id}`}>
                    <div className="subEach">
                      <span className="etitle">{title}</span>
                      <span className="edesc">{description}</span>
                    </div>
                </Link>
                <i className="options icon" onClick={() => onDelete(task)}><Trash/></i>
                <i className="options icon"  onClick={() => onCopy(task)}><Copy/></i>
                <i className="icon dragg"><DragHandle/></i>
              <style jsx>{`
              .dragg{
                cursor:move;
              }
              .icon{
                  padding:0px 10px;
              }
              .options{
                  position:relative;
                  transform: translateX(30px);
                  opacity:0;
                 line-height:1em;
                 text-align:center;
                transition: .65s ease-in-out;
              }
              .eachSnip:hover .options{
                  transform:translateX(0px);
                  opacity:1;
              }
              .red{
                    margin: 0px;
                    border-radius: 25px;
                    margin-top:1em;
                    height: 5px;
                    width: 5px;
                    background: red;
              }
               .eachSnip{
                   margin:0;
                 cursor:pointer;
                 user-select:none;
                 display:flex;
                 width:320px;
                 padding:5px 10px;
                 user-select:none;
                 overflow:hidden;
               }
               .subEach{
                 flex:1 0;
                 display:flex;
                 width:320px;
                 overflow:hidden;
                 flex-direction:column;
                 line-height:1em;
                 transition: .65s ease-in-out
               }
               .etitle{
                 font-weight:600;
                 padding:5px;
                 font-size:1.1em
               }
               .edesc{
                 color:#aaa;
                 padding:5px;
                 font-size:1em
               }
              `}</style>
        </li>
    )
}

export default List
