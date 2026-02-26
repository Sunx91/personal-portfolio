export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-4 bg-white dark:bg-gray-900"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
          About <span className="text-indigo-600 dark:text-indigo-400">Me</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar placeholder */}
          <div className="flex justify-center">
            <div className="w-56 h-56 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-8xl select-none">
              👤
            </div>
          </div>
          {/* Bio */}
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Hello! I&apos;m a passionate developer based in{" "}
              <strong className="text-gray-900 dark:text-white">Your City</strong>
              . I love crafting clean code and building delightful digital
              experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              With experience in modern web technologies, I strive to create
              applications that are not only functional but also intuitive and
              performant.
            </p>
            <ul className="grid grid-cols-2 gap-2 pt-2">
              {[
                ["Name", "Your Name"],
                ["Email", "you@example.com"],
                ["Location", "Your City"],
                ["Availability", "Open to work"],
              ].map(([label, value]) => (
                <li key={label} className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {label}:{" "}
                  </span>
                  {value}
                </li>
              ))}
            </ul>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
