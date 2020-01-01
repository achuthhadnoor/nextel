import Icon from 'react-icons-kit'
import { uploadCloud, downloadCloud, trash, send , logOut} from 'react-icons-kit/feather'
const Row = ({ children, title, description, icon, onclick }) => {
  const desc = description >= 30 ? `${description.substr(0, 50)}...` : description
  let actionIcon
  switch (icon) {
    case 'import':
      actionIcon = (<Icon icon={uploadCloud} />);
      break;
    case 'export':
      actionIcon = (<Icon icon={downloadCloud} />);
      break;
    case 'trash':
      actionIcon = (<Icon icon={trash} />);
      break;
    case 'award':
      actionIcon = (<Icon icon={send} />);
      break;
    case 'signOut':
      actionIcon = (<Icon icon={logOut} />);
      break;
    default:
    // code
  }

  return (
    <li className="eachSnip" onClick={onclick}>
      <span className="red"></span>
      <div className="subEach">
        <span className="etitle">{title}</span>
        <span className="edesc">{desc}</span>
      </div>
      {actionIcon}
      <style jsx="true">{`
              .red{
                    margin: 0px;
                    border-radius: 25px;
                    margin-top:1em;
                    height: 5px;
                    width: 5px;
                    background: red;
              }
               .eachSnip{
                 cursor:pointer;
                 user-select:none;
                 display:flex;
                 padding:10px;
                 user-select:none;
               }
               .subEach{
                 flex:1 0;
                 display:flex;
                 flex-direction:column;
                 line-height:1em
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

export default Row