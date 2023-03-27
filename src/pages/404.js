import { useRouter } from "next/router";

export default function customNotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mt-4 mb-8 text-2xl font-medium text-gray-500">
        Page not found
      </h2>
      <p className="mb-8 text-lg text-gray-500">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>

      <button
        onClick={() => router.push("/")}
        className="inline-block px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Go back home
      </button>
    </div>
  );
}
