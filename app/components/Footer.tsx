export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {year}{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            Your Name
          </span>
          . All rights reserved.
        </p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Next.js
          </a>{" "}
          &amp;{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Tailwind CSS
          </a>
        </p>
      </div>
    </footer>
  );
}
