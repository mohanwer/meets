import React from 'react'
import {GoogleGeoCode} from "../common/Address"

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
  created: number
  modified: number
}

interface IFormRow {
  labelName: string,
  labelText: string
}

const StaticMap: React.FC<{loc: GoogleGeoCode, className: string}> = props => {
  const googleUrl = `https://maps.googleapis.com/maps/api/staticmap?key=${process.env.GOOGLE_KEY}`
  const size = 'size=600x300'
  const markers = `markers=color:red%7C${props.loc.lat},${props.loc.lng}`
  const mapType = 'maptype=roadmap'
  const zoom = 13

  const mapUrl = `${googleUrl}&${size}&${markers}&${zoom}&${mapType}`
  return (
    <img src={mapUrl} alt='google maps' className={props.className}/>
  )
}

export const FormRow = (props: IFormRow) => (
  <div className='md:flex mb-6'>
    <div className="md:w-1/3">
      <label className='form-label'>
        {props.labelName}
      </label>
    </div>
    <div className='md:w-2/3'>
      <label className='form-label'>
        {props.labelText}
      </label>
    </div>
  </div>
)

export const ViewEvent = (props: IEvent) => {
  return (
    <div className='w-full p-6 rounded bg-white'>
      <StaticMap loc={props.geoLocation} className='object-contain h-48 w-full'/>
      <FormRow labelName='Event Name' labelText={props.eventName}/>
      <FormRow labelName='Brief Description' labelText={props.shortDescription}/>
    </div>
  )
}