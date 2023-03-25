import Link from "next/link";

export default function test() {
  return (
    <>
      <div class="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
          Articles
        </h2>
        <div class="flex flex-wrap -mx-4">
          <div class="w-full lg:w-2/3 px-4 mb-8">
            Add filters or search bar here
            <div class="grid gap-6">
              Repeat this card for each post
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <Link
                  href="#"
                  class="block hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div class="p-5">
                    <div class="text-xl font-bold mb-2">Post Title</div>
                    <p class="text-gray-500 leading-relaxed mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="https://picsum.photos/seed/picsum/200/200"
                          alt=""
                        ></img>
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-900">
                          Author Name
                        </div>
                        <div class="text-sm text-gray-500">Date</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/3 px-4">
            Add sidebar content here
            <div class="bg-white overflow-hidden shadow rounded-lg mb-8">
              <div class="p-5">
                <div class="text-xl font-bold mb-4">Recent Posts</div>
                <ul class="divide-y divide-gray-200">
                  Repeat this item for each recent post
                  <li class="py-4">
                    <Link
                      href="#"
                      class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700"
                    >
                      Recent Post Title
                    </Link>
                    <div class="text-sm leading-5 text-gray-500">Date</div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bg-white overflow-hidden shadow rounded-lg mb-8">
              <div class="p-5">
                <div class="text-xl font-bold mb-4">Categories</div>
                <ul class="divide-y divide-gray-200">
                  Repeat this item for each category
                  <li class="py-4">
                    <Link
                      href="#"
                      class="text-base leading-6 font-medium
                text-gray-900 hover:text-gray-700"
                    >
                      Category Name
                    </Link>
                    <div class="text-sm leading-5 text-gray-500">
                      Number of Posts
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
