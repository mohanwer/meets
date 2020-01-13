import React from 'react'
import {GoogleGeoCode} from "../common/Address"
import {Comments} from "./Comments"
import {mockComments} from "../../mock/comments"

export interface IEvent {
  id: string,
  eventName: string,
  shortDescription: string,
  longDescription: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  postal: string,
  geoLocation?: GoogleGeoCode,
  createdBy: string,
  modifiedBy: string,
  created: number,
  modified: number,
}

export interface EventProps {
  event: IEvent,
  authenticated: boolean
}

interface IFormRow {
  labelName: string,
  labelText: string
}

const StaticMap: React.FC<{loc: GoogleGeoCode, className?: string}> = props => {
  const googleUrl = `https://maps.googleapis.com/maps/api/staticmap?key=${process.env.GOOGLE_KEY}`
  const size = 'size=600x300'
  const markers = `markers=color:red%7C${props.loc.lat},${props.loc.lng}`
  const mapType = 'maptype=roadmap'
  const zoom = 13
  const mapUrl = `${googleUrl}&${size}&${markers}&${zoom}&${mapType}`
  return <img src={require('../../public/map.jpg')} alt='test map' className={props.className} />
  // return (
  //   <img src={mapUrl} alt='google maps' className={props.className}/>
  // )
}

export const FormRow = (props: IFormRow) => (
  <div className='md:flex mt-6 mb-6'>
    <div className="md:w-1/3">
      <label className='form-label'>
        {props.labelName}
      </label>
    </div>
    <div className='md:w-2/3'>
      <label className='form-sub-text'>
        {props.labelText}
      </label>
    </div>
  </div>
)

export const ViewEvent = (props: EventProps) => {
  return (
    <>
      <div className='container w-full mx-auto'>

        <div className='font-semibold text-xl text-center tracking-tight p-4 m-2 mb-4 mb-2 border-b-2 border-gray-600'>
          <div>
            {props.event.eventName}
          </div>
          <div className='text-sm'>
            {props.event.createdBy}
          </div>
        </div>
        <div className='flex flex-row flex-wrap flex-grow mt-2'>
          <div className='w-full md:w-1/2 p-3'>
            <div className='rounded-lg bg-white shadow-lg pb-2'>
              <div>
                <StaticMap loc={props.event.geoLocation} />
              </div>
              <div className='ml-4 mt-4 text-center text-gray-600 text-bold'>
                <p>{props.event.address1}</p>
                <p>{props.event.city}, {props.event.state}, {props.event.postal}</p>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 p-3'>
            <div className='rounded-lg bg-white shadow-lg pb-2 p-2'>
              <FormRow labelName='Event Name' labelText={props.event.eventName}/>
              <FormRow labelName='Brief Description' labelText={props.event.shortDescription}/>
              <FormRow labelName='Details Description' labelText={props.event.longDescription}/>
            </div>
          </div>
          <div className='w-full p-3'>
            <Comments authenticated={props.authenticated} comments={mockComments}/>
          </div>
        </div>
      </div>

    </>
  )
}