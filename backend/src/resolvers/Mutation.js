const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils')
const stripe = require('../stripe')
const cloudinary = require('cloudinary')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const Mutations = {
    // async createItem(parent,args, ctx, info){
    //     if(!ctx.request.userId){
    //         throw new Error('You must be logged in to do that!')
    //     }

    //     // User relationに注目！
    //     const item = await ctx.db.mutation.createItem({
    //         data:{
    //             user: {
    //                 connect: {
    //                     id: ctx.request.userId
    //                 }
    //             },
    //             ...args
    //         }
    //     }, info)

    //     return item
    // },

    // updateItem(parent, args, ctx, info) {
    //     // first take a copy of the updates
    //     const updates = { ...args }
    //     //remove the ID from the updates (idはupdateしたくないので)
    //     delete updates.id
    //     // run the update method
    //     return ctx.db.mutation.updateItem({
    //         data: updates,
    //         where: {
    //             id: args.id
    //         }
    //     }, info)
    // },

    async updateUser(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = { ...args }
        //remove the ID from the updates (idはupdateしたくないので)
        delete updates.id        

        // // An image is already uploaded on Cloudinary
        // // Delete a previous image
        // if(updates.image){
        //     // get a current image
        //     const user = await ctx.db.query.user({
        //         where: {
        //             id: ctx.request.userId
        //         }
        //     }, `{id image}`)
        //     const currentImage = user.image

        //     // delete an image from cloudinary
        //     if(currentImage){
        //         const public_id = currentImage.split('/')[currentImage.split('/').length - 1][0]
        //         cloudinary.v2.uploader.destroy('jk0jcce2mr8emh82s4pf');
        //     }
        // }

        // run the update method
        return ctx.db.mutation.updateUser({
            data: updates,
            where: {
                id: ctx.request.userId
            }
        }, info)
    },

    async createFollow(parent, args, ctx, info) {
        if(!ctx.request.userId){
            throw new Error('You must be logged in to do that!')
        }
        return ctx.db.mutation.updateUser({
            data: {
                follows: {
                    connect: {
                        id: args.vtuber
                    }
                }
            },
            where: {
                id: ctx.request.userId
            }
        }, info)
    },

    async deleteFollow(parent, args, ctx, info) {
        if(!ctx.request.userId){
            throw new Error('You must be logged in to do that!')
        }
        return ctx.db.mutation.updateUser({
            data: {
                follows: {
                    disconnect: {
                        id: args.vtuber
                    }
                }
            },
            where: {
                id: ctx.request.userId
            }
        }, info)
    },

    async signup(parent, args, ctx, info) {
        // emailは全部小文字にした方が色々と都合がいいらしい
        args.email = args.email.toLowerCase()
        // hash their password
        const password = await bcrypt.hash(args.password, 10)
        // create the user in the database
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                image:"https://res.cloudinary.com/decov9fyl/image/upload/v1555831568/tz_CRUD/khrjk4qi5lexm8bpajp2.jpg",
                permission: "USER",
            }
        }, info)
        // // create jwt token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
        // // set the jwt as acookie on the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,  // 1 year cookie
        })
        // return the user to the browser
        return user;
    },

    async createThread(parent, args, ctx, info) {
        if(!ctx.request.userId){
            throw new Error('You must be logged in to do that!')
        }

        const thread = await ctx.db.mutation.createThread({
            data:{
                author: {
                    connect: {
                        id: ctx.request.userId
                    }
                },
                vtuber: {
                    connect: {
                        id: args.vtuber
                    }
                },
                title: args.title,
                text: args.text,
                image: args.image
            }
        }, info)
        return thread
    },

    async createVtuber(parent, args, ctx, info) {
        if(!ctx.request.userId){
            throw new Error('You must be logged in to do that!')
        }
        
        const vtuber = await ctx.db.mutation.createVtuber({
            data:{
                ...args,
            }
        }, info)
        return vtuber
    },

    async updateThread(parent, args, ctx, info) {
        const where = { id: args.id }
        // find the thread
        const thread = await ctx.db.query.thread({where}, `{id author { id }}`)
        // check if they own that thread, on have the permission
        const ownsThread = thread.author.id === ctx.request.userId
        const hasPermission = ctx.request.user.permission === 'ADMIN'
        if(!ownsThread && !hasPermission) {
            throw new Error("You don't have permission to do that!")
        }

        // first take a copy of the updates
        const updates = { ...args }
        //remove the ID from the updates (idはupdateしたくないので)
        delete updates.id
        // run the update method
        return ctx.db.mutation.updateThread({
            data: updates,
            where: {
                id: args.id
            }
        }, info)
    },

    async deleteThread(parent, args, ctx, info) {       
        const where = { id: args.id }
        // find the thread
        const thread = await ctx.db.query.thread({where}, `{id author { id }}`)
        // check if they own that thread, on have the permission
        const ownsThread = thread.author.id === ctx.request.userId
        const hasPermission = ctx.request.user.permission === 'ADMIN'
        if(!ownsThread && !hasPermission) {
            throw new Error("You don't have permission to do that!")
        }
        // delete it
        return ctx.db.mutation.deleteThread({ where }, info)
    },

    async createComment(parent, args, ctx, info) {
        if(!ctx.request.userId){
            throw new Error('You must be logged in to do that!')
        }

        let data = {
            author: {
                connect: {
                    id: ctx.request.userId
                }
            },
            thread: {
                connect: {
                    id: args.thread
                }
            },
            text: args.text,
            depth: 0
        }

        if(args.reply){
            const parentComment = await ctx.db.query.comment({ where: {id: args.reply}})
            data = { ...data, reply:{connect:{id: args.reply}}, depth: parentComment.depth + 1}
        }

        const comment = await ctx.db.mutation.createComment({ data }, info)
        const thread = await ctx.db.query.thread({ where: {id: args.thread}})
        await ctx.db.mutation.updateThread({
            data: {
                title: thread.title,
                text: thread.text
            },
            where: {
                id: args.thread
            }
        }, info)
        return comment
    },

    async deleteComment(parent, args, ctx, info) {
        const where = { id: args.id }
        // find the comment
        const comment = await ctx.db.query.comment({where}, `{id author { id }}`)
        // check if they own that comment, on have the permission
        const ownsComment = comment.author.id === ctx.request.userId
        const hasPermission = ctx.request.user.permission === 'ADMIN'
        if(!ownsComment && !hasPermission) {
            throw new Error("You don't have permission to do that!")
        }
        // delete it
        return ctx.db.mutation.deleteComment({ where }, info)
    },


    async signin( parent, { email, password }, ctx, info) {
        // check if there is a user with that email
        const user = await ctx.db.query.user({ where: { email }})
        if(!user) throw new Error(`No such User found for email ${email}`)
        // check if their password is correct
        const valid = await bcrypt.compare(password, user.password)
        if(!valid) throw new Error('Invalid Password!')
        // generate the jwt token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
        // set the cookie with token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,  // 1 year cookie
        })
        // return the user
        return user
    },

    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token')
        return { message: 'Goodbye!'}
    },

    async checkThreadPermission(parent, args, ctx, info){
        // find the thread
        const where = { id: args.id }
        const thread = await ctx.db.query.thread({where}, `{id author { id }}`)
        // check if they own that thread, on have the permission
        const ownsThread = thread.author.id === ctx.request.userId
        const hasPermission = ctx.request.user.permission === 'ADMIN'
        if(!ownsThread && !hasPermission) {
            throw new Error("You don't have permission to do that!")
        }
        return { message: 'OK, you have permisssssssioooooon!'}
    },

    async createUpvote(parent, args, ctx, info) {
        if(!ctx.request.userId){
            throw new Error('You must be logged in to do that!')
        }
        const upvote = await ctx.db.mutation.createUpvote({
            data:{
                author: {
                    connect: {
                        id: ctx.request.userId
                    }
                },
                Comment: {
                    connect: {
                        id: args.commentId
                    }
                },
            }
        }, info)
        return upvote

        // const where = { id: args.commentId }
        // const comment = await ctx.db.query.comment({where}, `{ id upvotes{id} thread{id} }`)
        // return comment
    },



    async deleteUpvote(parent, args, ctx, info) {
        const where = { id: args.id }
        // find the comment
        // const upvote = await ctx.db.query.upvote({where}, `{id author { id }}`)
        // // check if they own that comment, on have the permission
        // const ownsComment = comment.author.id === ctx.request.userId
        // const hasPermission = ctx.request.user.permission === 'ADMIN'
        // if(!ownsComment && !hasPermission) {
        //     throw new Error("You don't have permission to do that!")
        // }
        // delete it
        return ctx.db.mutation.deleteUpvote({ where }, info)
    },

    // async requestReset(parent, args, ctx, info) {
    //     // Check if this is a real user
    //     const user = await ctx.db.query.user({
    //         where: {
    //             email: args.email
    //         }
    //     })
    //     if(!user) throw new Error(`No such User found for email ${email}`)
    //     // Set a reset token and sxpriry on that user
    //     const resetToken = (await promisify(randomBytes)(20)).toString('hex')
    //     const resetTokenExpiry = Date.now() + 3600000  // 1hour from now
    //     const res = await ctx.db.mutation.updateUser({
    //         where: { email: args.email },
    //         data: { resetToken, resetTokenExpiry }
    //     })
    //     // Email them that reset token
    //     const mailRes = await transport.sendMail({
    //         from: 'hugo@example.com',
    //         to: user.email,
    //         subject: 'Your Password Reset Token',
    //         html: makeANiceEmail(`Your Password Reset Token is here! \n\n <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`)
    //     })

    //     // Return the message
    //     return { message: 'Good!'}
    // },

    // async resetPassword(parent, args, ctx, info) {
    //     // Check if the password match
    //     if(args.password !== args.confirmPassword) {
    //         throw new Error(`Password do not match!`)
    //     }
    //     // Check if it is a legit resetToken
    //     // Check if it is expired
    //     const [user] = await ctx.db.query.users({  // unique field以外の条件検索紹介
    //         where: {
    //             resetToken: args.resetToken,
    //             resetTokenExpiry_gte: Date.now() - 3600000
    //         }
    //     }) 
    //     if(!user){
    //         throw new Error(`This token is either invalid or expired`)
    //     }
    //     // Hash their new password
    //     const password = await bcrypt.hash(args.password, 10)
    //     // Save the new password to the user and remove old resetToken fields
    //     const updatedUser = await ctx.db.mutation.updateUser({
    //         where: { email: user.email },
    //         data: {
    //             password,
    //             resetToken: null,
    //             resetTokenExpiry: null
    //         }
    //     })
    //     // Generate JWT
    //     const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET)
    //     // Set the JST cookie
    //     ctx.response.cookie('token', token, {
    //         httpOnly: true,
    //         maxAge: 1000 * 60 * 60 * 24 * 365,  // 1 year cookie
    //     })
    //     // Return new User
    //     return updatedUser
    // },

    // async updatePermissions(parent, args, ctx, info) {
    //     // 1. Check if they are logged in
    //     if (!ctx.request.userId) {
    //         throw new Error('You must be logged in!');
    //     }
    //     // 2. Query the current user
    //     const currentUser = await ctx.db.query.user(
    //     {
    //         where: {
    //         id: ctx.request.userId,
    //         },
    //     },
    //     info
    //     );
    //     // 3. Check if they have permissions to do this
    //     hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
    //     // 4. Update the permissions
    //     return ctx.db.mutation.updateUser(
    //     {
    //         data: {
    //         permissions: {
    //             set: args.permissions,
    //         },
    //         },
    //         where: {
    //         id: args.userId,
    //         },
    //     }, info );
    // },

    // async addToCart(parent, args, ctx, info) {
    //     // Make sure the are signed in
    //     const { userId } = ctx.request
    //     if(!userId) throw new Error('You must be signed in soooooooon!');
    //     // Query the users current cart
    //     const [ existingCartItem ] = await ctx.db.query.cartItems({
    //         where: {
    //             user: {
    //                 id: userId
    //             },
    //             item: { 
    //                 id: args.id 
    //             }
    //         }
    //     })
    //     // Check if that item is already in their cart and increment by 1 if it is
    //     if(existingCartItem){
    //         return ctx.db.mutation.updateCartItem({
    //             where: { id: existingCartItem.id },
    //             data: { quantity: existingCartItem.quantity + 1 }
    //         }, info)
    //     }    
    //     // If it is not, create a fresh CartItem for that User
    //     return ctx.db.mutation.createCartItem({
    //         data: {
    //             user: {
    //                 connect: {
    //                     id: userId
    //                 }
    //             },
    //             item: {
    //                 connect: {
    //                     id: args.id
    //                 }
    //             }
    //         }
    //     }, info)
    // },

    // async removeFromCart(parent, args, ctx, info) {
    //     // Find the cart item
    //     const cartItem = await ctx.db.query.cartItem({
    //         where: {
    //             id: args.id
    //         }
    //     }, `{ id, user { id }}`)
    //     // make sure we found an item
    //     if(!cartItem) throw new Error('No CartItem Found!')
    //     // make sure they own that cart item
    //     if(cartItem.user.id !== ctx.request.userId) throw new Error('Cheating huhhhh')
    //     // delete that cart item
    //     return ctx.db.mutation.deleteCartItem({
    //         where: {
    //             id: args.id
    //         }
    //     }, info)
    // },

    // async createOrder(parent, args, ctx, info) {
    //     // Query the current user and make sure they are signed in
    //     const { userId } = ctx.request
    //     if(!userId) throw new Error('You must be signed in to complete this order.');
    //     const user = await ctx.db.query.user({
    //         where: {
    //             id: userId 
    //         }}, `{
    //                 id
    //                 name 
    //                 email 
    //                 cart { 
    //                     id 
    //                     quantity 
    //                     item { 
    //                         title 
    //                         price 
    //                         id 
    //                         description 
    //                         image
    //                         largeImage
    //                     }
    //                 }
    //             }`
    //         )
    //     // Recalculate the total for the Price (UI側でJavascriptをいじって金額を改ざんされた場合の対処)
    //     const amount = user.cart.reduce(
    //         (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
    //         0
    //     );
    //     console.log(`Going to charge for a total of ${amount}`);
    //     // Create the stripe change (turn token into Money!!!)
    //     const charge = await stripe.charges.create({
    //         amount,
    //         currency: 'USD',
    //         source: args.token
    //     })
    //     // Convert the CartItems to OrderItems
    //     const orderItems = user.cart.map(cartItem => {
    //         const orderItem = {
    //             ...cartItem.item,
    //             quantity: cartItem.quantity,
    //             user: {
    //                 connect: {
    //                     id: userId
    //                 }
    //             },
    //         }; 
    //         delete orderItem.id;
    //         return orderItem
    //     })
    //     // Create the Order
    //     const order = await ctx.db.mutation.createOrder({
    //         data: {
    //             total: charge.amount,
    //             charge: charge.id,
    //             items: { create: orderItems },  // Prisma が自動でOrderItem typeのデータを作成してくれる
    //             user: { connect: { id: userId } },
    //         }
    //     }) // そのまんまのerror内容をUIに表示したくない場合は、.catchでエラーをthrowしてやればよい
    //     // Clean up - clearn the users cart, delete cartItems
    //     const cartItemIds = user.cart.map(cartItem => cartItem.id)
    //     await ctx.db.mutation.deleteManyCartItems({
    //         where: {
    //             id_in: cartItemIds
    //         }
    //     })
    //     // Return the Order to the client
    //     return order
    // },

};

module.exports = Mutations;
