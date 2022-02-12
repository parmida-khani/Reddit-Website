export interface PostModel {
  title: string,
  communityName: string,
  publisherUsername: string,
  text: string,
  publishDate?: Date,
  image?: string,
  numOfLikes?: number,
  numOfDislikes?: number
  numOfComments?: number,
  comments?: [commentModel],
  _id:string,
  userLikes?: [string]
}

export interface commentModel {
  username: string,
  text: string,
  numOfCommentLikes?: number,
  numOfCommentDislikes?: number
}
