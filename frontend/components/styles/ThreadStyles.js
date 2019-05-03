import styled from 'styled-components';

const ThreadStyles = styled.div`
    display: grid;
    grid-template-columns: 7px 1fr 264px;
    
    & :hover{
        outline: solid 2px #999;
    }

    & .thread__left {
      width: 7px;
      height: 100%;
      background-color: #3b7ab8;  
    }

    & .thread__content--top{
        display: flex;
        align-items: center;
    }

    & .thread__text {
        font-size: 1.2rem;
        margin: 20px;
        margin-top: 0;
        color: #555;
    }
    
    & .thread__title {
        font-size: 1.6rem;
        font-weight: 700;
        color: #333;
    }

    & .thread__meta {
        font-size: 1.1rem;
        margin-left: 20px;
        margin-bottom: 10px;
        color: #777;
    }

    & .thread__image {
        margin: 10px 20px;
        margin-left: 0;
        border-radius: 5px;
        align-self: center;
    }

    & .thread__content--vtuberImage{
        border-radius: 50%;
        margin: 20px;
        display: inline-block;
    }
`;

export default ThreadStyles;
