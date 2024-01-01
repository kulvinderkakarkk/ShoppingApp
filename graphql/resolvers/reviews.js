import reviewModel from '../../mongooseModels/reviews.js'
import { decodeToken } from '../../util.js'

const reviews = {
    Query: {
        async getReviews(parent, args, contextValue, info) {
            let token = decodeToken(contextValue)
            const review = await reviewModel.find({product_id: args.product_id})
            return review
        }
    },
    Mutation: {
        async addReview(parent, args, contextValue, info) {
            let token = decodeToken(contextValue)
            const {product_id, username, description} = args['reviewInput']
            const review = new reviewModel({product_id, username, description})
            await review.save()
            return review
        },
        async editReview(parent, args, contextValue, info) {
            decodeToken(contextValue)
            const {id, reviewInput} = args
            let existingReview = await reviewModel.findById(id)
            existingReview['reviewInput'] = reviewInput
            const updatedReview = await reviewModel.findOneAndReplace({'_id':id, existingReview})
            return updatedReview
        },
        async deleteReview(parent , args, contextValue, info) {
            let token = decodeToken(contextValue)
            const {id} = args
            const deletedReview = await reviewModel.findByIdAndDelete(id)
            return deletedReview
        }
    }
}

export default reviews