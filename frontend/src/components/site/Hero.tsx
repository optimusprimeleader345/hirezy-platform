export function Hero() {
  return (
    <section className="base44-bg pt-40 pb-32 text-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-6xl font-extrabold text-white leading-tight">
          Find Your Next <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Freelance Gig
          </span>
        </h1>

        <p className="text-gray-300 text-lg mt-6 max-w-3xl mx-auto">
          Connect students with opportunities through AI-powered matching and
          intelligent career guidance.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <a
            href="/auth/student-login"
            className="px-8 py-4 rounded-xl text-white bg-gradient-to-r from-purple-500 to-blue-500 font-medium shadow-lg shadow-purple-500/30 hover:opacity-90 transition"
          >
            I'm a Student →
          </a>

          <a
            href="/auth/recruiter-login"
            className="px-8 py-4 rounded-xl border border-white/20 text-white backdrop-blur-xl bg-white/5 hover:bg-white/10 transition font-medium"
          >
            I'm a Recruiter →
          </a>
        </div>

      </div>
    </section>
  )
}
