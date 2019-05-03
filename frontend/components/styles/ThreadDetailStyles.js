import styled from 'styled-components';

const ThreadDetailStyles = styled.div`
    display: grid;
    grid-template-rows: 40px min-content;
    width: 1084px;

    /* VtuberHeader */
    & > div:first-of-type{ 
        display: grid;
        grid-template-columns: repeat(3, max-content) 1fr;
        align-items: center;
        height: 40px;

        & > * {
            position: relative;
            z-index: 2;
        }

        & > div:first-of-type {
            position: absolute;
            height: 40px;
            width: 100vw;
            z-index: 1;
            background-color: #fff;
            top: 30px;
        }

        & img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 2rem;

        }

        & a {
            justify-self: end;
            align-self: center;
            height: 30px;
        }

        & svg {
            height: 30px;
            width: 30px;
            fill: #a0c4ff;
            cursor: pointer;
            justify-self: end;

            & :hover{
                fill: #3b7ab8;
            }
        }

        & .thread__vtuberHead--name{
            font-size: 1.3rem;
            font-weight: 700;
            margin-right: 2rem;
            color: #333
        }
    }

    /* Thread MainContents Area */
    & > div:last-of-type{
        display: grid;
        grid-template-columns: 1fr 208px;
        width: 1084px;
    
        /* Thread Detail Area */
        & > div:first-of-type {
            display: grid;
            grid-template-rows: repeat(6, max-content);
            background-color: #fff;
            border-radius: 5px;
            margin-top: 2rem;

            & .thread__detail--title{
                font-size: 1.6rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-left: 2rem;
            }

            & .thread__detail--meta{
                margin-top: 2rem;
                margin-left: 2rem;
            }

            & .thread__detail--image{
                border-radius: 5px;
                margin-top: 2rem;
                margin-left: 2rem;
            }

            & .thread__detail--text{
                margin: 2rem;
                font-size: 1.3rem;
                line-height: 1.8;
                color: #555;
            }

            & .thread__detail--comments{
                margin: 2rem;
                border-top: 1.3px solid #bbb;
                padding-top: 2rem;
            }
        }
    }
`

export default ThreadDetailStyles