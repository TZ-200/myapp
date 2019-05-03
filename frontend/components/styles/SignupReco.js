import styled from 'styled-components';

const SignupReco = styled.div`
    display: grid;
    width: 188px;
    height: 125px;
    background-color: #fff;
    margin-top: 20px;
    margin-left: 20px;
    border-radius: 10px;
    grid-template-rows: max-content max-content;

    & > div:first-of-type {
        font-weight: 700;
        font-size: 1rem;
        text-align: center;
        align-self: center;
        margin: 18px;
    }

    & > div:last-of-type {
        font-size: 1.1rem;
        justify-self: center;
        background-color: #3b7ab8;
        border-radius: 5px;
        text-align: center;
        padding: 1rem;
        color: #fff;
        cursor: pointer;
        width: 152px;
        height: 38px;
    }
`

export default SignupReco