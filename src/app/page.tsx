export default function Home() {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center p-4"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="flex min-h-[50dvh] max-w-4xl flex-col items-center justify-center rounded-lg bg-white bg-white/30 p-8 text-center shadow-lg backdrop-blur-xl">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-4xl">Get Fit with Our Workout Planner</h1>
        <p className="mb-8 text-gray-800 md:text-lg">
          Our workout planner is designed to help you achieve your fitness goals. Whether you want to build muscle, lose
          weight, or improve your endurance, we have the right plan for you. Sign up today and start your fitness
          journey!
        </p>
        <a href="/login" className="btn btn-neutral btn-wide">
          Get Started
        </a>
      </div>
    </div>
  )
}
