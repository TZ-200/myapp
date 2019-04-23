import React, { Component } from 'react';
import User from './User'
import { Mutation } from 'react-apollo'
import Link from 'next/link'
import { UPDATE_USER_MUTATION, CURRENT_USER_QUERY } from './GQL'


// 入力しないとstateが追加されない⇒何も入力してない場合は何も変更しないということでupdate処理をしている
class UpdateAccount extends Component {

    state = {}
    
    handleChange = (e) => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: val})
    }

    updateUser = async (e, updateUserMutation) => {
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
        await updateUserMutation()
    }

    // uploadFile = async e => {
    //     const files = e.target.files
    //     const data = new FormData()     // Javascriptの標準api（データを扱うための）
    //     data.append('file', files[0])
    //     data.append('upload_preset', 'tz_CRUD')

    //     const res = await fetch('https://api.cloudinary.com/v1_1/decov9fyl/image/upload', {
    //         method: 'POST',
    //         body: data
    //     })
    //     const file = await res.json()
    //     this.setState({
    //         image: file.secure_url,
    //     })
    // }

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
            <User>
                {({data: { me }}) => (
                    <React.Fragment>
                        { me && (
                            <React.Fragment>
                                <Link 
                                    href={{
                                        pathname: '/account'
                                    }}
                                >
                                    <a>Back</a>
                                </Link>
                            
                                <Mutation 
                                    mutation={UPDATE_USER_MUTATION}
                                    variables={{
                                        name: this.state.name,
                                        description: this.state.description,
                                        image: this.state.image,
                                        id: me.id
                                    }}
                                    refetchQueries={() => {
                                        return[{
                                            query: CURRENT_USER_QUERY
                                        }]
                                    }}
                                >
                                
                                    {(updateUser, { loading, error }) => (

                                        <form 
                                            onSubmit={e => this.updateUser(e, updateUser)}
                                        >
                                            <fieldset disabled={loading} aria-busy={loading}>
                    
                                                <label htmlFor="name">
                                                    Name
                                                    <input 
                                                        type="text" 
                                                        id="name" 
                                                        name="name" 
                                                        placeholder="name" 
                                                        required 
                                                        defaultValue={me.name}
                                                        onChange={this.handleChange} 
                                                    />
                                                </label>
                                            
                                                <label htmlFor="description">
                                                    Description
                                                    <input 
                                                        type="text" 
                                                        id="description" 
                                                        name="description" 
                                                        placeholder="description" 
                                                        defaultValue={me.description}
                                                        onChange={this.handleChange} 
                                                    />
                                                </label>
                                                <br/>
                                                
                                                <label htmlFor="file">
                                                    Image（jpgとして保存されます）
                                                    <br/>
                                                    <input 
                                                        type="file" 
                                                        id="file" 
                                                        name="file" 
                                                        placeholder="Upload an image" 
                                                        onChange={this.uploadFile} 
                                                    />
                                                    {this.state.imagePreviewUrl
                                                        ? <img width="200" height="200" id="preview" style={{objectFit:'cover'}} src={this.state.imagePreviewUrl} alt="Upload Preview"/>
                                                        : <img width="200" height="200" style={{objectFit:'cover'}} src={me.image} alt="Account Image"/>
                                                    }
                                                </label>
                                                    
                                                <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                    
                                            </fieldset>
                    
                                        </form>
                                    )}
                                </Mutation>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
            </User> 
        );
    }
}

export default UpdateAccount;