import styled from 'styled-components';

const AccountOnThreadsStyles = styled.div`
    display: grid;
    grid-template-rows: 166px 34px 58px;
    background-color: #fff;
    height: 258px;
    border-radius: 10px;
    margin-top: 20px;
    margin-left: 20px;
    position: sticky;
    top: 0;
    
    & > img {
        border-radius: 50%;
        justify-self: center;
        align-self: center;
    }

    & > div:first-of-type {
        font-size: 1.4rem;
        justify-self: center;
    }

    & .thread__post {
        font-size: 1.1rem;
        justify-self: center;
        border: 1px solid #3b7ab8;
        border-radius: 5px;
        height: 3.8rem;
        width: 15.4rem;
        text-align: center;
        padding: 1rem;
        color: #3b7ab8;
        cursor: pointer;
        margin: auto;
        
        &:hover{
            background-color: #3b7ab8;
            color: #fff;
        }
    }

`

export default AccountOnThreadsStyles