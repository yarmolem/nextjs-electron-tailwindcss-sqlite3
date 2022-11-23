import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import electron from 'electron'

const ipcRenderer = electron.ipcRenderer ?? null

function Home() {
  const [msg, setMsg] = useState('INVALID')
  const [msgs, setMsgs] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    ipcRenderer.invoke('msg_1').then((res) => setMsg(res))
    ipcRenderer.invoke('msg_2').then((res) => setMsgs(res))
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <img className="ml-auto mr-auto" src="/images/logo.png" />
        <span className="mb-3">⚡ Electron - {msg} ⚡</span>
        {msgs.map((item) => (
          <span key={item.id}>
            {item.id} - {item.name}
          </span>
        ))}
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/next">
          <a className="btn-blue">Go to next page</a>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Home
