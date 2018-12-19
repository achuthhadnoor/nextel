'use strict'

// Components
import EmptyState from './../empty-state'
import SortableComponent from './../sortable/sortable-component'

const List = ({ tasks, onDelete, onMove, onSortEnd }) => {
  const list =
    tasks.length === 0 ? (
      <EmptyState title="Snips" />
    ) : (
      <SortableComponent
        tasks={tasks}
        onDelete={onDelete}
        onMove={onMove}
        onSortEnd={onSortEnd}
      />
    )

  return <div>{list}</div>
}

List.defaultProps = {
  tasks: []
}

export default List




// import Row from './../../ui/row'

// export default () => {
//     return (
//         <ul>
//         {
//             this.props.items.map(function(item) {
//               return <li key={item}>{item}</li>
//             })
//         }
//         </ul>
//     )
// }




// //  <ul>
// //       {
// //         this.props.items.map(function(item) {
// //           return <li key={item}>{item}</li>
// //         })
// //       }
// //       </ul>



// //  import { Component } from 'react'
// //  import Page from './../layouts/page'
// //  import Link from 'next/link'
// //  import { getUser, updateTask } from './../services/local-storage.js'
// //  //  import 'eva-icons/style/eva-icons.css';
// //  var z = false
// //  class Snip extends Component {
// //   constructor() {
// //   super()
// //   this.inputChange = this.inputChange.bind(this)
// //   this.editSnip = this.editSnip.bind(this)
// //   this.state = { title: '', description: '', project: '' }
// //   }

// //   componentDidMount() {
// //   const { url: { query: { id } } } = this.props
// //   const { user } = getUser()
// //   const { title, description, project } = user.tasks.filter(
// //     task => task.id === id
// //   )[0]

// //   if (title) {
// //     return this.setState({ title, description, project })
// //   }
// //   }

// //   inputChange(e) {
// //   const { target } = e;
// //   const { name, value } = target;
// //   this.setState({
// //     [name]: value
// //   })
// //   }
// //   editSnip(e) {
// //   e.preventDefault();
// //   const { url: { query: { id } } } = this.props
// //   const { title, description, project } = this.state
// //   const newTask = { title, description, project }

// //   updateTask({ id, newTask })
// //     .then(() => Router.push('/start'))
// //     .catch(err => console.log(err))
// //   }
// //   render() {
// //   return (
// //     <Page title="New Snip">    

// //       <span htmlFor="title">Title</span>
// //       <input name="title"  type="text" className="title" placeholder="Title"/>
// //       <span htmlFor="title">Snip</span>
// //       <input name="title" type="text" className=" title snippet" placeholder="npm init -y"/>
// //      {z ?  <input name="title" type="text" className=" title snippet" placeholder="npm init -y"/>
// //       : <i>sample</i>}
// //       <button className="btn ">Save</button>
// //       <style jsx>{`
// //           header{
           
// //           }
// //           .back{
// //           color:#fff;
// //           padding:0px 10px;
// //           font-size:2em
// //           }
// //           .btn{
// //               padding:10px;
// //               background:#fff;
// //               color:#222;
// //               margin:20px;
// //               border:none;
// //               outline:none;
// //               box-shadow:0px 0px 1px rgba(226,226,226,.1)
// //           }
// //           .title {
// //             border:none;
// //             width:100%;
// //             outline:none;
// //             background:#111;
// //             color:#eee;
// //             padding:10px 20px;
// //           }
// //           span{
// //               padding:15px;
// //           }
// //           .snippet{
// //             padding:30px 20px;
// //           }
// //         `}</style>
// //     </Page>
// //   )

// //   }

// //  }
 
// //  export default Snip