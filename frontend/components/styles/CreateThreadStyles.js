import styled from 'styled-components';

const CreateThreadStyles = styled.form`
    width: 1084px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 5px;

    & > fieldset {
        display: grid;
        grid-template-rows: repeat(7, max-content);
        margin: 0;
        padding: 0;
        border: none;

        & > div:first-of-type{
            font-size: 1.5rem;
            margin-top: 20px;
            margin-left: 20px;
        }

        & #title{
            margin-top: 20px;
            margin-left: 20px;
            border-radius: 5px;
            border: 1px solid #999;
            height: 30px;
            width: calc(100% - 40px);
            padding: 10px;
        }

        & #text {
            margin-top: 20px;
            margin-left: 20px;
            border-radius: 5px;
            border: 1px solid #999;
            height: 150px;
            width: calc(100% - 40px);
            resize: none;
            padding: 10px;
            box-shadow: none;
        }

        & .upload {
            margin-left: 20px;
            margin-top: 20px;

            & .uploadButton {
                position: relative;
                width: 100px;
                height: 30px;
                background-color: #7eaad5;
                border-radius: 5px;
                text-align: center;
                padding: 8px;
                font-size: 10px;
                color: #fff;
                cursor: pointer;
    
                & :hover{
                    background-color: #6a9ed0;
                }
        
                & > #file {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 30px;
                    width: 100px;
                    overflow: hidden;
                    opacity: 0;
                    font-size: 0;
                    cursor: pointer;
                }
    

            }
        }

        & #preview{
            height: 300px;
            border-radius: 5px;
            margin-top: 20px;
            cursor: default;
        }

        & > button{
            background-color: #7eaad5;
            border: none;
            color: #fff;
            width: 100px;
            height: 30px;
            border-radius: 5px;
            margin: 20px;
            font-size: 10px;
            cursor: pointer;

            & :hover{
                background-color: #6a9ed0;
            }
        }
    }
`

export default CreateThreadStyles