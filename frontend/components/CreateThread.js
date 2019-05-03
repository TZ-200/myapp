import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import Error from './ErrorMessage'
import Router from 'next/router'
import { CREATE_THREAD, THREADS_QUERY, SINGLE_VTUBER_QUERY } from './GQL'
import { threadPerPage } from '../config';
import CreateThreadStyles from './styles/CreateThreadStyles'
import User from './User'
import DropdownStyles from './styles/DropDownStyles'
import uniqid from 'uniqid'

class CreateThread extends Component {
    
    state = { disp: false }

    handleChange = (e) => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: val})
    }

    createThread = async (e, createThread) => {
        e.preventDefault()
        // Upload an Image to cloudinary
        const data = new FormData()
        data.append('file', this.state.file)
        data.append('upload_preset', 'tz_CRUD')
        const res = await fetch('https://api.cloudinary.com/v1_1/decov9fyl/image/upload', {
            method: 'POST',
            body: data
        })
        const file = await res.json()
        await this.setState({
            image: file.secure_url,
        })
        const response = await createThread()
        return response
    }

    uploadFile = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {      // これは読み込み完了時のイベント
            this.setState({
              file: file,
              imagePreviewUrl: reader.result    
            });
        }
        if(file){
            reader.readAsDataURL(file)      // 読み込みを実行      
        } else {
            this.setState({
                file: undefined,
                imagePreviewUrl: undefined   
              });
        }
    }

    selectVtuber = (e) => {
        const a = document.querySelector('.selected__vtuber')
        a.querySelector('img').src = e.target.querySelector('img').src
        a.querySelector('div').innerHTML = e.target.querySelector('div').innerHTML

        this.setState({ 
            disp: false,
            vtuber: e.target.dataset.value
        })
    }

  render() {
      
    return (
        <Mutation 
            mutation={CREATE_THREAD}
            variables={{
                title: this.state.title,    // imagePreviewUrlが重すぎてエラーを吐くので、含めないようにわざわざvariablesを指定している
                text: this.state.text,
                image: this.state.image,
                vtuber: this.state.vtuber
            }}
            refetchQueries={() => {     // これでキャッシュ内のデータが更新されるのでリロードしなくて済む
                return[{
                    query : SINGLE_VTUBER_QUERY,
                    variables: {
                        id: this.props.id
                     }
                }]
            }}
        >
            {(createThread, { loading, error }) => (

                <CreateThreadStyles 
                    method="post" 
                    onSubmit={ async e => {
                        e.preventDefault()
                        const res = await this.createThread(e, createThread)
                        Router.push({
                            pathname: '/thread',
                            query: { id: res.data.createThread.id }
                        })
                    }}
                >
                <Error error={error} /> 

                <User>
                {({data: { me }}) => {

                    return(

                        <fieldset disabled={loading} aria-busy={loading}>    
                        
                        <div>スレッドを投稿する</div>

                        <DropdownStyles>
  
                            <div 
                                className="selected__vtuber"
                                onClick={() => this.setState({disp: !this.state.disp})}    
                            >
                                { this.props.vtuberName 
                                    ?   
                                        <React.Fragment>
                                        <img src={this.props.vtuberImage}/>
                                        <div>{this.props.vtuberName}</div>
                                        </React.Fragment>
                                    :   
                                        <React.Fragment>
                                        <img src="https://res.cloudinary.com/decov9fyl/image/upload/v1556081219/tz_CRUD/fff.jpg"/>
                                        <div style={{fontSize: '.8rem', color: '#555'}}>Vtuberを選択してください</div>
                                        </React.Fragment>
                                }
                                <img className="down__cursor" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" width="10" height="10" className="down" />
                            </div>
                            
                            <ul>
                                { me.follows.map( follow => {
                                    return(
                                        <li 
                                            className="input-option" 
                                            data-value={follow.id} 
                                            style={{
                                                display: this.state.disp ? 'flex' : 'none'
                                            }}
                                            onClick={(e)=> this.selectVtuber(e)}
                                            key={uniqid()}
                                        >
                                            <img src={follow.image}/>
                                            <div>{follow.name}</div>
                                        </li>
                                    )
                                }) }
                            </ul>
                            { this.state.disp && 
                                <div 
                                    className="backdrop"
                                    onClick={() => this.setState({ disp: false }) }   
                                ></div>}
                      </DropdownStyles>
                        

                        <label htmlFor="title">
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                placeholder="タイトル" 
                                required 
                                onChange={this.handleChange} 
                            />
                        </label>
                    
                        <label htmlFor="text">
                            <textarea
                                id="text" 
                                name="text" 
                                placeholder="本文" 
                                required 
                                onChange={this.handleChange} 
                            />
                        </label>
    
                        <div className="upload">
                            <div className="uploadButton">
                                画像
                                <input 
                                    type="file" 
                                    id="file" 
                                    name="file" 
                                    placeholder="Upload an image" 
                                    onChange={this.uploadFile} 
                                />
                            </div>
                            {this.state.imagePreviewUrl && <img id="preview" style={{objectFit:'cover'}} src={this.state.imagePreviewUrl} alt="Upload Preview"/> }

                        </div>
    
                        <button type="submit">投稿</button>
                    </fieldset>
                    )
                }}
                </User>
                </CreateThreadStyles>
            )}
        </Mutation>
    );
  }
}

export default CreateThread