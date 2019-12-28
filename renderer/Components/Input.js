import styled from "styled-components";
import Icon from "react-icons-kit";
import { search, command } from "react-icons-kit/feather";
const InputWrapper = styled.div`
  display: flex;
  background:${props=>props.theme.secondary};
  color:${props=>props.theme.color};
  margin: 10px;
  border-radius: 5px;
  max-width: 400px;
`;
const IconWrapper = styled.span`
  padding: 10px;
`;
const Input = styled.input`
  border: none;
  padding: 0px 10px;
  outline: none;
  background: transparent;
  color: inherit;
  flex: 1;
  padding:10px;
`;
export default props => {
    if (props.search) {
        return (
            <InputWrapper>
                <IconWrapper>
                    <Icon icon={search} />
                </IconWrapper>
                <Input {...props} />
                <IconWrapper>
                    <Icon icon={command} style={{ cursor: 'pointer' }} onClick={() => props.Commands()} />
                </IconWrapper>
            </InputWrapper>
        )
    }
    else {
        return (
            <InputWrapper>
                <Input {...props} />
            </InputWrapper>
        )
    }
}