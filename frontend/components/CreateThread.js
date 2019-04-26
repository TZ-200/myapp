import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import Error from './ErrorMessage'
import Router from 'next/router'
import { CREATE_THREAD, THREADS_QUERY, SINGLE_VTUBER_QUERY } from './GQL'
import { threadPerPage } from '../config';

class CreateThread extends Component {
    
    state = {}

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
        reader.readAsDataURL(file)      // 読み込みを実行      
    }

  render() {
    return (
        <Mutation 
            mutation={CREATE_THREAD}
            variables={{
                title: this.state.title,    // imagePreviewUrlが重すぎてエラーを吐くので、含めないようにわざわざvariablesを指定している
                text: this.state.text,
                image: this.state.image,
                vtuber: this.props.id
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

                <form 
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

                <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                        Title
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            placeholder="Title" 
                            required 
                            onChange={this.handleChange} 
                        />
                    </label>
                
                    <label htmlFor="text">
                        Text
                        <input 
                            type="text" 
                            id="text" 
                            name="text" 
                            placeholder="text" 
                            required 
                            onChange={this.handleChange} 
                        />
                    </label>

                    <label htmlFor="file">
                        <input 
                            type="file" 
                            id="file" 
                            name="file" 
                            placeholder="Upload an image" 
                            onChange={this.uploadFile} 
                        />
                        {this.state.imagePreviewUrl && <img width="200" height="200" id="preview" style={{objectFit:'cover'}} src={this.state.imagePreviewUrl} alt="Upload Preview"/> }
                    </label>

                    <button type="submit">投稿</button>
                </fieldset>
                </form>
            )}
        </Mutation>
    );
  }
}

export default CreateThread