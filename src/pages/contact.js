import { Button, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";

export default function contact() {
  return (
    <>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Send us a message
              </h3>
              <form
                action="#"
                method="POST"
                className="flex flex-col gap-[20px]"
              >
                <div>
                  <div className="mt-1 rounded-md shadow-sm">
                    <Input
                      clearable
                      underlined
                      labelPlaceholder="Name"
                      fullWidth
                      color="primary"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="mt-1 rounded-md shadow-sm">
                    <Input
                      clearable
                      underlined
                      labelPlaceholder="Email"
                      fullWidth
                      color="primary"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="mt-1 rounded-md shadow-sm">
                    <Textarea
                      underlined
                      color="primary"
                      labelPlaceholder="Message"
                      fullWidth
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <span className="inline-flex rounded-md shadow-sm">
                    <Button
                      color="primary"
                      classNameName="bg-blue-500 hover:bg-blue-700 text-white"
                      auto
                    >
                      Send
                    </Button>
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Visit us
              </h3>
              <p className="text-gray-500 leading-6 mb-4">
                1234 Main St
                <br />
                Anytown, USA 12345
              </p>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Email us
              </h3>
              <p className="text-gray-500 leading-6">
                <Link href="mailto:hello@example.com">hello@example.com</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
