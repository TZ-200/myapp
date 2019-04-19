const { forwardTo } = require('prisma-binding')
const { hasPermission } = require('../utils')


const Query = {

    // items: forwardTo('db'), // 特に操作が必要ないので、直接prismaにつっこんでいる
    // item: forwardTo('db'),  // 特に操作が必要ないので、直接prismaにつっこんでいる
    // itemsConnection: forwardTo('db'),  // 特に操作が必要ないので、直接prismaにつっこんでいる
    // async items(parent, args, ctx, info){
    //     const items = await ctx.db.query.items()
    //     return items
    // }

    //とりあえず
    users: forwardTo('db'),
    threads: forwardTo('db'),
    comments: forwardTo('db'),
    thread: forwardTo('db'),

    me(parent, args, ctx, info) {
        // check if there is a current user id (middlewareでuserIdがrequestに付加されているかチェック)
        if(!ctx.request.userId){
            return null
        }
        return ctx.db.query.user({
            where: {
                id: ctx.request.userId
            }
        }, info)
    },



    // async order(parent, args, ctx, info){
    //     // Make sure they are logged in 
    //     if(!ctx.request.userId) throw new Error('You must be logged in!')
    //     // Query the current order
    //     const order = await ctx.db.query.order({
    //         where: { id: args.id }
    //     }, info)
    //     // Check if they have the permissions to see this order
    //     const ownsOrder = order.user.id === ctx.request.userId
    //     const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN')
    //     if(!ownsOrder || !hasPermissionToSeeOrder) {
    //         throw new Error('You cant see this!')
    //     }
    //     // Return the order
    //     return order
    // },

    // async orders(parent, args, ctx, info){
    //     const { userId } = ctx.request
    //     if(!userId) throw new Error('You must be signed in!')
    //     return ctx.db.query.orders({
    //         where: {
    //             user: { id: userId }
    //         }
    //     }, info)
    // },

};

module.exports = Query;
