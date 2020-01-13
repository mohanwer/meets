import React from 'react'

interface Props {
  authenticated: boolean,
  comments?: IComment[]
}

export interface IComment {
  createdBy: string,
  modified: number,
  commentText: string
}

export const Comment = (props: IComment) => {
  return (
    <div className='flex pt-2 content-center'>
      <div className='pr-2 pl-2'>
        <img className='h-16 w-16 rounded-full mx-auto md:mx-0' src={require('../../public/use_image.jpg')} alt='user image'/>
      </div>
      <div className=' md:text-left'>
        <div className=''>{props.commentText}</div>
        <div className='text-sm text-purple-500'>{props.createdBy}</div>
        <div className='text-sm text-gray-500'>{props.modified}</div>
      </div>
    </div>
  )
}

export const Comments = (props: Props) => {

  const commentSection = props.authenticated ?
    (
      <>
        <textarea className='w-full text-center content-around'/>
        <button type='submit' className='btn'>
          Save
        </button>
      </>
    ) : (
      <div>Login to make a comment</div>
    )

  return (
    <div className='bg-white rounded-lg shadow-lg p-3 mt-2'>
      <div className='flex border-b-2 p-2'>
        {commentSection}
      </div>
      {props.comments.map(comment =>
        <Comment
          commentText={comment.commentText}
          createdBy={comment.createdBy}
          modified={comment.modified}
          key={comment.commentText}
        />)}
    </div>
  )
}