"use client"

import { useState } from "react"
import Image from "next/image"

export default function Home() {

  const [mode, setmode] = useState("summarize")
  const [tone, settone] = useState("simple")
  const [target, settarget] = useState("tamil")
  const [text, settext] = useState("")
  const [output, setoutput] = useState("")
  const [loading, setloading] = useState(false)

  const MODES = [
    {
      key: "summarize",
      label: "Summarize",
    },
    {
      key: "rewrite",
      label: "Rewrite",
    },
    {
      key: "translate",
      label: "Translate",
    },
  ]

  function loadText() {
    settext(
      "I built a small feature to speed up the app. It loads faster now, and users should notice the difference."
    )
  }

  function clearText() {
    settext("")
    setoutput("")
  }

  async function onCopy() {
    if (!output) return

    await navigator.clipboard.writeText(output)
    alert("Copied!")
  }

  async function transform() {

    if (!text.trim()) {
      alert("Please enter some text")
      return
    }

    setloading(true)
    setoutput("")

    try {

      const response = await fetch("/api/transform", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          input: text,
          mode,
          tone: mode === "rewrite" ? tone : undefined,
          target: mode === "translate" ? target : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Request failed")
      }

      setoutput(data.output)

    } catch (error) {

      console.log(error)
      setoutput("Something went wrong!")

    } finally {

      setloading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">

      <div className="mx-auto max-w-4xl px-4 py-10">

        {/* Header */}
        <header className="mb-8">

         <Image
    src="/bot pic.jpg"
    alt="Bot"
    width={80}
    height={80}
    
    className="rounded-full mb-5 "
  />

          <h1 style={{fontFamily:""}} className="text-3xl font-semibold tracking-tight">
   
            AI Text Transformer
   
          </h1>

          <p className="mt-2 text-zinc-300">
            Summarize, rewrite, and translate text instantly
          </p>
   
        </header>

        {/* Main Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">

          {/* Top Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">

            <div className="flex flex-wrap items-center gap-2">
              {MODES.map((eachMode) => (

                <button
                  key={eachMode.key}
                  onClick={() => setmode(eachMode.key)}
                  className={
                    mode === eachMode.key
                      ? "rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition"
                      : "rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700"
                  }
                >
                  {eachMode.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:ml-auto">

              <button
                onClick={loadText}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
              >
                Load Sample
              </button>

              <button
                onClick={clearText}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
              >
                Clear
              </button>

            </div>
          </div>

          {/* Grid Layout */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">

            {/* Left Side */}
            <div className="space-y-3">

              <label className="text-sm text-zinc-300">
                Input
              </label>

              <textarea
                value={text}
                onChange={(e) => settext(e.target.value)}
                placeholder="Paste your text here..."
                className="h-64 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-100 outline-none focus:border-zinc-500"
              />

              {/* Rewrite Tone */}
              {mode === "rewrite" && (

                <div className="flex items-center gap-3">

                  <span className="text-sm text-zinc-300">
                    Tone
                  </span>

                  <select
                    value={tone}
                    onChange={(e) => settone(e.target.value)}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100"
                  >
                    <option value="simple">Simple</option>
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="funny">Funny</option>
                  </select>

                </div>
              )}

              {/* Translate Target */}
              {mode === "translate" && (

                <div className="flex items-center gap-3">

                  <span className="text-sm text-zinc-300">
                    Target
                  </span>

                  <select
                    value={target}
                    onChange={(e) => settarget(e.target.value)}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100"
                  >
                    <option value="tamil">Tamil</option>
                    <option value="english">English</option>
                  </select>

                </div>
              )}

              {/* Transform Button */}
              <button
                onClick={transform}
                disabled={loading}
                className="w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 disabled:opacity-50"
              >
                {loading ? "Thinking..." : "Transform"}
              </button>

            </div>

            {/* Right Side */}
            <div className="space-y-3">

              <label className="text-sm text-zinc-300">
                Output
              </label>

              <div className="h-64 overflow-auto whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-100">

                {output ? (
                  output
                ) : (
                  <span className="text-zinc-500">
                    Your transformed text will appear here.
                  </span>
                )}

              </div>

              <button
                onClick={onCopy}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
              >
                Copy
              </button>

              <p className="text-xs text-zinc-500">
                Tip: Use “Load Sample” for quick demos.
              </p>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}