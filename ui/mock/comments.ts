import {IComment} from "../components/events/Comments"

const epochTime = () => {
  const d = new Date()
  return (d.getTime()-d.getMilliseconds())/1000
}

export const mockComments: IComment[] = [
  { commentText: 'Happy times', createdBy: 'Some guy', modified: epochTime() },
  { commentText: 'New day', createdBy: 'Some other guy', modified: epochTime() },
  { commentText: 'rage comment', createdBy: 'this guy', modified: epochTime() }
]