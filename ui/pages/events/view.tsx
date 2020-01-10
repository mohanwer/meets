import React from 'react'
import { NextPage, NextPageContext } from 'next';
import { ViewEvent, IEvent } from "../../components/events/ViewEvent"
import { Requests } from "../../services/requests"

const EventView: NextPage<IEvent> = props => {
  return (
    <ViewEvent {...props} />
  )
}

EventView.getInitialProps = async (ctx: NextPageContext): Promise<IEvent> => {
  const id = ctx.query.id
  const event = Requests.get<IEvent>(`/events?id=${id}`)
  return event;
}

export default EventView;