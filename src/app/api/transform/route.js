import OpenAI from "openai"

export async function POST(req) {

  try {

    // Parse body
    const body = await req.json()

    console.log("BODY:", body)

    const { input, mode, tone, target } = body

    // Validate
    if (!input) {

      return Response.json(
        {
          error: "Input required",
        },
        {
          status: 400,
        }
      )
    }

    // OpenAI client
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    console.log("API KEY EXISTS:", !!process.env.OPENAI_API_KEY)

    // Prompt
    let instructions = ""

    if (mode === "summarize") {

      instructions =
        "Summarize the text into 5 bullet points."

    }

    else if (mode === "rewrite") {

      instructions =
        `Rewrite the text in ${tone} tone.`

    }

    else if (mode === "translate") {

      instructions =
        `Translate the text to ${target}.`

    }

    // OpenAI response
    const response = await client.responses.create({

      model: "gpt-5.4-mini",

      instructions,

      input,
    })

    console.log(response.output_text)

    return Response.json({
      output: response.output_text,
    })

  } catch (error) {

    console.log("FULL ERROR:", error)

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}