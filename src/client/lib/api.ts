import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  text: Scalars['String'];
  createdAt: Scalars['Float'];
};

export type MessageInput = {
  text: Scalars['String'];
  roomId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postMessage: Message;
  postRoom: Room;
};


export type MutationPostMessageArgs = {
  messageInput: MessageInput;
};


export type MutationPostRoomArgs = {
  roomInput: RoomInput;
};

export type Query = {
  __typename?: 'Query';
  messages: Array<Message>;
  rooms: Array<Room>;
};


export type QueryMessagesArgs = {
  roomId: Scalars['ID'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['Float'];
};

export type RoomInput = {
  name: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: Message;
  roomAdded: Room;
};


export type SubscriptionMessageAddedArgs = {
  roomId: Scalars['ID'];
};

export type MessageAddedSubscriptionVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type MessageAddedSubscription = (
  { __typename?: 'Subscription' }
  & { messageAdded: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
  ) }
);

export type MessagesQueryVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
  )> }
);

export type PostMessageMutationVariables = Exact<{
  messageInput: MessageInput;
}>;


export type PostMessageMutation = (
  { __typename?: 'Mutation' }
  & { postMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
  ) }
);

export type RoomAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RoomAddedSubscription = (
  { __typename?: 'Subscription' }
  & { roomAdded: (
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'name' | 'createdAt'>
  ) }
);

export type RoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQuery = (
  { __typename?: 'Query' }
  & { rooms: Array<(
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'name' | 'createdAt'>
  )> }
);


export const MessageAddedDocument = gql`
    subscription MessageAdded($roomId: ID!) {
  messageAdded(roomId: $roomId) {
    id
    text
    createdAt
  }
}
    `;

/**
 * __useMessageAddedSubscription__
 *
 * To run a query within a React component, call `useMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageAddedSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useMessageAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageAddedSubscription, MessageAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageAddedSubscription, MessageAddedSubscriptionVariables>(MessageAddedDocument, options);
      }
export type MessageAddedSubscriptionHookResult = ReturnType<typeof useMessageAddedSubscription>;
export type MessageAddedSubscriptionResult = Apollo.SubscriptionResult<MessageAddedSubscription>;
export const MessagesDocument = gql`
    query Messages($roomId: ID!) {
  messages(roomId: $roomId) {
    id
    text
    createdAt
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const PostMessageDocument = gql`
    mutation PostMessage($messageInput: MessageInput!) {
  postMessage(messageInput: $messageInput) {
    id
    text
    createdAt
  }
}
    `;
export type PostMessageMutationFn = Apollo.MutationFunction<PostMessageMutation, PostMessageMutationVariables>;

/**
 * __usePostMessageMutation__
 *
 * To run a mutation, you first call `usePostMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMessageMutation, { data, loading, error }] = usePostMessageMutation({
 *   variables: {
 *      messageInput: // value for 'messageInput'
 *   },
 * });
 */
export function usePostMessageMutation(baseOptions?: Apollo.MutationHookOptions<PostMessageMutation, PostMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostMessageMutation, PostMessageMutationVariables>(PostMessageDocument, options);
      }
export type PostMessageMutationHookResult = ReturnType<typeof usePostMessageMutation>;
export type PostMessageMutationResult = Apollo.MutationResult<PostMessageMutation>;
export type PostMessageMutationOptions = Apollo.BaseMutationOptions<PostMessageMutation, PostMessageMutationVariables>;
export const RoomAddedDocument = gql`
    subscription RoomAdded {
  roomAdded {
    id
    name
    createdAt
  }
}
    `;

/**
 * __useRoomAddedSubscription__
 *
 * To run a query within a React component, call `useRoomAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRoomAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RoomAddedSubscription, RoomAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RoomAddedSubscription, RoomAddedSubscriptionVariables>(RoomAddedDocument, options);
      }
export type RoomAddedSubscriptionHookResult = ReturnType<typeof useRoomAddedSubscription>;
export type RoomAddedSubscriptionResult = Apollo.SubscriptionResult<RoomAddedSubscription>;
export const RoomsDocument = gql`
    query Rooms {
  rooms {
    id
    name
    createdAt
  }
}
    `;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomsQuery(baseOptions?: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
      }
export function useRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
        }
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsQueryResult = Apollo.QueryResult<RoomsQuery, RoomsQueryVariables>;