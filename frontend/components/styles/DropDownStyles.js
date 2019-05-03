import styled from 'styled-components';

const DropdownStyles = styled.div`
    border: 1px solid #999;
    width: 200px;
    height: 30px;
    margin-top: 2rem;
    margin-left: 2rem;
    border-radius: 5px;
    z-index: 3;

    & .selected__vtuber{
        height: 28px;
        display: grid;
        grid-template-columns: max-content 1fr 20px;
        align-items: center;
        user-select: none;
        cursor: pointer;

        &  > img:first-of-type{
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin: 3px 10px;
        }

        & > div{
            font-size: .8rem;
            font-weight: 600;
            color: #555;
        }

        & .down__cursor {
            margin-right: 1rem;
        }
    }

    & > ul {
        list-style: none;
        padding: 0;
        margin: 0;
        border: 0;
        background-color: #fff;
        user-select: none;
        cursor: pointer;

        & > li {
            border: 1px solid #ddd;
            border-top: none;
            align-items: center;
            font-size: 1.3rem;
            font-weight: 600;

            &:first-of-type{
                border: 1px solid #ddd;
            }

            &:hover{
                background-color: #c5ddf5;
            }

            & > img{
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin: 3px 10px;
            }
        }
    }

    & .backdrop{
        width: 100vw;
        height: 100vh;
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
    }
`

export default DropdownStyles