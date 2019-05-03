import styled from 'styled-components';

const NavStyles = styled.div`
  justify-self: end;
  align-self: center;

  & a:not(:last-child) {
    margin-right: 5rem;
    font-size: .9rem;
    color: #fff;
  }

  & a:hover{
    color: #ffc46a;
  }
`

export default NavStyles;
