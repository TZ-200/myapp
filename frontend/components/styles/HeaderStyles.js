import styled from 'styled-components';

const HeaderStyles = styled.div`
     background-color: #3b7ab8;

     & > div {
         width: 1084px;
         margin: auto;
        height: 100%;
         display: grid;
         grid-template-columns: min-content 1fr;
     }
     
     & a {
         font-size: 1.5rem;
         color: white;
         font-weight: 700;
         align-self: center;
         padding-top: .3rem;
     }
`;

export default HeaderStyles;
