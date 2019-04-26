import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import Error from './ErrorMessage'
import { CREATE_VTUBER } from './GQL'

class CreateVtuber extends Component {
    
    state = {}

    handleChange = (e) => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: val})
    }

    createVtuber = async (e, createVtuber) => {
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
        const response = await createVtuber()
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
            mutation={CREATE_VTUBER}
            variables={{
                name: this.state.name,    // imagePreviewUrlが重すぎてエラーを吐くので、含めないようにわざわざvariablesを指定している
                image: this.state.image,
                channelId: this.state.channelId,
            }}
            // refetchQueries={() => {     // これでキャッシュ内のデータが更新されるのでリロードしなくて済む
            //     return[{
            //         query : THREADS_QUERY,
            //         variables: {
            //             skip: this.props.page * threadPerPage - threadPerPage,
            //             first: threadPerPage 
            //          }
            //     }]
            // }}
        >
            {(createVtuber, { loading, error }) => (

                <form 
                    method="post" 
                    onSubmit={ async e => {
                        e.preventDefault()
                        const res = await this.createVtuber(e, createVtuber)
                    }}
                >
                <Error error={error} /> 

                <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="name">
                        Name
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="name" 
                            required 
                            onChange={this.handleChange} 
                        />
                    </label>
                
                    <label htmlFor="channelId">
                        ChannelId
                        <input 
                            type="text" 
                            id="channelId" 
                            name="channelId" 
                            placeholder="channelId" 
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

                    <button type="submit">申請</button>
                </fieldset>
                </form>
            )}
        </Mutation>
    );
  }
}

export default CreateVtuber