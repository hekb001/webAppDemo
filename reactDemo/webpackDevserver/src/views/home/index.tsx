import React from 'react';
export interface AppProps {
    children: Array<React.ReactNode>
  }
export default function Home(props: AppProps){
    return (
        <div>this is my webpackDevServer ts project!!</div>
    )
}