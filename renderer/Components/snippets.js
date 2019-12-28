import styled from "styled-components"; 
export default ({snips,tags,selectedSnip,onSelect}) => {  
    return (
  <ListBox>
    {
        snips === []
    ? (
      <>No Snippets Found</>
    ) : (
      snips.map((s, i) => { 
        return (
          <a href = {"/snip/" + s.id} key={s.id}>
            <ListItem
              selected={i === selectedSnip}
              tabIndex={i === selectedSnip ? 0 : 1}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  alert("selected" + i);
                }
              }}
              onClick={() => onSelect(s.id)}
            >
              <div style={{ padding: ".12em" }}>{s.title}</div>
              <TagWrapper>
                {s.tags !== undefined
                  ? s.tags.map((p, it) => <Tag key={it}>{p.id}</Tag>)
                  : null}
              </TagWrapper>
            </ListItem>
          </a>
        );
      })
    )}
  </ListBox>
)};

const ListBox = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  /* width: 300px; */
  flex-direction: column;
`;
const ListItem = styled.li`
  padding: 0.5em;
  max-width: 400px;
  flex: 1;
  background: ${props => (props.selected ? props.theme.primary : "transparent")};
  border-left: ${props =>
    props.selected ? `2px solid ${props=>props.theme.accent}` : "2px solid transparent"};
  outline: none;
  border-bottom: ${ props => `'0.5px solid' ${props.theme.secondary}`} ;
  a {
  /* margin: ${props => (props.selected ? "10px" : "0px")}; */
  transiton:all 1s ease;
    color: #fff;
    text-decoration: none;
  }
  &:hover,
  &:focus {
    background:#0f1113;
    border-left: 2px solid #5D9E6B;
    outline: none;
    /* margin:10px; */
    transiton:all 1s ease;
  }
`;
     //#0f1113;

const TagWrapper = styled.div`
  padding: 0.5em;
`;
const Tag = styled.span`
  padding: 0.32em;
  margin-left: 0.5em;
  background: #15181b;
  color: #fff;
  border-radius: 0.2em;
`;