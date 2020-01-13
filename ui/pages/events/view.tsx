import React from 'react'
import { NextPage, NextPageContext } from 'next';
import { ViewEvent, IEvent } from "../../components/events/ViewEvent"
import { Requests } from "../../services/requests"
import nextCookie from 'next-cookies'
import {isTokenInvalid} from "../../utils/auth"
import {EventProps} from "../../components/events/ViewEvent"

const EventView: NextPage<EventProps> = props => {
  return (
    <ViewEvent {...props} />
  )
}

EventView.getInitialProps = async (ctx: NextPageContext): Promise<EventProps> => {
  const id = ctx.query.id
  const event = await Requests.get<IEvent>(`/events?id=${id}`)
  const { token } = nextCookie(ctx)
  const authenicated = !isTokenInvalid(token)
  return {event: event, authenticated: authenicated};
}

export default EventView;