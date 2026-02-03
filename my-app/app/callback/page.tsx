'use client'
import { useHandleSignInCallback, useLogto } from '@logto/react';

export default function Content() {

 const { isLoading, error } = useHandleSignInCallback(() => {
    console.log('reload')
    window.location.href = '/'
  });

  // When it's working in progress
  if (isLoading) {
    return <div>Redirecting...</div>;
  }
  return error
}